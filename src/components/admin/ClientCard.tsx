'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Plus,
  Trash2,
  CreditCard,
  Activity,
  Star,
  History
} from 'lucide-react';

interface ClientCardProps {
  client: any;
  onBack: () => void;
  adminUser: any;
}

export default function ClientCard({ client, onBack, adminUser }: ClientCardProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [clientData, setClientData] = useState(client);
  const [visits, setVisits] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);

  useEffect(() => {
    // Мокап данных посещений
    const mockVisits = [
      {
        id: '1',
        date: '2024-08-05',
        time: '10:00',
        status: 'confirmed',
        type: 'group',
        teacher: 'Анна Иванова',
        subscription: 'Групповой Безлимит',
        confirmedBy: 'teacher'
      },
      {
        id: '2',
        date: '2024-08-03',
        time: '14:30',
        status: 'pending',
        type: 'personal',
        teacher: 'Игорь Петров',
        subscription: 'Индивидуальные занятия',
        confirmedBy: null
      },
      {
        id: '3',
        date: '2024-08-01',
        time: '09:15',
        status: 'missed',
        type: 'group',
        teacher: 'Мария Сидорова',
        subscription: 'Групповой Безлимит',
        confirmedBy: null
      },
      {
        id: '4',
        date: '2024-07-30',
        time: '18:00',
        status: 'confirmed',
        type: 'massage',
        teacher: 'Елена Козлова',
        subscription: 'Массаж',
        confirmedBy: 'admin'
      }
    ];

    // Мокап лога активности
    const mockActivityLog = [
      {
        id: '1',
        date: '2024-08-05 10:05',
        action: 'visit_confirmed',
        description: 'Посещение подтверждено педагогом',
        adminName: 'Анна Иванова',
        details: 'Групповое занятие'
      },
      {
        id: '2',
        date: '2024-08-04 15:20',
        action: 'subscription_extended',
        description: 'Абонемент продлен на 1 месяц',
        adminName: 'Менеджер',
        details: 'Групповой Безлимит'
      },
      {
        id: '3',
        date: '2024-08-01 09:30',
        action: 'visit_missed',
        description: 'Пропуск занятия отмечен',
        adminName: 'Система',
        details: 'Автоматическое списание'
      }
    ];

    setVisits(mockVisits);
    setActivityLog(mockActivityLog);
  }, []);

  const tabs = [
    { id: 'profile', name: 'Профиль', icon: <Activity className="w-4 h-4" /> },
    { id: 'visits', name: 'Посещения', icon: <Calendar className="w-4 h-4" /> },
    { id: 'subscriptions', name: 'Абонементы', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'activity', name: 'История', icon: <History className="w-4 h-4" /> }
  ];

  const confirmVisit = (visitId: string) => {
    setVisits(visits.map(visit => 
      visit.id === visitId 
        ? { ...visit, status: 'confirmed', confirmedBy: adminUser.username }
        : visit
    ));

    // Добавляем в лог
    const newLogEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('ru-RU'),
      action: 'visit_confirmed',
      description: 'Посещение подтверждено администратором',
      adminName: adminUser.name,
      details: 'Ручное подтверждение'
    };
    setActivityLog([newLogEntry, ...activityLog]);
  };

  const markMissed = (visitId: string) => {
    setVisits(visits.map(visit => 
      visit.id === visitId 
        ? { ...visit, status: 'missed', confirmedBy: adminUser.username }
        : visit
    ));

    const newLogEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('ru-RU'),
      action: 'visit_missed',
      description: 'Пропуск занятия отмечен администратором',
      adminName: adminUser.name,
      details: 'Принудительное списание'
    };
    setActivityLog([newLogEntry, ...activityLog]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'missed': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает';
      case 'missed': return 'Пропуск';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-heading font-bold text-neutral-900">
          Карточка клиента
        </h2>
      </div>

      {/* Client Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xl font-medium">
              {clientData.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-neutral-900">{clientData.name}</h3>
              <p className="text-neutral-600">ID: #{clientData.id}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm text-neutral-500">
                  <Phone className="w-4 h-4 mr-1" />
                  {clientData.phone}
                </div>
                {clientData.email && (
                  <div className="flex items-center text-sm text-neutral-500">
                    <Mail className="w-4 h-4 mr-1" />
                    {clientData.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Edit className="w-4 h-4 mr-2 inline" />
              Редактировать
            </button>
            <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
              <Plus className="w-4 h-4 mr-2 inline" />
              Добавить абонемент
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{clientData.visits}</div>
            <div className="text-sm text-neutral-500">Всего посещений</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{clientData.subscriptions.length}</div>
            <div className="text-sm text-neutral-500">Активных абонементов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{clientData.bonusPoints}</div>
            <div className="text-sm text-neutral-500">Бонусных баллов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {new Date(clientData.registrationDate).toLocaleDateString('ru-RU')}
            </div>
            <div className="text-sm text-neutral-500">Дата регистрации</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Основная информация</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-neutral-500">ФИО</label>
                      <div className="text-neutral-900">{clientData.name}</div>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-500">Телефон</label>
                      <div className="text-neutral-900">{clientData.phone}</div>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-500">Email</label>
                      <div className="text-neutral-900">{clientData.email || 'Не указан'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-500">Статус</label>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(clientData.status)}`}>
                        {getStatusIcon(clientData.status)}
                        {getStatusText(clientData.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Программа лояльности</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-neutral-500">Бонусные баллы</label>
                      <div className="text-2xl font-bold text-primary-600">{clientData.bonusPoints}</div>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-500">Уровень</label>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-neutral-900">Золото</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visits Tab */}
          {activeTab === 'visits' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">История посещений</h4>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  <Plus className="w-4 h-4 mr-2 inline" />
                  Добавить посещение
                </button>
              </div>

              <div className="space-y-3">
                {visits.map((visit) => (
                  <div key={visit.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                            {getStatusIcon(visit.status)}
                            {getStatusText(visit.status)}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {new Date(visit.date).toLocaleDateString('ru-RU')} в {visit.time}
                          </span>
                        </div>
                        <div className="text-neutral-900 font-medium">{visit.subscription}</div>
                        <div className="text-sm text-neutral-500">
                          Педагог: {visit.teacher}
                        </div>
                      </div>

                      {visit.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmVisit(visit.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                          >
                            Подтвердить
                          </button>
                          <button
                            onClick={() => markMissed(visit.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            Пропуск
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-4">
              <h4 className="font-medium">Активные абонементы</h4>
              
              {clientData.subscriptions.map((sub: any) => (
                <div key={sub.id} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-neutral-900">{sub.name}</h5>
                      <div className="text-sm text-neutral-500 mt-1">
                        Осталось занятий: {sub.remainingSessions}
                      </div>
                      <div className="text-sm text-neutral-500">
                        Действует до: {new Date(sub.expiryDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors">
                        Продлить
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
                        Завершить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h4 className="font-medium">Журнал действий</h4>
              
              <div className="space-y-3">
                {activityLog.map((log) => (
                  <div key={log.id} className="border-l-4 border-primary-200 bg-neutral-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-neutral-900">{log.description}</div>
                        <div className="text-sm text-neutral-500 mt-1">
                          {log.details} • {log.adminName}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-400">
                        {log.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}