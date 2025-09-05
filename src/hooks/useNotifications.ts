// Хук для управления пуш-уведомлениями Harmony Fitness
import { useState, useEffect, useCallback } from 'react';
import { 
  initializeMessaging, 
  getMessagingToken, 
  requestNotificationPermission, 
  onMessageListener,
  showLocalNotification,
  type NotificationPayload 
} from '@/lib/firebase';

interface NotificationState {
  isSupported: boolean;
  permission: NotificationPermission | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface NotificationPreferences {
  reminders: boolean;
  expiry: boolean;
  balance: boolean;
  promotions: boolean;
}

export function useNotifications() {
  const [state, setState] = useState<NotificationState>({
    isSupported: false,
    permission: null,
    token: null,
    isLoading: true,
    error: null
  });

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    reminders: true,
    expiry: true,
    balance: true,
    promotions: false
  });

  // Проверка поддержки уведомлений
  useEffect(() => {
    const checkSupport = () => {
      const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
      const permission = isSupported ? Notification.permission : null;
      
      setState(prev => ({
        ...prev,
        isSupported,
        permission,
        isLoading: false
      }));
    };

    checkSupport();
  }, []);

  // Загрузка настроек из localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('harmony_notification_preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      }
    }
  }, []);

  // Сохранение настроек в localStorage
  const savePreferences = useCallback((newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('harmony_notification_preferences', JSON.stringify(newPreferences));
  }, []);

  // Инициализация Firebase Messaging
  const initializeNotifications = useCallback(async () => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Уведомления не поддерживаются' }));
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Инициализация messaging
      const messaging = initializeMessaging();
      if (!messaging) {
        throw new Error('Failed to initialize messaging');
      }

      // Запрос разрешения
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        setState(prev => ({ 
          ...prev, 
          permission: 'denied', 
          isLoading: false,
          error: 'Разрешение на уведомления не предоставлено' 
        }));
        return false;
      }

      // Получение токена
      const token = await getMessagingToken();
      if (!token) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: 'Не удалось получить токен для уведомлений' 
        }));
        return false;
      }

      // Сохраняем токен для отправки на сервер
      localStorage.setItem('harmony_fcm_token', token);

      setState(prev => ({
        ...prev,
        permission: 'granted',
        token,
        isLoading: false,
        error: null
      }));

      console.log('🔔 Notifications initialized successfully');
      return true;

    } catch (error) {
      console.error('Error initializing notifications:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка инициализации уведомлений'
      }));
      return false;
    }
  }, [state.isSupported]);

  // Подписка на входящие сообщения
  useEffect(() => {
    if (state.permission === 'granted') {
      const unsubscribe = onMessageListener().then((payload: any) => {
        console.log('Received foreground message:', payload);
        
        // Показываем уведомление если приложение в фокусе
        if (payload.notification) {
          const notificationPayload: NotificationPayload = {
            title: payload.notification.title,
            body: payload.notification.body,
            icon: payload.notification.icon,
            data: payload.data
          };
          
          showLocalNotification(notificationPayload);
        }
      }).catch(error => {
        console.error('Error setting up message listener:', error);
      });

      return () => {
        // Cleanup if needed
      };
    }
  }, [state.permission]);

  // Обработка сообщений от Service Worker
  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
        console.log('Notification clicked, navigating to:', event.data.url);
        // Навигация будет обрабатываться в main app
      }
    };

    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerMessage);
    
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, []);

  // Отправка токена на сервер (симуляция)
  const syncTokenWithServer = useCallback(async (userId: string) => {
    if (!state.token) return false;

    try {
      // В реальном приложении здесь будет API вызов
      console.log('🔄 Syncing FCM token with server:', {
        userId,
        token: state.token,
        preferences
      });

      // Симуляция API вызова
      const tokenData = {
        userId,
        fcmToken: state.token,
        preferences,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          timestamp: new Date().toISOString()
        }
      };

      localStorage.setItem('harmony_user_notification_data', JSON.stringify(tokenData));
      
      return true;
    } catch (error) {
      console.error('Error syncing token with server:', error);
      return false;
    }
  }, [state.token, preferences]);

  // Отправка тестового уведомления
  const sendTestNotification = useCallback((type: 'reminder' | 'expiry' | 'balance' | 'promotion' = 'reminder') => {
    const testNotifications = {
      reminder: {
        title: '⏰ Напоминание о занятии',
        body: 'Ваше занятие начнется через 30 минут!',
        data: { type: 'reminder', action: 'view' }
      },
      expiry: {
        title: '⚠️ Абонемент истекает',
        body: 'Ваш абонемент истекает через 3 дня. Продлите его сейчас!',
        data: { type: 'expiry', action: 'renew' }
      },
      balance: {
        title: '💰 Низкий баланс',
        body: 'На вашем балансе осталось мало бонусных баллов',
        data: { type: 'balance', action: 'topup' }
      },
      promotion: {
        title: '🔥 Специальное предложение!',
        body: 'Скидка 20% на все абонементы до конца месяца!',
        data: { type: 'promotion', action: 'view' }
      }
    };

    const notification = testNotifications[type];
    showLocalNotification(notification);
  }, []);

  return {
    // Состояние
    isSupported: state.isSupported,
    permission: state.permission,
    token: state.token,
    isLoading: state.isLoading,
    error: state.error,
    preferences,

    // Методы
    initializeNotifications,
    savePreferences,
    syncTokenWithServer,
    sendTestNotification,

    // Утилиты
    isEnabled: state.permission === 'granted' && !!state.token,
    needsPermission: state.isSupported && state.permission !== 'granted'
  };
}