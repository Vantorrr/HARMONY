# 🔥 Firebase Push Уведомления - Настройка

## 🎯 Текущий статус

✅ **DEMO РЕЖИМ АКТИВЕН** - push уведомления работают в симуляции  
❌ **Реальный Firebase** - не настроен (нужна настройка для продакшена)

---

## 🛠️ Как работает сейчас (Demo режим)

### ✅ Что работает:
- 📱 **Симуляция получения токена** - генерирует mock токен
- 🔔 **Автоматическое разрешение** - не требует реального разрешения браузера  
- 📨 **Mock уведомления** - показывает alert вместо реальных уведомлений
- 🎮 **Service Worker** - использует `/sw-demo.js` для демонстрации

### 📱 Как тестировать:
1. Откройте **Настройки уведомлений** в профиле
2. Включите любой тип уведомлений
3. Увидите сообщение "✅ Уведомления настроены успешно!"
4. Тестовые уведомления будут показаны как alert

---

## 🚀 Настройка реального Firebase (для продакшена)

### 1. 📋 Создайте Firebase проект

1. Зайдите в [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект "harmony-fitness"
3. Включите **Cloud Messaging**

### 2. 🔧 Получите конфигурацию

В настройках проекта найдите **Web app config**:

```javascript
// Ваша конфигурация будет выглядеть так:
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "harmony-fitness-real.firebaseapp.com",
  projectId: "harmony-fitness-real", 
  storageBucket: "harmony-fitness-real.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-ABCDEFGHIJ"
};
```

### 3. 🔑 Получите VAPID ключ

1. В Firebase Console → **Project Settings** → **Cloud Messaging**
2. В разделе **Web configuration** → **Web Push certificates**
3. Создайте новый ключ или используйте существующий
4. Скопируйте **Key pair**

### 4. 📁 Создайте .env.local файл

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=harmony-fitness-real.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=harmony-fitness-real
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=harmony-fitness-real.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BNdVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 5. 🔄 Перезапустите проект

```bash
npm run dev
```

**🎉 Теперь Firebase будет работать в реальном режиме!**

---

## 🔍 Проверка режима работы

Откройте **DevTools** → **Console** и найдите сообщения:

### Demo режим:
```
🎮 Firebase в demo режиме - симуляция Messaging
🎮 Demo режим - генерация mock токена
🔔 Mock FCM Token: demo_token_1234567890_abc123def
```

### Реальный режим:
```
FCM Token: eXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Notification permission granted
```

---

## 🛡️ Безопасность

### ⚠️ НЕ КОММИТЬТЕ:
- `.env.local` файл 
- Реальные Firebase ключи
- VAPID ключи

### ✅ Добавьте в .gitignore:
```
.env.local
.env.production
```

---

## 🎯 API для отправки Push

После настройки Firebase вы сможете отправлять реальные push уведомления через Firebase Admin SDK или REST API.

### Пример отправки:
```javascript
// Отправка через Admin SDK
await admin.messaging().send({
  token: fcmToken,
  notification: {
    title: 'Центр "Гармония"',
    body: 'Напоминание о занятии через 30 минут!'
  },
  data: {
    type: 'reminder',
    action: 'view_schedule'
  }
});
```

---

## 📞 Поддержка

**🎯 Сейчас всё работает в demo режиме для разработки!**

**🚀 Для продакшена просто добавьте реальные Firebase ключи в .env.local**