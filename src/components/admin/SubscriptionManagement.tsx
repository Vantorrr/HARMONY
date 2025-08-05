'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Users,
  CreditCard,
  MoreVertical
} from 'lucide-react';

interface SubscriptionManagementProps {
  adminUser: any;
}

interface Subscription {
  id: string;
  clientName: string;
  clientId: string;
  type: string;
  name: string;
  purchaseDate: string;
  expiryDate: string;
  totalSessions: number;
  remainingSessions: number;
  price: number;
  status: 'active' | 'expired' | 'suspended' | 'expiring';
}

export default function SubscriptionManagement({ adminUser }: SubscriptionManagementProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    // Мокап данных абонементов
    const mockSubscriptions: Subscription[] = [
      {
        id: 'sub1',
        clientName: 'Анна Петрова',
        clientId: '1',
        type: 'group',
        name: 'Групповой Безлимит',
        purchaseDate: '2024-07-15',
        expiryDate: '2024-09-15',
        totalSessions: 20,
        remainingSessions: 12,
        price: 2500,
        status: 'active'
      },
      {
        id: 'sub2',
        clientName: 'Иван Сидоров',
        clientId: '2',
        type: 'individual',
        name: 'Персональные тренировки',
        purchaseDate: '2024-07-20',
        expiryDate: '2024-08-20',
        totalSessions: 8,
        remainingSessions: 3,
        price: 8000,
        status: 'expiring'
      },
      {
        id: 'sub3',
        clientName: 'Алексей Новиков',
        clientId: '4',
        type: 'premium',
        name: 'Групповой + Массаж',
        purchaseDate: '2024-07-25',
        expiryDate: '2024-08-25',
        totalSessions: 15,
        remainingSessions: 8,
        price: 4500,
        status: 'active'
      },
      {
        id: 'sub4',
        clientName: 'Мария Козлова',
        clientId: '3',
        type: 'group',
        name: 'Групповой Стандарт',
        purchaseDate: '2024-06-01',
        expiryDate: '2024-07-01',
        totalSessions: 12,
        remainingSessions: 0,
        price: 1800,
        status: 'expired'
      },
      {
        id: 'sub5',
        clientName: 'Елена Смирнова',
        clientId: '5',
        type: 'massage',
        name: 'Массаж',
        purchaseDate: '2024-07-10',
        expiryDate: '2024-08-10',
        totalSessions: 5,
        remainingSessions: 2,
        price: 3000,
        status: 'suspended'
      }
    ];

    setSubscriptions(mockSubscriptions);
    setFilteredSubscriptions(mockSubscriptions);
  }, []);

  useEffect(() => {
    let filtered = subscriptions;

    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    // Фильтр по типу
    if (typeFilter !== 'all') {
      filtered = filtered.filter(sub => sub.type === typeFilter);
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expiring': return <AlertTriangle className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'expired': return 'Истек';
      case 'suspended': return 'Приостановлен';
      default: return 'Неизвестно';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'group': return 'Групповой';
      case 'individual': return 'Персональный';
      case 'massage': return 'Массаж';
      case 'premium': return 'Премиум';
      default: return 'Другой';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group': return 'bg-blue-100 text-blue-800';
      case 'individual': return 'bg-purple-100 text-purple-800';
      case 'massage': return 'bg-pink-100 text-pink-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const extendSubscription = (subId: string, days: number) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === subId) {
        const newExpiryDate = new Date(sub.expiryDate);
        newExpiryDate.setDate(newExpiryDate.getDate() + days);
        return {
          ...sub,
          expiryDate: newExpiryDate.toISOString().split('T')[0],
          status: 'active' as const
        };
      }
      return sub;
    }));
  };

  const suspendSubscription = (subId: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subId ? { ...sub, status: 'suspended' as const } : sub
    ));
  };

  const terminateSubscription = (subId: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subId ? { ...sub, status: 'expired' as const, remainingSessions: 0 } : sub
    ));
  };

  const getProgressPercentage = (remaining: number, total: number) => {
    return ((total - remaining) / total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold text-neutral-900">
          Управление абонементами ({filteredSubscriptions.length})
        </h2>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Plus className="w-4 h-4 mr-2 inline" />
          Создать абонемент
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-neutral-900">
                {subscriptions.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-neutral-500">Активных</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-neutral-900">
                {subscriptions.filter(s => s.status === 'expiring').length}
              </div>
              <div className="text-sm text-neutral-500">Истекающих</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-neutral-900">
                {subscriptions.filter(s => s.status === 'expired').length}
              </div>
              <div className="text-sm text-neutral-500">Истекших</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-neutral-900">
                {subscriptions.reduce((sum, s) => sum + s.price, 0).toLocaleString()}₽
              </div>
              <div className="text-sm text-neutral-500">Общая выручка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по клиенту или абонементу"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="expiring">Истекающие</option>
            <option value="expired">Истекшие</option>
            <option value="suspended">Приостановленные</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все типы</option>
            <option value="group">Групповые</option>
            <option value="individual">Персональные</option>
            <option value="massage">Массаж</option>
            <option value="premium">Премиум</option>
          </select>

          <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            <Filter className="w-4 h-4 mr-2 inline" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid gap-4 p-6">
          {filteredSubscriptions.map((subscription, index) => (
            <motion.div
              key={subscription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-medium text-neutral-900">
                      {subscription.name}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {getStatusIcon(subscription.status)}
                      {getStatusText(subscription.status)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(subscription.type)}`}>
                      {getTypeText(subscription.type)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-neutral-500">Клиент</div>
                      <div className="font-medium text-neutral-900">{subscription.clientName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Занятия</div>
                      <div className="font-medium text-neutral-900">
                        {subscription.remainingSessions} из {subscription.totalSessions}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Истекает</div>
                      <div className="font-medium text-neutral-900">
                        {new Date(subscription.expiryDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Стоимость</div>
                      <div className="font-medium text-neutral-900">{subscription.price.toLocaleString()}₽</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-neutral-500 mb-1">
                      <span>Использовано занятий</span>
                      <span>{subscription.totalSessions - subscription.remainingSessions}/{subscription.totalSessions}</span>
                    </div>
                    <div className="bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${getProgressPercentage(subscription.remainingSessions, subscription.totalSessions)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  {subscription.status === 'active' && (
                    <>
                      <button
                        onClick={() => extendSubscription(subscription.id, 30)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Продлить
                      </button>
                      <button
                        onClick={() => suspendSubscription(subscription.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                      >
                        Приостановить
                      </button>
                    </>
                  )}
                  
                  {subscription.status === 'suspended' && (
                    <button
                      onClick={() => extendSubscription(subscription.id, 0)}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Активировать
                    </button>
                  )}

                  {subscription.status === 'expiring' && (
                    <>
                      <button
                        onClick={() => extendSubscription(subscription.id, 30)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Продлить
                      </button>
                      <button
                        onClick={() => terminateSubscription(subscription.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Завершить
                      </button>
                    </>
                  )}

                  <button className="p-1 text-neutral-400 hover:text-neutral-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Абонементы не найдены</h3>
            <p className="text-neutral-500">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </div>
  );
}