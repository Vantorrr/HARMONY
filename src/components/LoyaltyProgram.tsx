'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award,
  Star,
  Gift,
  Clock,
  TrendingUp,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Zap,
  Target,
  Trophy
} from 'lucide-react';

interface LoyaltyTransaction {
  id: string;
  date: string;
  type: 'earned' | 'spent' | 'expired';
  amount: number;
  description: string;
  source: string;
}

interface LoyaltyLevel {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  multiplier: number;
  perks: string[];
  color: string;
  icon: string;
}

interface LoyaltyProgramProps {
  onBack: () => void;
  currentPoints: number;
  onPointsUpdate: (points: number) => void;
}

export default function LoyaltyProgram({ onBack, currentPoints, onPointsUpdate }: LoyaltyProgramProps) {
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [currentLevel, setCurrentLevel] = useState<LoyaltyLevel | null>(null);
  const [nextLevel, setNextLevel] = useState<LoyaltyLevel | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'rewards'>('overview');

  const loyaltyLevels: LoyaltyLevel[] = [
    {
      id: 'bronze',
      name: 'Бронза',
      minPoints: 0,
      maxPoints: 999,
      multiplier: 1,
      perks: ['1% кэшбэк', 'Базовые скидки'],
      color: 'from-red-500 to-red-700',
      icon: '🥉'
    },
    {
      id: 'silver',
      name: 'Серебро',
      minPoints: 1000,
      maxPoints: 2999,
      multiplier: 1.2,
      perks: ['2% кэшбэк', '5% скидка на абонементы', 'Приоритетная запись'],
      color: 'from-blue-500 to-blue-700',
      icon: '🥈'
    },
    {
      id: 'gold',
      name: 'Золото',
      minPoints: 3000,
      maxPoints: 6999,
      multiplier: 1.5,
      perks: ['3% кэшбэк', '10% скидка на абонементы', 'Бесплатная заморозка', 'Персональные консультации'],
      color: 'from-yellow-500 to-yellow-700',
      icon: '🥇'
    },
    {
      id: 'platinum',
      name: 'Платина',
      minPoints: 7000,
      maxPoints: 14999,
      multiplier: 2,
      perks: ['5% кэшбэк', '15% скидка на абонементы', 'VIP зона', 'Персональный педагог 1 раз в месяц'],
      color: 'from-blue-600 to-red-600',
      icon: '💎'
    },
    {
      id: 'diamond',
      name: 'Бриллиант',
      minPoints: 15000,
      maxPoints: Infinity,
      multiplier: 2.5,
      perks: ['7% кэшбэк', '20% скидка на абонементы', 'Все VIP услуги', 'Персональный менеджер', 'Эксклюзивные мероприятия'],
      color: 'from-yellow-600 to-blue-600',
      icon: '💍'
    }
  ];

  const rewards = [
    {
      id: '1',
      name: 'Бесплатное занятие',
      points: 500,
      description: 'Одно персональное занятие с педагогом',
      available: true
    },
    {
      id: '2',
      name: 'Массаж 30 мин',
      points: 800,
      description: 'Расслабляющий массаж длительностью 30 минут',
      available: true
    },
    {
      id: '3',
      name: 'Спортивная бутылка',
      points: 300,
      description: 'Фирменная бутылка Harmony с логотипом',
      available: true
    },
    {
      id: '4',
      name: 'Абонемент на месяц',
      points: 2000,
      description: 'Месячный абонемент групповых тренировок',
      available: false
    },
    {
      id: '5',
      name: 'Фитнес браслет',
      points: 1500,
      description: 'Умный браслет для отслеживания активности',
      available: true
    }
  ];

  useEffect(() => {
    // Определяем текущий уровень
    const level = loyaltyLevels.find(l => currentPoints >= l.minPoints && currentPoints <= l.maxPoints);
    setCurrentLevel(level || loyaltyLevels[0]);

    // Определяем следующий уровень
    const nextLevelIndex = loyaltyLevels.findIndex(l => currentPoints < l.minPoints);
    setNextLevel(nextLevelIndex >= 0 ? loyaltyLevels[nextLevelIndex] : null);

    // Мокап истории транзакций
    const mockTransactions: LoyaltyTransaction[] = [
      {
        id: '1',
        date: '2024-08-05',
        type: 'earned',
        amount: 125,
        description: 'Покупка абонемента "Групповой Безлимит"',
        source: 'Покупка'
      },
      {
        id: '2',
        date: '2024-08-04',
        type: 'earned',
        amount: 50,
        description: 'Посещение занятия',
        source: 'Активность'
      },
      {
        id: '3',
        date: '2024-08-03',
        type: 'spent',
        amount: -300,
        description: 'Обмен на спортивную бутылку',
        source: 'Награда'
      },
      {
        id: '4',
        date: '2024-08-02',
        type: 'earned',
        amount: 75,
        description: 'Приведи друга - бонус',
        source: 'Реферальная программа'
      },
      {
        id: '5',
        date: '2024-08-01',
        type: 'earned',
        amount: 100,
        description: 'Ежедневный чек-ин (7 дней подряд)',
        source: 'Активность'
      }
    ];

    setTransactions(mockTransactions);
  }, [currentPoints]);

  const getProgressToNextLevel = () => {
    if (!currentLevel || !nextLevel) return 100;
    
    const currentProgress = currentPoints - currentLevel.minPoints;
    const maxProgress = nextLevel.minPoints - currentLevel.minPoints;
    return Math.min((currentProgress / maxProgress) * 100, 100);
  };

  const claimReward = (rewardId: string, points: number) => {
    if (currentPoints >= points) {
      const newPoints = currentPoints - points;
      onPointsUpdate(newPoints);
      
      // Добавляем транзакцию
      const reward = rewards.find(r => r.id === rewardId);
      const newTransaction: LoyaltyTransaction = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: 'spent',
        amount: -points,
        description: `Обмен на ${reward?.name}`,
        source: 'Награда'
      };
      
      setTransactions([newTransaction, ...transactions]);
      alert(`Награда "${reward?.name}" получена!`);
    }
  };

  return (
  <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              Программа лояльности
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl mb-8">
          {[
            { key: 'overview', label: 'Обзор', icon: <Award className="w-4 h-4" /> },
            { key: 'history', label: 'История', icon: <Clock className="w-4 h-4" /> },
            { key: 'rewards', label: 'Награды', icon: <Gift className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all ${
                selectedTab === tab.key
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 text-neutral-900 border border-neutral-200 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-2">
                      {currentLevel?.icon} {currentLevel?.name}
                    </h2>
                    <p className="text-neutral-500">
                      Ваш текущий статус в программе лояльности
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{currentPoints.toLocaleString()}</div>
                    <div className="text-neutral-500">бонусных баллов</div>
                  </div>
                </div>

                {nextLevel && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>До уровня "{nextLevel.name}"</span>
                      <span>{nextLevel.minPoints - currentPoints} баллов</span>
                    </div>
                    <div className="bg-neutral-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getProgressToNextLevel()}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Levels Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loyaltyLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 border-2 transition-all ${
                    currentLevel?.id === level.id 
                      ? 'border-primary-300 shadow-lg' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center text-white text-xl mb-4`}>
                    {level.icon}
                  </div>
                  
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {level.name}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 mb-3">
                    {level.minPoints === 0 ? '0' : level.minPoints.toLocaleString()} - {level.maxPoints === Infinity ? '∞' : level.maxPoints.toLocaleString()} баллов
                  </p>
                  
                  <div className="space-y-1">
                    {level.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center text-sm text-neutral-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {perk}
                      </div>
                    ))}
                  </div>

                  {currentLevel?.id === level.id && (
                    <div className="mt-4 px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full inline-block">
                      Текущий уровень
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-neutral-500">Заработано</span>
                </div>
                <div className="text-xl font-bold text-neutral-900">
                  {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.amount, 0)}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center mb-2">
                  <Gift className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="text-sm text-neutral-500">Потрачено</span>
                </div>
                <div className="text-xl font-bold text-neutral-900">
                  {Math.abs(transactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.amount, 0))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-neutral-500">Множитель</span>
                </div>
                <div className="text-xl font-bold text-neutral-900">
                  x{currentLevel?.multiplier}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm text-neutral-500">До нового уровня</span>
                </div>
                <div className="text-xl font-bold text-neutral-900">
                  {nextLevel ? (nextLevel.minPoints - currentPoints) : 0}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-semibold mb-6">История операций</h2>
            
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      transaction.type === 'earned' 
                        ? 'bg-green-100 text-green-600' 
                        : transaction.type === 'spent'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : transaction.type === 'spent' ? '-' : '!'}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-neutral-900">{transaction.description}</h3>
                      <div className="flex items-center text-sm text-neutral-500">
                        <span>{transaction.source}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(transaction.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'earned' 
                      ? 'text-green-600' 
                      : transaction.type === 'spent'
                      ? 'text-red-600'
                      : 'text-neutral-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'rewards' && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-semibold mb-6">Доступные награды</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
                    !reward.available 
                      ? 'border-neutral-200 opacity-60' 
                      : currentPoints >= reward.points
                      ? 'border-green-200 hover:border-green-300'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{reward.name}</h3>
                    <div className="flex items-center text-sm font-medium text-primary-600">
                      <Star className="w-4 h-4 mr-1" />
                      {reward.points}
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">{reward.description}</p>
                  
                  <button
                    onClick={() => claimReward(reward.id, reward.points)}
                    disabled={!reward.available || currentPoints < reward.points}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      !reward.available
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : currentPoints >= reward.points
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-neutral-100 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {!reward.available 
                      ? 'Недоступно' 
                      : currentPoints >= reward.points 
                      ? 'Получить награду' 
                      : `Нужно ${reward.points - currentPoints} баллов`
                    }
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}