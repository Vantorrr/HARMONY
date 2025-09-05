// Система автоматических уведомлений для Harmony Fitness
import { useEffect, useCallback } from 'react';
import { showLocalNotification, type NotificationPayload } from '@/lib/firebase';

interface UserData {
  phone: string;
  subscriptions: Array<{
    id: string;
    name: string;
    validUntil: string;
    sessionsLeft: number;
    isActive: boolean;
  }>;
  bonusPoints: number;
  upcomingClasses: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
    confirmed: boolean;
  }>;
  notificationPreferences: {
    reminders: boolean;
    expiry: boolean;
    balance: boolean;
    promotions: boolean;
  };
}

interface AutoNotificationOptions {
  enabled: boolean;
  checkInterval?: number; // в минутах
  reminderTime?: number; // за сколько минут до занятия напоминать
  expiryDays?: number; // за сколько дней предупреждать об истечении
  lowBalanceThreshold?: number; // минимальный баланс для уведомления
}

export function useAutoNotifications(options: AutoNotificationOptions = { enabled: true }) {
  const {
    enabled = true,
    checkInterval = 5, // проверяем каждые 5 минут
    reminderTime = 30, // напоминание за 30 минут
    expiryDays = 3, // предупреждение за 3 дня
    lowBalanceThreshold = 100 // уведомление при балансе менее 100
  } = options;

  // Получение данных пользователя
  const getUserData = useCallback((): UserData | null => {
    try {
      const authData = localStorage.getItem('harmony_auth');
      const profileData = localStorage.getItem('harmony_profile');
      const notificationPrefs = localStorage.getItem('harmony_notification_preferences');

      if (!authData || !profileData) return null;

      const auth = JSON.parse(authData);
      const profile = JSON.parse(profileData);
      const prefs = notificationPrefs ? JSON.parse(notificationPrefs) : {
        reminders: true,
        expiry: true,
        balance: true,
        promotions: false
      };

      return {
        phone: auth.phone,
        subscriptions: profile.subscriptions || [],
        bonusPoints: profile.bonusPoints || 0,
        upcomingClasses: profile.upcomingClasses || [],
        notificationPreferences: prefs
      };
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }, []);

  // Проверка напоминаний о занятиях
  const checkClassReminders = useCallback((userData: UserData) => {
    if (!userData.notificationPreferences.reminders) return;

    const now = new Date();
    const reminderThreshold = new Date(now.getTime() + reminderTime * 60 * 1000);

    userData.upcomingClasses.forEach(cls => {
      const classDateTime = new Date(`${cls.date}T${cls.time}`);
      
      // Проверяем есть ли класс в ближайшие reminderTime минут
      if (classDateTime <= reminderThreshold && classDateTime > now && !cls.confirmed) {
        const minutesUntil = Math.floor((classDateTime.getTime() - now.getTime()) / (1000 * 60));
        
        // Проверяем что мы еще не отправляли это уведомление
        const notificationKey = `reminder_${cls.id}_${cls.date}`;
        const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
        
        if (!sentNotifications.includes(notificationKey)) {
          const notification: NotificationPayload = {
            title: '⏰ Напоминание о занятии',
            body: `${cls.name} начнется через ${minutesUntil} минут! Не забудьте взять форму и полотенце.`,
            icon: '/icon-reminder.png',
            data: {
              type: 'reminder',
              action: 'confirm',
              url: '/#classes'
            }
          };

          showLocalNotification(notification);
          
          // Запоминаем что уведомление отправлено
          sentNotifications.push(notificationKey);
          localStorage.setItem('harmony_sent_notifications', JSON.stringify(sentNotifications));
          
          console.log('📱 Class reminder sent:', cls.name);
        }
      }
    });
  }, [reminderTime]);

  // Проверка истечения абонементов
  const checkSubscriptionExpiry = useCallback((userData: UserData) => {
    if (!userData.notificationPreferences.expiry) return;

    const now = new Date();
    const expiryThreshold = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);

    userData.subscriptions.forEach(sub => {
      if (!sub.isActive) return;

      const expiryDate = new Date(sub.validUntil);
      
      // Проверяем истекает ли абонемент в ближайшие дни
      if (expiryDate <= expiryThreshold && expiryDate > now) {
        const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        const notificationKey = `expiry_${sub.id}_${daysUntil}`;
        const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
        
        if (!sentNotifications.includes(notificationKey)) {
          let title, body;
          
          if (daysUntil === 1) {
            title = '⚠️ Абонемент истекает завтра!';
            body = `Ваш абонемент "${sub.name}" истекает завтра. Продлите его сегодня со скидкой!`;
          } else {
            title = '⚠️ Абонемент скоро истечет';
            body = `Ваш абонемент "${sub.name}" истекает через ${daysUntil} дня. Не забудьте продлить!`;
          }

          const notification: NotificationPayload = {
            title,
            body,
            icon: '/icon-warning.png',
            data: {
              type: 'expiry',
              action: 'renew',
              url: '/#subscriptions'
            }
          };

          showLocalNotification(notification);
          
          sentNotifications.push(notificationKey);
          localStorage.setItem('harmony_sent_notifications', JSON.stringify(sentNotifications));
          
          console.log('📱 Subscription expiry warning sent:', sub.name);
        }
      }
    });
  }, [expiryDays]);

  // Проверка низкого баланса
  const checkLowBalance = useCallback((userData: UserData) => {
    if (!userData.notificationPreferences.balance) return;

    if (userData.bonusPoints <= lowBalanceThreshold) {
      const notificationKey = `low_balance_${userData.bonusPoints}`;
      const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
      
      if (!sentNotifications.includes(notificationKey)) {
        const notification: NotificationPayload = {
          title: '💰 Низкий баланс бонусов',
          body: `На вашем счету осталось ${userData.bonusPoints} бонусных баллов. Заработайте больше баллов!`,
          icon: '/icon-money.png',
          data: {
            type: 'balance',
            action: 'view',
            url: '/#profile'
          }
        };

        showLocalNotification(notification);
        
        sentNotifications.push(notificationKey);
        localStorage.setItem('harmony_sent_notifications', JSON.stringify(sentNotifications));
        
        console.log('📱 Low balance warning sent:', userData.bonusPoints);
      }
    }
  }, [lowBalanceThreshold]);

  // Отправка промо-уведомлений (примеры)
  const checkPromotions = useCallback((userData: UserData) => {
    if (!userData.notificationPreferences.promotions) return;

    // Проверяем специальные даты для промо
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const dateStr = now.toDateString();

    // Пример: скидка на выходные (пятница вечером)
    if (dayOfWeek === 5 && hour === 18) {
      const notificationKey = `weekend_promo_${dateStr}`;
      const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
      
      if (!sentNotifications.includes(notificationKey)) {
        const notification: NotificationPayload = {
          title: '🎉 Выходные со скидкой!',
          body: 'Специальное предложение: -20% на все массажные процедуры в выходные дни!',
          icon: '/icon-promotion.png',
          image: '/weekend-promo.jpg',
          data: {
            type: 'promotion',
            action: 'view',
            url: '/#shop'
          }
        };

        showLocalNotification(notification);
        
        sentNotifications.push(notificationKey);
        localStorage.setItem('harmony_sent_notifications', JSON.stringify(sentNotifications));
        
        console.log('📱 Weekend promotion sent');
      }
    }

    // Пример: напоминание о занятии в понедельник утром
    if (dayOfWeek === 1 && hour === 8) {
      const notificationKey = `monday_motivation_${dateStr}`;
      const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
      
      if (!sentNotifications.includes(notificationKey)) {
        const notification: NotificationPayload = {
          title: '💪 Понедельник - день силы!',
          body: 'Начните неделю с энергии! Запишитесь на занятие и получите дополнительные бонусы.',
          icon: '/icon-motivation.png',
          data: {
            type: 'promotion',
            action: 'view',
            url: '/#classes'
          }
        };

        showLocalNotification(notification);
        
        sentNotifications.push(notificationKey);
        localStorage.setItem('harmony_sent_notifications', JSON.stringify(sentNotifications));
        
        console.log('📱 Monday motivation sent');
      }
    }
  }, []);

  // Основная функция проверки
  const checkNotifications = useCallback(() => {
    if (!enabled) return;

    const userData = getUserData();
    if (!userData) return;

    try {
      checkClassReminders(userData);
      checkSubscriptionExpiry(userData);
      checkLowBalance(userData);
      checkPromotions(userData);
    } catch (error) {
      console.error('Error checking notifications:', error);
    }
  }, [enabled, getUserData, checkClassReminders, checkSubscriptionExpiry, checkLowBalance, checkPromotions]);

  // Очистка старых уведомлений (старше 7 дней)
  const cleanupOldNotifications = useCallback(() => {
    try {
      const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
      const notificationTimestamps = JSON.parse(localStorage.getItem('harmony_notification_timestamps') || '{}');
      
      const now = Date.now();
      const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
      
      const cleanedNotifications = sentNotifications.filter((key: string) => {
        const timestamp = notificationTimestamps[key];
        return timestamp && timestamp > weekAgo;
      });
      
      localStorage.setItem('harmony_sent_notifications', JSON.stringify(cleanedNotifications));
      
      // Очищаем timestamps
      const cleanedTimestamps: any = {};
      cleanedNotifications.forEach((key: string) => {
        if (notificationTimestamps[key]) {
          cleanedTimestamps[key] = notificationTimestamps[key];
        }
      });
      localStorage.setItem('harmony_notification_timestamps', JSON.stringify(cleanedTimestamps));
      
    } catch (error) {
      console.error('Error cleaning up notifications:', error);
    }
  }, []);

  // Установка интервальной проверки
  useEffect(() => {
    if (!enabled) return;

    // Проверяем сразу
    checkNotifications();
    
    // Очищаем старые уведомления при запуске
    cleanupOldNotifications();

    // Устанавливаем интервал
    const interval = setInterval(() => {
      checkNotifications();
    }, checkInterval * 60 * 1000);

    // Очистка каждые 24 часа
    const cleanupInterval = setInterval(cleanupOldNotifications, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [enabled, checkInterval, checkNotifications, cleanupOldNotifications]);

  // Тестовые уведомления для демонстрации
  const sendTestNotifications = useCallback(() => {
    console.log('🧪 Sending test notifications...');
    
    setTimeout(() => {
      showLocalNotification({
        title: '⏰ Тест напоминания',
        body: 'Ваше занятие "Йога" начнется через 30 минут!',
        icon: '/icon-reminder.png',
        data: { type: 'reminder', action: 'confirm' }
      });
    }, 1000);

    setTimeout(() => {
      showLocalNotification({
        title: '⚠️ Тест истечения',
        body: 'Ваш абонемент "Групповой Безлимит" истекает через 2 дня!',
        icon: '/icon-warning.png',
        data: { type: 'expiry', action: 'renew' }
      });
    }, 3000);

    setTimeout(() => {
      showLocalNotification({
        title: '💰 Тест баланса',
        body: 'На вашем счету осталось 87 бонусных баллов.',
        icon: '/icon-money.png', 
        data: { type: 'balance', action: 'view' }
      });
    }, 5000);

    setTimeout(() => {
      showLocalNotification({
        title: '🔥 Тест акции',
        body: 'Специальное предложение: скидка 25% на персональные занятия!',
        icon: '/icon-promotion.png',
        data: { type: 'promotion', action: 'view' }
      });
    }, 7000);
  }, []);

  return {
    checkNotifications,
    sendTestNotifications,
    cleanupOldNotifications,
    isEnabled: enabled
  };
}