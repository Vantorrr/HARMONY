import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// YuKassa конфигурация
const YUKASSA_SHOP_ID = process.env.YUKASSA_SHOP_ID || 'demo_shop_id';
const YUKASSA_SECRET_KEY = process.env.YUKASSA_SECRET_KEY || 'demo_secret_key';
const IS_DEMO_MODE = !process.env.YUKASSA_SHOP_ID || process.env.YUKASSA_SHOP_ID === 'demo_shop_id';

// Интерфейсы для типизации
interface PaymentRequest {
  amount: number;
  description: string;
  subscriptionId: string;
  userId: string;
  returnUrl: string;
  metadata?: Record<string, any>;
  customer?: {
    email?: string;
    phone?: string; // в формате 7XXXXXXXXXX
  };
  taxSystemCode?: number; // 1..6
  vatCode?: number; // 1..6 (6 — без НДС)
}

interface YuKassaPaymentResponse {
  id: string;
  status: string;
  confirmation: {
    type: string;
    confirmation_url: string;
  };
}

// Создание платежа
export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    
    // Валидация входных данных
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Неверная сумма платежа' },
        { status: 400 }
      );
    }

    if (!body.description || !body.subscriptionId || !body.userId) {
      return NextResponse.json(
        { success: false, error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      );
    }

    // Demo режим - симуляция успешного создания платежа
    if (IS_DEMO_MODE) {
      console.log('🎮 YuKassa Demo режим - создание mock платежа');
      
      const mockPayment = {
        id: `demo_payment_${Date.now()}`,
        status: 'pending',
        confirmation: {
          type: 'redirect',
          confirmation_url: `${body.returnUrl}?demo=true&payment_id=demo_payment_${Date.now()}&status=success`
        },
        amount: {
          value: body.amount.toFixed(2),
          currency: 'RUB'
        },
        description: body.description,
        metadata: {
          subscriptionId: body.subscriptionId,
          userId: body.userId,
          demo: true,
          ...body.metadata
        }
      };

      return NextResponse.json({
        success: true,
        payment: mockPayment,
        demo: true
      });
    }

    // Создание платежа через YuKassa API
    const taxSystemCode = body.taxSystemCode || Number(process.env.YUKASSA_TAX_SYSTEM_CODE) || 2; // по умолчанию УСН доход
    const vatCode = body.vatCode || Number(process.env.YUKASSA_VAT_CODE) || 6; // по умолчанию без НДС

    const paymentData: any = {
      amount: {
        value: body.amount.toFixed(2),
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: body.returnUrl
      },
      description: body.description,
      metadata: {
        subscriptionId: body.subscriptionId,
        userId: body.userId,
        ...body.metadata
      },
      capture: true,
      receipt: {
        customer: {
          ...(body.customer?.email ? { email: body.customer.email } : {}),
          ...(body.customer?.phone ? { phone: body.customer.phone } : {})
        },
        items: [
          {
            description: body.description?.slice(0, 128) || 'Оплата',
            quantity: '1.0',
            amount: { value: body.amount.toFixed(2), currency: 'RUB' },
            vat_code: vatCode,
            payment_mode: 'full_prepayment',
            payment_subject: 'service'
          }
        ],
        tax_system_code: taxSystemCode
      }
    };

    // Создание Basic Auth заголовка
    const auth = Buffer.from(`${YUKASSA_SHOP_ID}:${YUKASSA_SECRET_KEY}`).toString('base64');
    
    // Генерация идемпотентного ключа
    const idempotencyKey = crypto.randomUUID();

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Idempotence-Key': idempotencyKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('YuKassa API Error:', errorData);
      return NextResponse.json(
        { success: false, error: 'Ошибка создания платежа' },
        { status: 500 }
      );
    }

    const payment: YuKassaPaymentResponse = await response.json();

    return NextResponse.json({
      success: true,
      payment,
      demo: false
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// Проверка статуса платежа
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const paymentId = url.searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'Не указан ID платежа' },
        { status: 400 }
      );
    }

    // Demo режим
    if (IS_DEMO_MODE || paymentId.startsWith('demo_payment_')) {
      console.log('🎮 YuKassa Demo режим - проверка mock платежа');
      
      const mockPayment = {
        id: paymentId,
        status: 'succeeded',
        amount: {
          value: '5000.00',
          currency: 'RUB'
        },
        description: 'Demo платеж',
        paid: true,
        created_at: new Date().toISOString(),
        metadata: {
          demo: true
        }
      };

      return NextResponse.json({
        success: true,
        payment: mockPayment,
        demo: true
      });
    }

    // Проверка через YuKassa API
    const auth = Buffer.from(`${YUKASSA_SHOP_ID}:${YUKASSA_SECRET_KEY}`).toString('base64');

    const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Платеж не найден' },
        { status: 404 }
      );
    }

    const payment = await response.json();

    return NextResponse.json({
      success: true,
      payment,
      demo: false
    });

  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка проверки платежа' },
      { status: 500 }
    );
  }
}