'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthModal from '@/components/AuthModal';
import ProfilePage from '@/components/ProfilePage';
import ClassManagement from '@/components/ClassManagement';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import TeachersDirectory from '@/components/TeachersDirectory';
import LoadingScreen from '@/components/LoadingScreen';
import BottomNavigation from '@/components/BottomNavigation';
import HomePage from '@/components/HomePage';
import SubscriptionShop from '@/components/SubscriptionShop';
import { useAutoNotifications } from '@/hooks/useAutoNotifications';

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showClassManagement, setShowClassManagement] = useState(false);
  const [showLoyaltyProgram, setShowLoyaltyProgram] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [userBonusPoints, setUserBonusPoints] = useState(1250);

  // Синхронизация бонусов с localStorage для уведомлений
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const profileData = {
          bonusPoints: userBonusPoints,
          subscriptions: [],
          upcomingClasses: []
        };
        localStorage.setItem('harmony_profile', JSON.stringify(profileData));

        // Очищаем уведомления о низком балансе если баланс достаточный
        if (userBonusPoints > 50) {
          const sentNotifications = JSON.parse(localStorage.getItem('harmony_sent_notifications') || '[]');
          const filteredNotifications = sentNotifications.filter((key: string) => !key.startsWith('low_balance_'));
          localStorage.setItem('harmony_sent_notifications', JSON.stringify(filteredNotifications));
        }
      } catch (error) {
        console.error('Error saving profile to localStorage:', error);
      }
    }
  }, [userBonusPoints, isAuthenticated]);
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'teachers' | 'profile'>('home');

  // Инициализация автоматических уведомлений
  const { isEnabled: notificationsEnabled } = useAutoNotifications({
    enabled: isAuthenticated, // включаем только для авторизованных пользователей
    checkInterval: 1, // проверяем каждую минуту для демо
    reminderTime: 30, // напоминание за 30 минут
    expiryDays: 3, // предупреждение за 3 дня
    lowBalanceThreshold: 50 // снижаем порог до 50, чтобы не срабатывало на 1250
  });

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const authData = localStorage.getItem('harmony_auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      setIsAuthenticated(parsed.isAuthenticated);
    }
  }, []);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowClassManagement(false);
    setShowLoyaltyProgram(false);
    setShowSubscriptions(false);
    setActiveTab('home');
  };

  // Создание платежа и редирект на ЮKassa
  const createPaymentAndRedirect = async (sub: any) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      let phone: string | undefined;
      try {
        const authRaw = localStorage.getItem('harmony_auth');
        if (authRaw) {
          const auth = JSON.parse(authRaw);
          phone = auth.phone as string | undefined;
          if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.startsWith('8')) phone = '7' + digits.slice(1);
            else if (digits.startsWith('7')) phone = digits;
            else if (digits.startsWith('9') && digits.length === 10) phone = '7' + digits; // 9XXXXXXXXX -> 7XXXXXXXXXX
          }
        }
      } catch {}

      const body: any = {
        amount: sub.price,
        description: sub.name,
        subscriptionId: sub.id,
        userId: 'current_user',
        returnUrl: origin ? `${origin}/#profile` : 'http://localhost:3000/#profile',
      };
      if (phone) body.customer = { phone };

      const res = await fetch('/api/payments/yukassa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Payment error');
      const url: string | undefined = data?.payment?.confirmation?.confirmation_url;
      if (url) {
        window.location.href = url;
      } else {
        alert('Не удалось получить ссылку на оплату');
      }
    } catch (e: any) {
      console.error('Create payment failed', e);
      alert('Ошибка создания платежа. Попробуйте позже.');
    }
  };

  const handleTabChange = (tab: 'home' | 'classes' | 'teachers' | 'profile') => {
    setActiveTab(tab);
    
    // Сброс других состояний
    setShowClassManagement(false);
    setShowLoyaltyProgram(false);
    setShowSubscriptions(false);

    // Переключение на соответствующие экраны
    if (tab === 'classes') {
      setShowClassManagement(true);
    } else if (tab === 'teachers') {
      // показываем каталог преподавателей
    }
    // home и profile обрабатываются в render логике
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Если пользователь авторизован, показываем соответствующий экран
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-teal-50 pb-20">
        {showClassManagement && (
          <ClassManagement onBack={() => handleTabChange('home')} />
        )}
        {showLoyaltyProgram && (
          <LoyaltyProgram 
            onBack={() => handleTabChange('home')} 
            currentPoints={userBonusPoints}
            onPointsUpdate={setUserBonusPoints}
          />
        )}
        {showSubscriptions && (
          <SubscriptionShop 
            onPurchase={(sub) => {
              // Оставляем окно открытым до редиректа
              createPaymentAndRedirect(sub);
            }}
            onClose={() => {
              setShowSubscriptions(false);
              handleTabChange('home');
            }}
          />
        )}
        {!showClassManagement && !showLoyaltyProgram && !showSubscriptions && activeTab === 'home' && (
          <HomePage 
            userName="Родитель"
            userBonusPoints={userBonusPoints}
            onShowClassManagement={() => handleTabChange('classes')}
            onShowLoyaltyProgram={() => handleTabChange('teachers')}
            onShowSubscriptions={() => setShowSubscriptions(true)}
          />
        )}
        {!showClassManagement && !showLoyaltyProgram && activeTab === 'teachers' && (
          <TeachersDirectory />
        )}
        {!showClassManagement && !showLoyaltyProgram && activeTab === 'profile' && (
          <ProfilePage 
            onLogout={handleLogout} 
            onShowClassManagement={() => handleTabChange('classes')}
            onShowLoyaltyProgram={() => handleTabChange('teachers')}
          />
        )}

        {/* Краткие реквизиты внизу (после авторизации) */}
        <div className="px-4 mt-2 mb-3">
          <div className="text-center text-[11px] sm:text-xs text-gray-500">
            <div className="inline-flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 bg-white/80 rounded-lg px-3 py-2 border border-gray-200">
              <span>ИП Золочевская Дарья Николаевна</span>
              <span className="hidden sm:inline">•</span>
              <span>ИНН 432403568907</span>
              <span className="hidden sm:inline">•</span>
              <span>ОГРНИП 325774600435896</span>
              <a href="/legal/requisites" className="hidden sm:inline text-blue-600 hover:underline">Подробнее</a>
            </div>
          </div>
        </div>
        
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Показываем загрузку или форму входа
  if (isLoading) {
    return (
      <LoadingScreen 
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0" />
      
      <div className="text-center relative z-10 px-4">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 font-heading tracking-wider"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ГАРМОНИЯ
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-3xl text-gray-800 font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Центр развития ребенка
          </motion.p>
          
          <motion.div 
            className="flex justify-center items-center space-x-4"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="h-1 w-20 bg-gray-200 rounded-full"></div>
            <div className="text-yellow-400 text-2xl">✨</div>
            <div className="h-1 w-20 bg-gray-200 rounded-full"></div>
          </motion.div>
        </motion.div>
        
          <motion.button
          onClick={handleLoginClick}
            className="bg-blue-600 text-white font-bold text-xl sm:text-2xl px-12 sm:px-16 py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center justify-center">
            🚀 Войти в систему
          </span>
        </motion.button>
        
          <motion.p 
            className="text-gray-500 text-sm mt-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Добро пожаловать в мир развития! 🌟
        </motion.p>

        {/* Реквизиты компании (требование платежных систем) */}
        <div className="mt-8 text-xs text-gray-500">
          <div className="inline-flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-3 bg-white/80 backdrop-blur-md rounded-lg px-3 py-2 border border-gray-200">
            <span>ИП Золочевская Дарья Николаевна</span>
            <span className="hidden sm:inline">•</span>
            <span>ИНН: 432403568907</span>
            <span className="hidden sm:inline">•</span>
            <span>ОГРНИП: 325774600435896</span>
          </div>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}