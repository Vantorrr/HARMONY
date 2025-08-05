import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Интерфейс для данных SMS
interface SMSData {
  phone: string;
  code: string;
  timestamp: number;
  attempts: number;
}

// Глобальное хранилище кодов в памяти (в продакшене использовать Redis или БД)
declare global {
  var smsStorage: Map<string, SMSData> | undefined;
}

const getSMSStorage = () => {
  if (!global.smsStorage) {
    global.smsStorage = new Map<string, SMSData>();
  }
  return global.smsStorage;
};

// Очистка старых кодов (старше 10 минут)
const cleanupOldCodes = () => {
  const smsStorage = getSMSStorage();
  const now = Date.now();
  const expireTime = 10 * 60 * 1000; // 10 минут
  
  for (const [phone, data] of smsStorage.entries()) {
    if (now - data.timestamp > expireTime) {
      smsStorage.delete(phone);
    }
  }
};

// Отправка SMS через SMSC.ru
const sendSMSViaProvider = async (phone: string, text: string): Promise<boolean> => {
  try {
    // В демо режиме просто логируем
    console.log(`📱 SMS отправлен на ${phone}: ${text}`);
    
    // Для реальной интеграции с SMSC.ru раскомментируйте:
    /*
    const response = await fetch('https://smsc.ru/sys/send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        login: process.env.SMSC_LOGIN || '',
        psw: process.env.SMSC_PASSWORD || '',
        phones: phone,
        mes: text,
        fmt: '3', // JSON формат ответа
        charset: 'utf-8'
      })
    });

    const result = await response.json();
    return !result.error;
    */
    
    return true; // Демо режим - всегда успешно
  } catch (error) {
    console.error('Ошибка отправки SMS:', error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Валидация номера телефона
    if (!phone || !/^7\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Неверный формат номера телефона' },
        { status: 400 }
      );
    }

    // Очистка старых кодов
    cleanupOldCodes();

    // Получаем хранилище
    const smsStorage = getSMSStorage();

    // Проверка rate limiting (не более 1 SMS в минуту)
    const existingData = smsStorage.get(phone);
    if (existingData) {
      const timeSinceLastSMS = Date.now() - existingData.timestamp;
      if (timeSinceLastSMS < 60000) { // 60 секунд
        const remainingTime = Math.ceil((60000 - timeSinceLastSMS) / 1000);
        return NextResponse.json(
          { 
            success: false, 
            error: `Повторная отправка через ${remainingTime} сек` 
          },
          { status: 429 }
        );
      }
    }

    // Генерация кода (в demo режиме фиксированный)
    const code = process.env.SMSC_LOGIN ? 
      Math.floor(1000 + Math.random() * 9000).toString() : 
      '1234';
    
    // Сохранение в хранилище
    smsStorage.set(phone, {
      phone,
      code,
      timestamp: Date.now(),
      attempts: 0
    });

    // Текст SMS
    const smsText = `Центр "Гармония":\nВаш код подтверждения: ${code}\nНе сообщайте его никому!`;

    // Отправка SMS
    const sent = await sendSMSViaProvider(phone, smsText);

    if (sent) {
      return NextResponse.json({ 
        success: true, 
        message: 'SMS отправлен',
        // В демо режиме возвращаем код для тестирования
        ...(!process.env.SMSC_LOGIN && { debugCode: code })
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Ошибка отправки SMS' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Ошибка API SMS send:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// GET метод для получения информации о коде (только для разработки)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const url = new URL(request.url);
  const phone = url.searchParams.get('phone');

  if (!phone) {
    return NextResponse.json({ error: 'Phone required' }, { status: 400 });
  }

  const smsStorage = getSMSStorage();
  const data = smsStorage.get(phone);
  if (!data) {
    return NextResponse.json({ error: 'No code found' }, { status: 404 });
  }

  return NextResponse.json({
    phone: data.phone,
    code: data.code,
    timestamp: data.timestamp,
    attempts: data.attempts,
    timeRemaining: Math.max(0, 600000 - (Date.now() - data.timestamp)) // 10 минут
  });
}