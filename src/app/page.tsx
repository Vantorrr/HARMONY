'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

  // Иначе показываем лендинг
  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} />
      <HeroSection onLoginClick={handleLoginClick} />
      <FeaturesSection />
      <StatsSection />
      <CTASection onAuthModalOpen={handleLoginClick} />
      <Footer />
      
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