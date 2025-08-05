// Demo Service Worker для Push уведомлений
// Используется когда Firebase не настроен

console.log('🎮 Demo Service Worker активирован');

// Обработка установки
self.addEventListener('install', (event) => {
  console.log('🛠️ Demo SW установлен');
  self.skipWaiting();
});

// Обработка активации
self.addEventListener('activate', (event) => {
  console.log('✅ Demo SW активирован');
  event.waitUntil(self.clients.claim());
});

// Обработка push сообщений (demo)
self.addEventListener('push', (event) => {
  console.log('📱 Demo push получен:', event);
  
  const defaultOptions = {
    title: 'Центр "Гармония"',
    body: 'У вас новое уведомление!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'harmony-demo',
    data: {
      type: 'demo',
      timestamp: Date.now()
    }
  };

  let notificationOptions = defaultOptions;

  if (event.data) {
    try {
      const payload = event.data.json();
      notificationOptions = {
        ...defaultOptions,
        ...payload,
        ...payload.notification
      };
    } catch (error) {
      console.error('Ошибка парсинга push данных:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationOptions.title, notificationOptions)
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Клик по уведомлению:', event.notification);
  
  event.notification.close();

  // Открываем приложение
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      // Если есть открытые окна, фокусируемся на них
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Иначе открываем новое окно
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});

// Обработка закрытия уведомлений
self.addEventListener('notificationclose', (event) => {
  console.log('❌ Уведомление закрыто:', event.notification);
});