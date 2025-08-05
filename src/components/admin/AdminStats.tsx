'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  Star,
  Download,
  Filter
} from 'lucide-react';

interface AdminStatsProps {
  adminUser: {
    username: string;
    role: string;
    permissions: string[];
  };
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export default function AdminStats({ adminUser }: AdminStatsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [stats, setStats] = useState<StatCard[]>([]);

  // Генерация статистики в зависимости от периода  
  const generateStatsForPeriod = (period: string) => {
    const baseMultipliers = {
      week: { clients: 0.15, revenue: 0.2, visits: 0.25 },
      month: { clients: 1, revenue: 1, visits: 1 },
      quarter: { clients: 3.5, revenue: 4.2, visits: 3.8 },
      year: { clients: 15.2, revenue: 18.5, visits: 16.7 }
    };

    const multiplier = baseMultipliers[period as keyof typeof baseMultipliers] || baseMultipliers.month;
    
    return [
      {
        title: 'Всего клиентов',
        value: Math.round(1247 * multiplier.clients),
        change: period === 'week' ? 1.2 : period === 'month' ? 12.5 : period === 'quarter' ? 28.7 : 45.3,
        changeType: 'increase' as const,
        icon: <Users className="w-6 h-6" />,
        color: 'bg-blue-500'
      },
      {
        title: 'Активных абонементов',
        value: Math.round(892 * multiplier.clients),
        change: period === 'week' ? 0.8 : period === 'month' ? 8.3 : period === 'quarter' ? 25.4 : 38.8,
        changeType: 'increase' as const,
        icon: <CreditCard className="w-6 h-6" />,
        color: 'bg-green-500'
      },
      {
        title: `Выручка за ${period === 'week' ? 'неделю' : period === 'month' ? 'месяц' : period === 'quarter' ? 'квартал' : 'год'}`,
        value: `₽${Math.round(847500 * multiplier.revenue).toLocaleString()}`,
        change: period === 'week' ? 2.1 : period === 'month' ? 15.2 : period === 'quarter' ? 35.7 : 52.4,
        changeType: 'increase' as const,
        icon: <DollarSign className="w-6 h-6" />,
        color: 'bg-primary-500'
      },
      {
        title: `Посещений за ${period === 'week' ? 'неделю' : period === 'month' ? 'месяц' : period === 'quarter' ? 'квартал' : 'год'}`,
        value: Math.round(156 * multiplier.visits),
        change: period === 'week' ? -1.2 : period === 'month' ? -3.1 : period === 'quarter' ? 4.8 : 12.3,
        changeType: period === 'week' || period === 'month' ? 'decrease' as const : 'increase' as const,
        icon: <Calendar className="w-6 h-6" />,
        color: 'bg-yellow-500'
      },
      {
        title: 'Средний рейтинг',
        value: period === 'week' ? 4.9 : period === 'month' ? 4.8 : period === 'quarter' ? 4.7 : 4.6,
        change: period === 'week' ? 0.1 : period === 'month' ? 0.2 : period === 'quarter' ? -0.1 : 0.3,
        changeType: period === 'quarter' ? 'decrease' as const : 'increase' as const,
        icon: <Star className="w-6 h-6" />,
        color: 'bg-purple-500'
      },
      {
        title: 'Время в зале',
        value: `${Math.round(98 + (period === 'week' ? -5 : period === 'month' ? 0 : period === 'quarter' ? 8 : 15))} мин`,
        change: period === 'week' ? -2.3 : period === 'month' ? 5.7 : period === 'quarter' ? 8.9 : 12.1,
        changeType: period === 'week' ? 'decrease' as const : 'increase' as const,
        icon: <Clock className="w-6 h-6" />,
        color: 'bg-indigo-500'
      }
    ];
  };

  useEffect(() => {
    const newStats = generateStatsForPeriod(selectedPeriod);
    setStats(newStats);
  }, [selectedPeriod]);

  const recentActivities = [
    {
      id: '1',
      type: 'registration',
      message: 'Новый клиент: Анна Петрова',
      time: '5 минут назад',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: '2',
      type: 'payment',
      message: 'Оплачен абонемент: ₽2,500',
      time: '12 минут назад',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: '3',
      type: 'visit',
      message: 'Подтверждено 15 посещений',
      time: '25 минут назад',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: '4',
      type: 'subscription',
      message: 'Истекает 3 абонемента',
      time: '1 час назад',
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const topClients = [
    {
      id: '1',
      name: 'Елена Смирнова',
      visits: 45,
      spent: 12500,
      level: 'Платина'
    },
    {
      id: '2', 
      name: 'Алексей Новиков',
      visits: 38,
      spent: 9800,
      level: 'Золото'
    },
    {
      id: '3',
      name: 'Мария Козлова',
      visits: 32,
      spent: 8200,
      level: 'Золото'
    },
    {
      id: '4',
      name: 'Иван Петров',
      visits: 28,
      spent: 7100,
      level: 'Серебро'
    }
  ];

  const subscriptionTypes = [
    { name: 'Групповые занятия', count: 345, percentage: 38.7, color: 'bg-blue-500' },
    { name: 'Персональные занятия', count: 234, percentage: 26.2, color: 'bg-green-500' },
    { name: 'Премиум', count: 187, percentage: 21.0, color: 'bg-purple-500' },
    { name: 'Массаж', count: 126, percentage: 14.1, color: 'bg-yellow-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900">
            Статистика и аналитика
          </h2>
          <motion.p 
            key={selectedPeriod}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-neutral-600 mt-1"
          >
            📊 Данные за {
              selectedPeriod === 'week' ? 'последнюю неделю' :
              selectedPeriod === 'month' ? 'текущий месяц' :
              selectedPeriod === 'quarter' ? 'текущий квартал' : 'текущий год'
            }
          </motion.p>
        </div>
        <div className="flex gap-2">
          <motion.select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium bg-white"
          >
            <option value="week">📅 Неделя</option>
            <option value="month">📅 Месяц</option>
            <option value="quarter">📅 Квартал</option>
            <option value="year">📅 Год</option>
          </motion.select>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg font-medium"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Скачать отчет
          </motion.button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.title}-${selectedPeriod}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              type: "spring",
              damping: 20
            }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : stat.changeType === 'decrease' ? (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <Activity className="w-4 h-4 text-neutral-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' :
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-neutral-600'
                  }`}>
                    {stat.changeType === 'increase' ? '+' : stat.changeType === 'decrease' ? '-' : ''}{Math.abs(stat.change)}%
                  </span>
                  <span className="text-sm text-neutral-500 ml-1">за период</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Последняя активность</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              Показать все
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{activity.message}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Топ клиенты</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              Показать все
            </button>
          </div>
          
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{client.name}</p>
                    <p className="text-xs text-neutral-500">{client.visits} посещений</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900">₽{client.spent.toLocaleString()}</p>
                  <p className="text-xs text-neutral-500">{client.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Типы абонементов</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              Детали
            </button>
          </div>
          
          <div className="space-y-4">
            {subscriptionTypes.map((type) => (
              <div key={type.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-neutral-900">{type.name}</span>
                  <span className="text-sm text-neutral-600">{type.count}</span>
                </div>
                <div className="bg-neutral-200 rounded-full h-2">
                  <div 
                    className={`${type.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-neutral-500 mt-1">{type.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Выручка по месяцам</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              <Filter className="w-4 h-4 inline mr-1" />
              Фильтр
            </button>
          </div>
          
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
              <p className="text-neutral-500">График выручки</p>
              <p className="text-sm text-neutral-400">Интеграция с Chart.js</p>
            </div>
          </div>
        </div>

        {/* Visit Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Динамика посещений</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              <Filter className="w-4 h-4 inline mr-1" />
              Фильтр
            </button>
          </div>
          
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
              <p className="text-neutral-500">График посещений</p>
              <p className="text-sm text-neutral-400">Интеграция с Chart.js</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Общая производительность</h3>
            <p className="text-white/80">
              Отличные результаты за {selectedPeriod === 'month' ? 'месяц' : 'период'}!
              Рост клиентской базы на 12%, увеличение выручки на 15%.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">92%</div>
            <div className="text-white/80">Общий рейтинг</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-white/80 text-sm">Клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">₽847K</div>
            <div className="text-white/80 text-sm">Выручка</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4.8★</div>
            <div className="text-white/80 text-sm">Рейтинг</div>
          </div>
        </div>
      </div>
    </div>
  );
}