// Firebase Configuration for Harmony Fitness
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Firebase config (используем env, а при отсутствии — реальные ключи, переданные заказчиком)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDEcUXhC01pgmAxUu5xvty6iESABnqivS8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "harmony-center-9ac52.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "harmony-center-9ac52",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "harmony-center-9ac52.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "874294058057",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:874294058057:web:8324034e986666e7f77398",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-VXMPLRXXV1"
};

// VAPID ключ для Web Push (в реальном проекте из Firebase Console)
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "";

// Demo режим для разработки
const HAS_REAL_CONFIG = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "demo-api-key";
const HAS_VAPID = !!VAPID_KEY && VAPID_KEY !== "demo-vapid-key";
const IS_DEMO_MODE = !(HAS_REAL_CONFIG && HAS_VAPID);

// Инициализация Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

let messaging: Messaging | null = null;
let analytics: Analytics | null = null;
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

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
    
    if (!VAPID_KEY) {
      console.warn('FCM VAPID key is missing. Push token cannot be obtained. Add NEXT_PUBLIC_FIREBASE_VAPID_KEY to enable real pushes. Fallback to local notifications will be used.');
      return null;
    }

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

// Инициализация Firebase Analytics (только в браузере и если поддерживается)
export const initializeAnalytics = async (): Promise<Analytics | null> => {
  try {
    if (typeof window === 'undefined') return null;
    const supported = await isAnalyticsSupported();
    if (!supported) return null;
    if (!analytics) {
      analytics = getAnalytics(app);
    }
    return analytics;
  } catch (error) {
    console.warn('Analytics not available:', error);
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

export { app, messaging, analytics, db, storage };