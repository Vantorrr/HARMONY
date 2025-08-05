// Firebase Configuration for Harmony Fitness
import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging';

// Firebase config (в реальном проекте это будет в переменных окружения)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "harmony-fitness-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "harmony-fitness-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "harmony-fitness-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// VAPID ключ для Web Push (в реальном проекте из Firebase Console)
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "demo-vapid-key";

// Demo режим для разработки
const IS_DEMO_MODE = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                     process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key";

// Инициализация Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

let messaging: Messaging | null = null;

// Инициализация Messaging (только в браузере)
export const initializeMessaging = () => {
  if (IS_DEMO_MODE) {
    console.log('🎮 Firebase в demo режиме - симуляция Messaging');
    return { demo: true } as any;
  }

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      messaging = getMessaging(app);
      return messaging;
    } catch (error) {
      console.error('Error initializing Firebase Messaging:', error);
      return null;
    }
  }
  return null;
};

// Получение токена для пуш-уведомлений
export const getMessagingToken = async (): Promise<string | null> => {
  try {
    if (IS_DEMO_MODE) {
      console.log('🎮 Demo режим - генерация mock токена');
      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockToken = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('🔔 Mock FCM Token:', mockToken);
      return mockToken;
    }

    if (!messaging) {
      messaging = initializeMessaging();
    }
    
    if (!messaging) {
      throw new Error('Messaging not available');
    }

    // Регистрируем service worker
    const swPath = IS_DEMO_MODE ? '/sw-demo.js' : '/firebase-messaging-sw.js';
    const registration = await navigator.serviceWorker.register(swPath);
    
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('No registration token available.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
};

// Запрос разрешения на уведомления
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (IS_DEMO_MODE) {
      console.log('🎮 Demo режим - автоматическое разрешение уведомлений');
      // Симуляция запроса разрешения
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('🔔 Mock notification permission granted');
      return true;
    }

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted');
      return true;
    } else {
      console.log('Notification permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Обработка входящих сообщений (когда приложение открыто)
export const onMessageListener = () => {
  return new Promise((resolve) => {
    if (IS_DEMO_MODE) {
      console.log('🎮 Demo режим - onMessageListener готов');
      // В demo режиме мы можем эмулировать получение сообщений позже
      return;
    }

    if (!messaging) {
      messaging = initializeMessaging();
    }
    
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log('Message received:', payload);
        resolve(payload);
      });
    }
  });
};

// Типы уведомлений для Harmony Fitness
export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: {
    type: 'reminder' | 'expiry' | 'balance' | 'promotion';
    action?: string;
    url?: string;
  };
}

// Создание локального уведомления (fallback)
export const showLocalNotification = (payload: NotificationPayload) => {
  if (IS_DEMO_MODE) {
    console.log('🎮 Demo режим - показ mock уведомления:', payload);
    // В demo режиме показываем уведомление в консоли и/или alert
    setTimeout(() => {
      alert(`🔔 ${payload.title}\n\n${payload.body}`);
    }, 100);
    return;
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/badge-72x72.png',
      image: payload.image,
      data: payload.data,
      requireInteraction: true,
      actions: payload.data?.action ? [
        {
          action: payload.data.action,
          title: 'Открыть',
          icon: '/icon-action.png'
        }
      ] : undefined
    });

    notification.onclick = () => {
      window.focus();
      if (payload.data?.url) {
        window.location.href = payload.data.url;
      }
      notification.close();
    };

    // Автозакрытие через 10 секунд
    setTimeout(() => {
      notification.close();
    }, 10000);
  }
};

export { app, messaging };