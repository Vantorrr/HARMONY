'use client';

import { useState, useEffect } from 'react';
import AuthModal from '@/components/AuthModal';
import ProfilePage from '@/components/ProfilePage';
import ClassManagement from '@/components/ClassManagement';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import LoadingScreen from '@/components/LoadingScreen';
import { useAutoNotifications } from '@/hooks/useAutoNotifications';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showClassManagement, setShowClassManagement] = useState(false);
  const [showLoyaltyProgram, setShowLoyaltyProgram] = useState(false);
  const [userBonusPoints, setUserBonusPoints] = useState(1250);

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
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Если пользователь авторизован, показываем соответствующий экран
  if (isAuthenticated) {
    if (showClassManagement) {
      return <ClassManagement onBack={() => setShowClassManagement(false)} />;
    }
    if (showLoyaltyProgram) {
      return (
        <LoyaltyProgram 
          onBack={() => setShowLoyaltyProgram(false)} 
          currentPoints={userBonusPoints}
          onPointsUpdate={setUserBonusPoints}
        />
      );
    }
    return (
      <ProfilePage 
        onLogout={handleLogout} 
        onShowClassManagement={() => setShowClassManagement(true)}
        onShowLoyaltyProgram={() => setShowLoyaltyProgram(true)}
      />
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