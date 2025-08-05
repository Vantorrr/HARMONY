import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Интерфейс для данных SMS (повторяем из send/route.ts)
interface SMSData {
  phone: string;
  code: string;
  timestamp: number;
  attempts: number;
}

// Используем то же хранилище что и в send/route.ts
// В продакшене это должно быть Redis или БД
declare global {
  var smsStorage: Map<string, SMSData> | undefined;
}

const getSMSStorage = () => {
  if (!global.smsStorage) {
    global.smsStorage = new Map<string, SMSData>();
  }
  return global.smsStorage;
};

// Секретный ключ для JWT (в продакшене использовать переменную окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'harmony-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    // Валидация входных данных
    if (!phone || !/^7\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Неверный формат номера телефона' },
        { status: 400 }
      );
    }

    if (!code || !/^\d{4}$/.test(code)) {
      return NextResponse.json(
        { success: false, error: 'Неверный формат кода' },
        { status: 400 }
      );
    }

    const smsStorage = getSMSStorage();
    const smsData = smsStorage.get(phone);

    // Проверка существования кода
    if (!smsData) {
      return NextResponse.json(
        { success: false, error: 'Код не найден или истек' },
        { status: 404 }
      );
    }

    // Проверка времени жизни кода (10 минут)
    const currentTime = Date.now();
    const codeAge = currentTime - smsData.timestamp;
    if (codeAge > 10 * 60 * 1000) { // 10 минут
      smsStorage.delete(phone);
      return NextResponse.json(
        { success: false, error: 'Код истек. Запросите новый' },
        { status: 410 }
      );
    }

    // Проверка количества попыток
    if (smsData.attempts >= 3) {
      smsStorage.delete(phone);
      return NextResponse.json(
        { success: false, error: 'Превышено количество попыток. Запросите новый код' },
        { status: 429 }
      );
    }

    // Проверка кода
    if (smsData.code !== code) {
      // Увеличиваем счетчик попыток
      smsData.attempts += 1;
      smsStorage.set(phone, smsData);

      const remainingAttempts = 3 - smsData.attempts;
      return NextResponse.json(
        { 
          success: false, 
          error: `Неверный код. Осталось попыток: ${remainingAttempts}` 
        },
        { status: 400 }
      );
    }

    // Код верный - удаляем из хранилища
    smsStorage.delete(phone);

    // Создаем JWT токен
    const token = jwt.sign(
      { 
        phone,
        isAuthenticated: true,
        loginTime: currentTime,
        loginMethod: 'sms'
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Токен действует 7 дней
    );

    // Возвращаем успешный ответ
    return NextResponse.json({
      success: true,
      message: 'Авторизация успешна',
      token,
      user: {
        phone,
        isAuthenticated: true,
        loginTime: currentTime
      }
    });

  } catch (error) {
    console.error('Ошибка API SMS verify:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// GET метод для проверки токена
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Токен не предоставлен' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      return NextResponse.json({
        success: true,
        user: {
          phone: decoded.phone,
          isAuthenticated: decoded.isAuthenticated,
          loginTime: decoded.loginTime,
          loginMethod: decoded.loginMethod
        }
      });
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Недействительный токен' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Ошибка проверки токена:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}