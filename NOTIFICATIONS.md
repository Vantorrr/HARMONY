# 🔔 Push-уведомления Harmony Fitness

Полная система пуш-уведомлений с Firebase Cloud Messaging (FCM) для фитнес-центра.

## 📋 Возможности

### Для пользователей:
- ⏰ **Напоминания о тренировках** - за 30 минут до занятия
- ⚠️ **Истечение абонемента** - предупреждение за 3 дня
- 💰 **Низкий баланс** - при балансе менее 100 бонусов
- 🎉 **Акции и промо** - специальные предложения
- ⚙️ **Настройки уведомлений** - гибкая настройка типов

### Для администраторов:
- 📱 **Массовая рассылка** - всем пользователям или сегментам
- 📝 **Шаблоны уведомлений** - готовые шаблоны для разных типов
- 📊 **Статистика** - открываемость, клики, конверсия
- ⏱️ **Планирование** - отложенная отправка
- 🎯 **Таргетинг** - отправка конкретным клиентам

## 🏗️ Архитектура

```
src/
├── lib/
│   └── firebase.ts              # Конфигурация Firebase
├── hooks/
│   ├── useNotifications.ts      # Основной хук для уведомлений
│   └── useAutoNotifications.ts  # Автоматические уведомления
├── components/
│   ├── NotificationSettings.tsx # Настройки для пользователей
│   └── admin/
│       └── NotificationAdmin.tsx # Админка уведомлений
└── public/
    ├── firebase-messaging-sw.js # Service Worker
    └── manifest.json           # PWA manifest
```

## 🚀 Быстрый старт

### 1. Настройка Firebase

```bash
# Установка зависимостей уже выполнена
npm install firebase
```

### 2. Конфигурация Firebase

В файле `src/lib/firebase.ts` замените конфиг на ваш:

```typescript
const firebaseConfig = {
  apiKey: "ваш-api-key",
  authDomain: "ваш-проект.firebaseapp.com",
  projectId: "ваш-проект-id",
  storageBucket: "ваш-проект.appspot.com",
  messagingSenderId: "123456789",
  appId: "ваш-app-id"
};

const VAPID_KEY = "ваш-vapid-ключ-из-firebase-console";
```

### 3. Настройка Service Worker

Service Worker уже создан в `public/firebase-messaging-sw.js`. Обновите в нем тот же Firebase конфиг.

### 4. Использование в приложении

```typescript
// Настройки уведомлений для пользователя
import NotificationSettings from '@/components/NotificationSettings';

<NotificationSettings 
  userId={currentUser.id}
  onClose={() => setShowSettings(false)}
/>

// Автоматические уведомления (уже интегрированы)
import { useAutoNotifications } from '@/hooks/useAutoNotifications';

const { isEnabled } = useAutoNotifications({
  enabled: isAuthenticated,
  checkInterval: 5, // проверка каждые 5 минут
  reminderTime: 30, // напоминание за 30 минут
  expiryDays: 3,    // предупреждение за 3 дня
  lowBalanceThreshold: 100
});
```

## 📱 Типы уведомлений

### 1. Напоминания о тренировках
```typescript
{
  title: "⏰ Время тренировки!",
  body: "Ваша тренировка начнется через 30 минут!",
  type: "reminder",
  actions: ["Подтвердить", "Перенести"]
}
```

### 2. Истечение абонемента  
```typescript
{
  title: "⚠️ Абонемент истекает",
  body: "Ваш абонемент истекает через 3 дня",
  type: "expiry", 
  actions: ["Продлить", "Посмотреть тарифы"]
}
```

### 3. Низкий баланс
```typescript
{
  title: "💰 Низкий баланс",
  body: "На счету осталось мало бонусных баллов",
  type: "balance",
  actions: ["Пополнить", "Мой профиль"]
}
```

### 4. Акции и промо
```typescript
{
  title: "🔥 Специальное предложение!",
  body: "Скидка 25% на все абонементы!",
  type: "promotion",
  actions: ["Посмотреть акцию"]
}
```

## 🎛️ Настройки пользователя

Пользователи могут настроить:
- ✅ Включить/выключить типы уведомлений
- 🧪 Отправить тестовые уведомления
- 📱 Управление разрешениями браузера
- 🔄 Синхронизация с сервером

## 👨‍💼 Админка

### Отправка уведомлений
- **Аудитория**: Все пользователи / Сегменты / Конкретные клиенты
- **Шаблоны**: Готовые шаблоны или кастомные сообщения  
- **Планирование**: Отправить сейчас или запланировать
- **Превью**: Предпросмотр уведомления

### Шаблоны
- **Создание**: Конструктор шаблонов с переменными
- **Управление**: Активация/деактивация шаблонов
- **Типизация**: Привязка к типам уведомлений

### Аналитика
- **Метрики**: Отправлено / Доставлено / Кликов
- **CTR**: Click-through rate по типам
- **История**: Журнал всех кампаний

## 🔧 Техническая реализация

### LocalStorage ключи
```typescript
// Токен FCM
'harmony_fcm_token'

// Настройки уведомлений  
'harmony_notification_preferences'

// Отправленные уведомления (для предотвращения дублирования)
'harmony_sent_notifications'

// Данные пользователя для push
'harmony_user_notification_data'
```

### События Service Worker
```javascript
// Фоновые уведомления
self.addEventListener('notificationclick', handleClick);
self.addEventListener('notificationclose', handleClose);

// Синхронизация
self.addEventListener('sync', handleSync);
```

## 🧪 Тестирование

### Тест всех типов уведомлений
```typescript
import { useNotifications } from '@/hooks/useNotifications';

const { sendTestNotification } = useNotifications();

// Отправка тестовых уведомлений
sendTestNotification('reminder');
sendTestNotification('expiry'); 
sendTestNotification('balance');
sendTestNotification('promotion');
```

### Автоматические тесты
```typescript
import { useAutoNotifications } from '@/hooks/useAutoNotifications';

const { sendTestNotifications } = useAutoNotifications();

// Отправка серии тестовых уведомлений
sendTestNotifications();
```

## 🌐 Поддержка браузеров

✅ **Поддерживается:**
- Chrome 50+
- Firefox 44+
- Safari 16+
- Edge 17+

❌ **Не поддерживается:**
- IE (любые версии)
- Safari < 16
- Старые мобильные браузеры

## 🔒 Безопасность

- **VAPID ключи**: Аутентификация с FCM
- **Разрешения**: Явный запрос разрешений от пользователя
- **Токены**: Безопасное хранение FCM токенов
- **Service Worker**: Изолированное выполнение

## 📈 Метрики и аналитика

### Основные KPI
- **Delivery Rate**: % доставленных уведомлений
- **Open Rate**: % открытых уведомлений  
- **Click Rate**: % кликов по уведомлениям
- **Conversion**: % покупок после уведомлений

### Сегментация
- По типам абонементов
- По активности пользователей
- По времени последнего посещения
- По балансу бонусов

## 🛠️ Разработка

### Добавление нового типа уведомления

1. **Обновите типы**:
```typescript
// src/lib/firebase.ts
type NotificationType = 'reminder' | 'expiry' | 'balance' | 'promotion' | 'new_type';
```

2. **Добавьте логику**:
```typescript
// src/hooks/useAutoNotifications.ts
const checkNewType = useCallback((userData: UserData) => {
  // Логика проверки нового типа
}, []);
```

3. **Обновите UI**:
```typescript
// src/components/NotificationSettings.tsx
const notificationTypes = [
  // ... существующие типы
  {
    key: 'new_type',
    title: 'Новый тип',
    description: 'Описание нового типа',
    icon: <NewIcon className="w-5 h-5" />,
    color: 'text-green-500'
  }
];
```

### Кастомные шаблоны

```typescript
// Создание шаблона с переменными
const template = {
  title: "Привет, {name}!",
  body: "У вас осталось {sessions} занятий до {date}",
  variables: ['name', 'sessions', 'date']
};

// Рендеринг с данными
const renderTemplate = (template, data) => ({
  title: template.title.replace(/{(\w+)}/g, (_, key) => data[key]),
  body: template.body.replace(/{(\w+)}/g, (_, key) => data[key])
});
```

## 🎯 Roadmap

### Ближайшие планы
- [ ] **Geofencing**: Уведомления при входе в зал
- [ ] **Rich Media**: Изображения и видео в уведомлениях
- [ ] **Action Buttons**: Интерактивные кнопки
- [ ] **Scheduling**: Улучшенное планирование

### Долгосрочные цели
- [ ] **ML Персонализация**: ИИ для оптимального времени отправки
- [ ] **A/B Testing**: Тестирование эффективности сообщений
- [ ] **Deep Linking**: Прямые ссылки в конкретные разделы
- [ ] **Offline Queue**: Очередь уведомлений для офлайн режима

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте разрешения браузера
2. Убедитесь что Service Worker зарегистрирован
3. Проверьте Firebase конфигурацию
4. Посмотрите консоль браузера на ошибки

**Все готово! 🚀 Система пуш-уведомлений полностью интегрирована и готова к использованию!**