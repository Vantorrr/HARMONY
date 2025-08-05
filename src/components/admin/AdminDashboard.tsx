'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Settings, 
  LogOut,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Activity,
  FileText,
  Bell
} from 'lucide-react';

import ClientsList from './ClientsList';
import ClientCard from './ClientCard';
import SubscriptionManagement from './SubscriptionManagement';
import SubscriptionPlansAdmin from './SubscriptionPlansAdmin';
import ActivityLog from './ActivityLog';
import AdminStats from './AdminStats';
import NotificationAdmin from './NotificationAdmin';

interface AdminDashboardProps {
  adminUser: any;
  onLogout: () => void;
}

export default function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('stats');
  const [selectedClient, setSelectedClient] = useState(null);
  const [subscriptionSubTab, setSubscriptionSubTab] = useState('management');

  const tabs = [
    {
      id: 'stats',
      name: 'Статистика',
      icon: <TrendingUp className="w-5 h-5" />,
      permission: ['all', 'reports']
    },
    {
      id: 'clients',
      name: 'Клиенты',
      icon: <Users className="w-5 h-5" />,
      permission: ['all', 'clients', 'clients_view']
    },
    {
      id: 'subscriptions',
      name: 'Абонементы',
      icon: <CreditCard className="w-5 h-5" />,
      permission: ['all', 'subscriptions']
    },
    {
      id: 'visits',
      name: 'Посещения',
      icon: <Calendar className="w-5 h-5" />,
      permission: ['all', 'visits', 'clients']
    },
    {
      id: 'notifications',
      name: 'Уведомления',
      icon: <Bell className="w-5 h-5" />,
      permission: ['all', 'notifications']
    },
    {
      id: 'activity',
      name: 'Журнал',
      icon: <FileText className="w-5 h-5" />,
      permission: ['all']
    }
  ];

  const hasPermission = (requiredPermissions: string[]) => {
    if (adminUser.permissions.includes('all')) return true;
    return requiredPermissions.some(perm => adminUser.permissions.includes(perm));
  };

  const availableTabs = tabs.filter(tab => hasPermission(tab.permission));

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-purple-100 text-purple-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Главный админ';
      case 'manager': return 'Менеджер';
      case 'teacher': return 'Педагог';
      default: return 'Сотрудник';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-heading font-bold text-neutral-900 mr-4">
                Harmony Admin
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(adminUser.role)}`}>
                {getRoleName(adminUser.role)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-neutral-900">{adminUser.name}</div>
                <div className="text-xs text-neutral-500">@{adminUser.username}</div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8 -mb-px">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedClient(null);
                }}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedClient ? (
          <ClientCard 
            client={selectedClient} 
            onBack={() => setSelectedClient(null)}
            adminUser={adminUser}
          />
        ) : (
          <>
            {activeTab === 'stats' && <AdminStats adminUser={adminUser} />}
            {activeTab === 'clients' && (
              <ClientsList 
                onSelectClient={setSelectedClient}
                adminUser={adminUser}
              />
            )}
            {activeTab === 'subscriptions' && (
              <div>
                {/* Sub-tabs for subscriptions */}
                <div className="flex space-x-1 bg-neutral-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setSubscriptionSubTab('management')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all text-sm ${
                      subscriptionSubTab === 'management'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Управление подписками
                  </button>
                  <button
                    onClick={() => setSubscriptionSubTab('plans')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all text-sm ${
                      subscriptionSubTab === 'plans'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Тарифы и цены
                  </button>
                </div>

                {subscriptionSubTab === 'management' && (
                  <SubscriptionManagement adminUser={adminUser} />
                )}
                {subscriptionSubTab === 'plans' && (
                  <SubscriptionPlansAdmin adminUser={adminUser} />
                )}
              </div>
            )}
            {activeTab === 'visits' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Управление посещениями</h2>
                <p className="text-neutral-600">
                  Подтверждение посещений будет доступно в карточке клиента
                </p>
              </div>
            )}
            {activeTab === 'notifications' && <NotificationAdmin adminUser={adminUser} />}
            {activeTab === 'activity' && <ActivityLog adminUser={adminUser} />}
          </>
        )}
      </main>
    </div>
  );
}