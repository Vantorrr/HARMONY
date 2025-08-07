'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  User, 
  Phone, 
  Calendar, 
  CreditCard, 
  Bell, 
  Award, 
  Clock,
  LogOut,
  Star,
  Plus,
  ArrowLeft,
  Crown,
  Gift,
  Zap,
  Heart,
  Edit3,
  BookOpen,
  Trash2
} from 'lucide-react';
import SubscriptionShop from './SubscriptionShop';
import PaymentModal from './PaymentModal';
import ClassManagement from './ClassManagement';
import LoyaltyProgram from './LoyaltyProgram';
import NotificationSettings from './NotificationSettings';

interface AuthData {
  phone: string;
  isAuthenticated: boolean;
  loginTime: number;
}

interface ProfilePageProps {
  onLogout: () => void;
  onShowClassManagement?: () => void;
  onShowLoyaltyProgram?: () => void;
}

interface Subscription {
  id: string;
  name: string;
  type: 'group' | 'individual' | 'massage' | 'premium' | 'kids_group';
  price: number;
  duration: number;
  sessions: number;
  description: string;
  features: string[];
}

export default function ProfilePage({ onLogout, onShowClassManagement, onShowLoyaltyProgram }: ProfilePageProps) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [showSubscriptionShop, setShowSubscriptionShop] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [userBonusPoints, setUserBonusPoints] = useState(1250);
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([]);
  const [showClassManagement, setShowClassManagement] = useState(false);
  const [showLoyaltyProgram, setShowLoyaltyProgram] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍👩‍👧‍👦');
  const [showNameEditor, setShowNameEditor] = useState(false);
  const [newName, setNewName] = useState('');
  const [currentTab, setCurrentTab] = useState('children');
  const [showChildModal, setShowChildModal] = useState(false);
  const [editingChild, setEditingChild] = useState<any>(null);
  const [childrenData, setChildrenData] = useState([
    { id: 1, name: 'Маша', age: 5, avatar: '👧', level: 8 },
    { id: 2, name: 'Ваня', age: 3, avatar: '👦', level: 4 }
  ]);
  const [animationData, setAnimationData] = useState<any>(null);

  // Генерируем анимационные данные только на клиенте
  useEffect(() => {
    const bubbles = Array.from({ length: 6 }, (_, i) => ({
      left: [15, 35, 65, 80, 25, 55][i] + '%',
      top: [20, 60, 40, 70, 30, 80][i] + '%',
      delay: i * 1.5,
      duration: [8, 10, 12, 9, 11, 8][i]
    }));

    const stars = Array.from({ length: 4 }, (_, i) => ({
      left: (20 + i * 20) + '%',
      top: [20, 40, 60, 30][i] + '%',
      duration: [12, 14, 16, 13][i]
    }));

    setAnimationData({ bubbles, stars });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('harmony_auth');
    if (stored) {
      setAuthData(JSON.parse(stored));
    }

    // Загружаем данные пользователя
    const userProfile = localStorage.getItem('harmony_profile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setUserBonusPoints(profile.bonusPoints || 1250);
      setUserSubscriptions(profile.subscriptions || []);
      setSelectedAvatar(profile.avatar || '👨‍👩‍👧‍👦');
      setChildrenData(profile.children || [
        { id: 1, name: 'Маша', age: 5, avatar: '👧', level: 8 },
        { id: 2, name: 'Ваня', age: 3, avatar: '👦', level: 4 }
      ]);
    }
  }, []);

  // Сохраняем аватар при его изменении
  useEffect(() => {
    const userProfile = localStorage.getItem('harmony_profile');
    const profile = userProfile ? JSON.parse(userProfile) : {};
    profile.avatar = selectedAvatar;
    profile.children = childrenData;
    localStorage.setItem('harmony_profile', JSON.stringify(profile));
  }, [selectedAvatar, childrenData]);

  // Функции управления детьми
  const addChild = (childData: any) => {
    const newChild = {
      id: Date.now(),
      ...childData,
      level: 1
    };
    setChildrenData([...childrenData, newChild]);
  };

  const editChild = (childData: any) => {
    setChildrenData(childrenData.map(child => 
      child.id === editingChild.id ? { ...child, ...childData } : child
    ));
    setEditingChild(null);
  };

  const deleteChild = (childId: number) => {
    setChildrenData(childrenData.filter(child => child.id !== childId));
  };

  // Swipe navigation between tabs
  const tabs = ['children', 'classes', 'bonuses'];
  const currentTabIndex = tabs.indexOf(currentTab);
  
  const handleSwipe = (direction: number) => {
    const newIndex = currentTabIndex + direction;
    if (newIndex >= 0 && newIndex < tabs.length) {
      setCurrentTab(tabs[newIndex]);
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        // Swipe right - previous tab
        handleSwipe(-1);
      } else {
        // Swipe left - next tab  
        handleSwipe(1);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('harmony_auth');
    localStorage.removeItem('harmony_profile');
    onLogout();
  };

  const handleSubscriptionPurchase = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowSubscriptionShop(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (subscription: Subscription, usedBonus: number) => {
    // Обновляем профиль пользователя
    const newBonusPoints = userBonusPoints - usedBonus + Math.floor(subscription.price * 0.05); // 5% кэшбэк
    const newSubscription = {
      ...subscription,
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + subscription.duration * 24 * 60 * 60 * 1000).toISOString(),
      remainingSessions: subscription.sessions
    };

    const updatedProfile = {
      bonusPoints: newBonusPoints,
      subscriptions: [...userSubscriptions, newSubscription]
    };

    localStorage.setItem('harmony_profile', JSON.stringify(updatedProfile));
    setUserBonusPoints(newBonusPoints);
    setUserSubscriptions([...userSubscriptions, newSubscription]);
    setShowPaymentModal(false);
    setSelectedSubscription(null);

    // Показываем уведомление об успехе
    alert(`Абонемент "${subscription.name}" успешно приобретен!`);
  };

  if (!authData) return null;

  // Доступные аватарки для семьи
  const familyAvatars = [
    '👨‍👩‍👧‍👦', '👪', '👨‍👩‍👧', '👨‍👩‍👦', '👩‍👩‍👧‍👦', '👨‍👨‍👧‍👦',
    '👨‍👩‍👧‍👧', '👨‍👩‍👦‍👦', '👩‍👧', '👨‍👧', '👩‍👦', '👨‍👦',
    '💕', '❤️', '💝', '🌟', '✨', '🎈'
  ];

  // Данные пользователя
  const userData = {
    name: 'Семья Петровых',
    level: 15,
    bonusPoints: userBonusPoints,
    avatar: selectedAvatar,
    children: childrenData,
    currentSubscription: userSubscriptions.length > 0 ? {
      type: userSubscriptions[userSubscriptions.length - 1].name,
      validUntil: new Date(userSubscriptions[userSubscriptions.length - 1].expiryDate).toLocaleDateString(),
      sessionsLeft: userSubscriptions[userSubscriptions.length - 1].remainingSessions
    } : {
      type: 'Нет активного абонемента',
      validUntil: '-',
      sessionsLeft: 0
    },
    recentVisits: [
      { date: '2024-08-04', activity: 'Развивашки', duration: '1ч', child: 'Маша' },
      { date: '2024-08-02', activity: 'Творчество', duration: '45мин', child: 'Ваня' },
      { date: '2024-07-30', activity: 'Подготовка к школе', duration: '1ч 15мин', child: 'Маша' },
    ]
  };

  // Доступные абонементы в игровом стиле
  const gameSubscriptions = [
    {
      id: 'razvivashki',
      name: 'Развивашки',
      subtitle: 'Для малышей 2-4 года',
      price: 3000,
      emoji: '🧸',
      color: 'from-pink-400 to-purple-500',
              bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      features: ['8 занятий', 'Развитие моторики', 'Игры и песни'],
      illustration: '🎨'
    },
    {
      id: 'school-prep', 
      name: 'Школьная подготовка',
      subtitle: 'Готовимся к школе',
      price: 4500,
      emoji: '📚',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      features: ['12 занятий', 'Чтение и письмо', 'Математика'],
      illustration: '🎓'
    },
    {
      id: 'creative',
      name: 'Творчество',
      subtitle: 'Развиваем таланты',
      price: 3800,
      emoji: '🎨',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      features: ['8 занятий', 'Рисование', 'Лепка и поделки'],
      illustration: '🖼️'
    },
    {
      id: 'sport',
      name: 'Спорт',
      subtitle: 'Здоровое развитие',
      price: 4000,
      emoji: '⚽',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      features: ['10 занятий', 'Гимнастика', 'Командные игры'],
      illustration: '🏃‍♂️'
    },
    {
      id: 'massage',
      name: 'Массаж для родителей',
      subtitle: 'Пока дети занимаются',
      price: 6000,
      emoji: '💆‍♀️',
      color: 'from-purple-400 to-pink-500',
              bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      features: ['3 сеанса', 'Релаксация', 'Ароматерапия'],
      illustration: '🌸'
    },
    {
      id: 'yoga',
      name: 'Йога для родителей',
      subtitle: 'Гармония и спокойствие',
      price: 5000,
      emoji: '🧘‍♀️',
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100',
      features: ['8 занятий', 'Медитации', 'Дыхательные практики'],
      illustration: '🕯️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Floating Background Elements */}
      {animationData && (
        <div className="absolute inset-0">
          {animationData.bubbles.map((bubble: any, i: number) => (
            <motion.div
              key={`bg-bubble-${i}`}
              className="absolute w-16 h-16 bg-white/10 rounded-full"
              style={{
                left: bubble.left,
                top: bubble.top,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
          
          {/* Floating stars */}
          {animationData.stars.map((star: any, i: number) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute text-2xl text-white/20"
              style={{
                left: star.left,
                top: star.top,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.header 
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-heading font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              ✨ Личный кабинет
            </motion.h1>
            <motion.button
              onClick={handleLogout}
              className="flex items-center text-white/80 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Profile Header - Game Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-2xl"
        >
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
          
          <div className="relative z-10">
            {/* Top section with avatar and level */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-lg font-medium">🌟 Семейный профиль</span>
              </div>
              <motion.button
                onClick={handleLogout}
                className="text-white/80 hover:text-white text-sm bg-white/10 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Выйти
              </motion.button>
            </div>

            {/* Avatar and main info */}
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border-4 border-white/30 mr-6 cursor-pointer relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setShowAvatarSelector(true)}
              >
                <span className="text-3xl">{userData.avatar}</span>
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs"
                  whileHover={{ scale: 1.2 }}
                >
                  ✏️
                </motion.div>
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-heading font-bold">{userData.name}</h2>
                  <motion.button
                    onClick={() => setShowNameEditor(true)}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✏️
                  </motion.button>
                </div>
                <div className="flex items-center mb-2">
                  <Crown className="w-4 h-4 text-yellow-300 mr-2" />
                  <span className="text-white/90 font-medium">Level {userData.level}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation tabs - Mobile Enhanced */}
            <div className="flex flex-wrap sm:space-x-6 text-sm font-medium">
              <motion.button
                className={`pb-2 px-3 py-2 mr-4 mb-2 sm:mb-0 sm:mr-0 rounded-lg sm:rounded-none transition-all touch-manipulation min-h-[44px] flex items-center justify-center
                  ${currentTab === 'children' 
                    ? 'text-white border-b-2 border-white bg-white/10 sm:bg-transparent' 
                    : 'text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 sm:bg-transparent'}`}
                onClick={() => setCurrentTab('children')}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                👶 Дети
              </motion.button>
              <motion.button
                className={`pb-2 px-3 py-2 mr-4 mb-2 sm:mb-0 sm:mr-0 rounded-lg sm:rounded-none transition-all touch-manipulation min-h-[44px] flex items-center justify-center
                  ${currentTab === 'classes' 
                    ? 'text-white border-b-2 border-white bg-white/10 sm:bg-transparent' 
                    : 'text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 sm:bg-transparent'}`}
                onClick={() => setCurrentTab('classes')}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                📚 Занятия
              </motion.button>
              <motion.button
                className={`pb-2 px-3 py-2 mr-4 mb-2 sm:mb-0 sm:mr-0 rounded-lg sm:rounded-none transition-all touch-manipulation min-h-[44px] flex items-center justify-center
                  ${currentTab === 'bonuses' 
                    ? 'text-white border-b-2 border-white bg-white/10 sm:bg-transparent' 
                    : 'text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 sm:bg-transparent'}`}
                onClick={() => setCurrentTab('bonuses')}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                🎁 Бонусы
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Content Based on Selected Tab - Swipeable */}
        <motion.div 
          className="space-y-4 overflow-hidden"
          onPanEnd={handlePanEnd}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
        >
          {/* Swipe indicator */}
          <div className="flex justify-center space-x-2 mb-4 sm:hidden">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTabIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {currentTab === 'children' && (
              <motion.div
                key="children"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Children Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    👶 Информация о детях
                  </h3>
                  <motion.button
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 sm:py-2 rounded-full text-sm font-bold flex items-center min-h-[44px] touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowChildModal(true)}
                  >
                                            <Plus size={16} className="mr-1" />
                        <span className="hidden xs:inline">Добавить ребенка</span>
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {userData.children.map((child) => (
                    <motion.div
                      key={child.id}
                      className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-4xl">{child.avatar}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{child.name}</h4>
                          <p className="text-gray-600">{child.age} лет</p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-600 mr-2">Уровень {child.level}</span>
                            <div className="flex">
                              {[...Array(Math.min(child.level, 5))].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
                        <motion.button
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-3 sm:py-2 rounded-full text-sm font-bold min-h-[44px] touch-manipulation flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setEditingChild(child);
                            setShowChildModal(true);
                          }}
                        >
                          <Edit3 size={16} className="mr-1" />
                          <span className="hidden xs:inline">Редактировать</span>
                        </motion.button>
                        
                        <motion.button
                          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-3 sm:py-2 rounded-full text-sm font-bold min-h-[44px] touch-manipulation flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onShowClassManagement?.()}
                        >
                          <BookOpen size={16} className="mr-1" />
                          <span className="hidden xs:inline">Занятия</span>
                        </motion.button>
                        
                        <motion.button
                          className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-3 sm:py-2 rounded-full text-sm font-bold min-h-[44px] touch-manipulation flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (confirm(`Удалить ребенка ${child.name}?`)) {
                              deleteChild(child.id);
                            }
                          }}
                        >
                          <Trash2 size={16} className="mr-1" />
                          <span className="hidden xs:inline">Удалить</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {userData.children.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="flex justify-center mb-4">
                        <User size={64} className="text-gray-400" />
                      </div>
                      <p className="text-lg mb-4">Детей пока нет</p>
                      <motion.button
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowChildModal(true)}
                      >
                        <Plus size={16} className="inline mr-2" />
                        Добавить первого ребенка
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
              </motion.div>
            )}

            {currentTab === 'classes' && (
              <motion.div
                key="classes"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Available Classes */}
              {gameSubscriptions.map((subscription, index) => (
                <motion.div
                  key={subscription.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center p-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{subscription.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{subscription.subtitle}</p>
                      
                      <motion.button
                        className={`bg-gradient-to-r ${subscription.color} text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg`}
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const sub = {
                            id: subscription.id,
                            name: subscription.name,
                            type: 'kids_group' as const,
                            price: subscription.price,
                            duration: 30,
                            sessions: 8,
                            description: subscription.subtitle,
                            features: subscription.features
                          };
                          handleSubscriptionPurchase(sub);
                        }}
                      >
                        КУПИТЬ {subscription.price}₽
                      </motion.button>
                    </div>

                    {/* Character illustration */}
                    <div className={`w-32 h-32 ${subscription.bgColor} rounded-2xl flex items-center justify-center ml-6 relative overflow-hidden`}>
                      <motion.div
                        className="text-6xl"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        {subscription.emoji}
                      </motion.div>
                      
                      {/* Floating elements */}
                      <motion.div
                        className="absolute top-2 right-2 text-xl"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {subscription.illustration}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            )}

            {currentTab === 'bonuses' && (
              <motion.div
                key="bonuses"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Bonus Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl text-center"
              >
                <div className="flex justify-center mb-4">
                  <Gift size={64} className="text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Бонусная программа</h3>
                <div className="text-4xl font-bold text-yellow-500 mb-4">{userData.bonusPoints}</div>
                <p className="text-gray-600 mb-6">У вас есть {userData.bonusPoints} бонусных баллов</p>
                <p className="text-sm text-gray-500 mb-6">1 балл = 1 рубль при оплате абонементов</p>
                <motion.button
                  onClick={() => onShowLoyaltyProgram?.()}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎉 Подробнее о программе
                </motion.button>
              </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 gap-4"
        >
          <motion.button
            onClick={() => setShowNotificationSettings(true)}
            className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-4 text-white shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center">
              <Bell className="w-6 h-6 mr-3" />
              <h3 className="font-bold text-lg">Настройки уведомлений</h3>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* All Modals */}
      <AnimatePresence>
        {showSubscriptionShop && (
          <SubscriptionShop 
            onClose={() => setShowSubscriptionShop(false)}
            onPurchase={handleSubscriptionPurchase}
          />
        )}

        {showPaymentModal && selectedSubscription && (
          <PaymentModal
            subscription={selectedSubscription}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedSubscription(null);
            }}
            onSuccess={handlePaymentSuccess}
            bonusPoints={userBonusPoints}
          />
        )}

        {showClassManagement && (
          <ClassManagement onBack={() => setShowClassManagement(false)} />
        )}

        {showLoyaltyProgram && (
          <LoyaltyProgram 
            onBack={() => setShowLoyaltyProgram(false)} 
            currentPoints={userBonusPoints}
            onPointsUpdate={setUserBonusPoints}
          />
        )}

        {showNotificationSettings && (
          <NotificationSettings
            userId={authData?.phone}
            onClose={() => setShowNotificationSettings(false)}
          />
        )}

        {showAvatarSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAvatarSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🎨 Выберите аватар семьи
              </h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                {familyAvatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    className={`w-16 h-16 rounded-2xl text-3xl flex items-center justify-center border-4 transition-all ${
                      selectedAvatar === avatar 
                        ? 'border-purple-500 bg-purple-100 scale-110' 
                        : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    whileHover={{ scale: selectedAvatar === avatar ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarSelector(false);
                    }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-2xl font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAvatarSelector(false)}
                >
                  Отмена
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showChildModal && (
          <ChildModal
            isOpen={showChildModal}
            onClose={() => {
              setShowChildModal(false);
              setEditingChild(null);
            }}
            onSave={editingChild ? editChild : addChild}
            editingChild={editingChild}
          />
        )}
      </AnimatePresence>

      {/* Name Editor Modal */}
      <AnimatePresence>
        {showNameEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Изменить название семьи</h3>
              
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={userData.name}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowNameEditor(false);
                    setNewName('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    if (newName.trim()) {
                      // Здесь будет сохранение имени
                      console.log('Новое имя:', newName);
                      setShowNameEditor(false);
                      setNewName('');
                    }
                  }}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium"
                >
                  Сохранить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Компонент модального окна для добавления/редактирования ребенка
function ChildModal({ isOpen, onClose, onSave, editingChild }: any) {
  const [name, setName] = useState(editingChild?.name || '');
  const [age, setAge] = useState(editingChild?.age || '');
  const [selectedChildAvatar, setSelectedChildAvatar] = useState(editingChild?.avatar || '👶');

  // Обновляем поля при изменении editingChild
  useEffect(() => {
    if (editingChild) {
      setName(editingChild.name);
      setAge(editingChild.age.toString());
      setSelectedChildAvatar(editingChild.avatar);
    } else {
      setName('');
      setAge('');
      setSelectedChildAvatar('👶');
    }
  }, [editingChild]);

  const childAvatars = [
    '👶', '👧', '👦', '🧒', '👩', '👨', 
    '🦄', '🐱', '🐶', '🐰', '🐻', '🐼',
    '🦊', '🐸', '🐯', '🦁', '🐵', '🐨',
    '🎭', '🎨', '🎪', '🎯', '⚽', '🏀'
  ];

  const handleSave = () => {
    if (!name.trim() || !age) {
      alert('Заполните все поля!');
      return;
    }

    onSave({
      name: name.trim(),
      age: parseInt(age),
      avatar: selectedChildAvatar
    });

    setName('');
    setAge('');
    setSelectedChildAvatar('👶');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                          {editingChild ? (
                  <><Edit3 size={20} className="inline mr-2" />Редактировать ребенка</>
                ) : (
                  <><Plus size={20} className="inline mr-2" />Добавить ребенка</>
                )}
        </h3>

        {/* Имя */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Имя ребенка</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Введите имя"
          />
        </div>

        {/* Возраст */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Возраст</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="18"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Возраст в годах"
          />
        </div>

        {/* Выбор аватара */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Выберите аватар</label>
          <div className="grid grid-cols-4 gap-3">
            {childAvatars.map((avatar, index) => (
              <motion.button
                key={index}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-4 transition-all ${
                  selectedChildAvatar === avatar 
                    ? 'border-purple-500 bg-purple-100 scale-110' 
                    : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                }`}
                whileHover={{ scale: selectedChildAvatar === avatar ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedChildAvatar(avatar)}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <motion.button
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-2xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
          >
            Отмена
          </motion.button>
          <motion.button
            className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-2xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
          >
            {editingChild ? 'Сохранить' : 'Добавить'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}