'use client';

import { useState, useEffect } from 'react';
import AuthModal from '@/components/AuthModal';
import ProfilePage from '@/components/ProfilePage';
import ClassManagement from '@/components/ClassManagement';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import LoadingScreen from '@/components/LoadingScreen';
import BottomNavigation from '@/components/BottomNavigation';
import HomePage from '@/components/HomePage';
import { useAutoNotifications } from '@/hooks/useAutoNotifications';

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showClassManagement, setShowClassManagement] = useState(false);
  const [showLoyaltyProgram, setShowLoyaltyProgram] = useState(false);
  const [userBonusPoints, setUserBonusPoints] = useState(1250);
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'bonuses' | 'profile'>('home');

  // Инициализация автоматических уведомлений
  const { isEnabled: notificationsEnabled } = useAutoNotifications({
    enabled: isAuthenticated, // включаем только для авторизованных пользователей
    checkInterval: 1, // проверяем каждую минуту для демо
    reminderTime: 30, // напоминание за 30 минут
    expiryDays: 3, // предупреждение за 3 дня
    lowBalanceThreshold: 100 // уведомление при балансе менее 100
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
    setActiveTab('home');
  };

  const handleTabChange = (tab: 'home' | 'classes' | 'bonuses' | 'profile') => {
    setActiveTab(tab);
    
    // Сброс других состояний
    setShowClassManagement(false);
    setShowLoyaltyProgram(false);

    // Переключение на соответствующие экраны
    if (tab === 'classes') {
      setShowClassManagement(true);
    } else if (tab === 'bonuses') {
      setShowLoyaltyProgram(true);
    }
    // home и profile обрабатываются в render логике
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Если пользователь авторизован, показываем соответствующий экран
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
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
        {!showClassManagement && !showLoyaltyProgram && activeTab === 'home' && (
          <HomePage 
            userName="Родитель"
            userBonusPoints={userBonusPoints}
            onShowClassManagement={() => handleTabChange('classes')}
            onShowLoyaltyProgram={() => handleTabChange('bonuses')}
          />
        )}
        {!showClassManagement && !showLoyaltyProgram && activeTab === 'profile' && (
          <ProfilePage 
            onLogout={handleLogout} 
            onShowClassManagement={() => handleTabChange('classes')}
            onShowLoyaltyProgram={() => handleTabChange('bonuses')}
          />
        )}
        
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  }

  // Показываем простую форму входа после загрузки
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center">
      <div className="text-center">
        {/* Логотип */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 font-heading">
            🌈 ГАРМОНИЯ 🌈
          </h1>
          <p className="text-2xl text-white opacity-90">
            Центр развития ребенка
          </p>
        </div>

        {/* Кнопка входа */}
        <button
          onClick={handleLoginClick}
          className="bg-white text-orange-500 font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🚀 Войти в систему
        </button>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <LoadingScreen 
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}