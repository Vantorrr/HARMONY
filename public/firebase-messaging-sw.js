// Firebase Messaging Service Worker
// Обрабатывает push уведомления когда приложение в фоне

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase config (тот же что в main app)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "harmony-fitness-demo.firebaseapp.com", 
  projectId: "harmony-fitness-demo",
  storageBucket: "harmony-fitness-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Инициализация Firebase в Service Worker
firebase.initializeApp(firebaseConfig);

// Получение messaging instance
const messaging = firebase.messaging();

// Обработка фоновых сообщений
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Harmony Fitness';
  const notificationOptions = {
    body: payload.notification?.body || 'У вас новое уведомление',
    icon: payload.notification?.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    image: payload.notification?.image,
    data: payload.data || {},
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Открыть приложение',
        icon: '/icon-action.png'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/icon-close.png'
      }
    ],
    tag: payload.data?.type || 'general',
    renotify: true,
    timestamp: Date.now()
  };

  // Показываем уведомление
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received:', event);

  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Определяем URL для открытия на основе типа уведомления
  let urlToOpen = '/';
  
  if (event.notification.data) {
    const data = event.notification.data;
    
    switch (data.type) {
      case 'reminder':
        urlToOpen = '/#classes';
        break;
      case 'expiry':
        urlToOpen = '/#subscriptions';
        break;
      case 'balance':
        urlToOpen = '/#profile';
        break;
      case 'promotion':
        urlToOpen = data.url || '/#shop';
        break;
      default:
        urlToOpen = '/';
    }
  }

  // Открываем приложение
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // Проверяем есть ли уже открытое окно
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Фокусируемся на существующем окне
          client.focus();
          // Переходим на нужную страницу
          client.postMessage({
            type: 'NOTIFICATION_CLICK',
            url: urlToOpen,
            data: event.notification.data
          });
          return;
        }
      }
      
      // Если окна нет - открываем новое
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin + urlToOpen);
      }
    })
  );
});

// Обработка закрытия уведомлений
self.addEventListener('notificationclose', function(event) {
  console.log('[firebase-messaging-sw.js] Notification closed:', event);
  
  // Можно отправить аналитику о закрытии уведомления
  if (event.notification.data?.type) {
    // Отправляем событие закрытия
    self.registration.sync?.register('notification-closed');
  }
});

// Кастомные стили для уведомлений
const getNotificationOptions = (type, title, body, data = {}) => {
  const baseOptions = {
    body: body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: { type, ...data },
    requireInteraction: true,
    timestamp: Date.now()
  };

  switch (type) {
    case 'reminder':
      return {
        ...baseOptions,
        icon: '/icon-reminder.png',
        actions: [
          { action: 'confirm', title: 'Подтвердить посещение', icon: '/icon-check.png' },
          { action: 'reschedule', title: 'Перенести', icon: '/icon-calendar.png' }
        ],
        tag: 'class-reminder',
        vibrate: [200, 100, 200]
      };

    case 'expiry':
      return {
        ...baseOptions,
        icon: '/icon-warning.png',
        actions: [
          { action: 'renew', title: 'Продлить абонемент', icon: '/icon-renew.png' },
          { action: 'view', title: 'Посмотреть тарифы', icon: '/icon-view.png' }
        ],
        tag: 'subscription-expiry',
        urgency: 'high'
      };

    case 'balance':
      return {
        ...baseOptions,
        icon: '/icon-money.png',
        actions: [
          { action: 'topup', title: 'Пополнить баланс', icon: '/icon-plus.png' },
          { action: 'view', title: 'Мой профиль', icon: '/icon-profile.png' }
        ],
        tag: 'low-balance'
      };

    case 'promotion':
      return {
        ...baseOptions,
        icon: '/icon-promotion.png',
        image: data.image || '/promo-banner.jpg',
        actions: [
          { action: 'view', title: 'Посмотреть акцию', icon: '/icon-fire.png' }
        ],
        tag: 'promotion'
      };

    default:
      return baseOptions;
  }
};

// Экспорт функции для использования
self.createNotification = (type, title, body, data) => {
  const options = getNotificationOptions(type, title, body, data);
  return self.registration.showNotification(title, options);
};