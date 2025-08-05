'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  UserPlus,
  Settings,
  Download
} from 'lucide-react';

interface ActivityLogProps {
  adminUser: any;
}

interface LogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminId: string;
  action: string;
  actionType: 'client' | 'subscription' | 'visit' | 'system' | 'admin';
  description: string;
  targetId?: string;
  targetName?: string;
  details?: string;
  ip?: string;
}

export default function ActivityLog({ adminUser }: ActivityLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [adminFilter, setAdminFilter] = useState('all');

  useEffect(() => {
    // Мокап данных журнала активности
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: '2024-08-05 15:30:45',
        adminName: 'Главный администратор',
        adminId: 'admin',
        action: 'visit_confirmed',
        actionType: 'visit',
        description: 'Подтверждено посещение клиента',
        targetId: '1',
        targetName: 'Анна Петрова',
        details: 'Групповая тренировка - 10:00',
        ip: '192.168.1.15'
      },
      {
        id: '2',
        timestamp: '2024-08-05 14:22:15',
        adminName: 'Менеджер',
        adminId: 'manager',
        action: 'subscription_created',
        actionType: 'subscription',
        description: 'Создан новый абонемент',
        targetId: 'sub10',
        targetName: 'Групповой Безлимит',
        details: 'Клиент: Иван Петров, Срок: 30 дней',
        ip: '192.168.1.20'
      },
      {
        id: '3',
        timestamp: '2024-08-05 13:45:30',
        adminName: 'Педагог',
        adminId: 'teacher',
        action: 'visit_missed',
        actionType: 'visit',
        description: 'Отмечен пропуск занятия',
        targetId: '2',
        targetName: 'Мария Сидорова',
        details: 'Персональная тренировка - 13:00',
        ip: '192.168.1.25'
      },
      {
        id: '4',
        timestamp: '2024-08-05 12:10:20',
        adminName: 'Главный администратор',
        adminId: 'admin',
        action: 'client_created',
        actionType: 'client',
        description: 'Зарегистрирован новый клиент',
        targetId: '15',
        targetName: 'Алексей Новиков',
        details: 'Телефон: +7 (999) 123-45-67',
        ip: '192.168.1.15'
      },
      {
        id: '5',
        timestamp: '2024-08-05 11:30:10',
        adminName: 'Менеджер',
        adminId: 'manager',
        action: 'subscription_extended',
        actionType: 'subscription',
        description: 'Продлен абонемент клиента',
        targetId: 'sub8',
        targetName: 'Персональные тренировки',
        details: 'Клиент: Елена Козлова, Продлен на 15 дней',
        ip: '192.168.1.20'
      },
      {
        id: '6',
        timestamp: '2024-08-05 10:15:45',
        adminName: 'Система',
        adminId: 'system',
        action: 'subscription_expired',
        actionType: 'system',
        description: 'Автоматическое истечение абонемента',
        targetId: 'sub5',
        targetName: 'Массаж',
        details: 'Клиент: Ольга Иванова',
        ip: 'system'
      },
      {
        id: '7',
        timestamp: '2024-08-05 09:20:30',
        adminName: 'Главный администратор',
        adminId: 'admin',
        action: 'admin_login',
        actionType: 'admin',
        description: 'Вход в административную панель',
        details: 'Браузер: Chrome, Устройство: Desktop',
        ip: '192.168.1.15'
      },
      {
        id: '8',
        timestamp: '2024-08-04 18:45:20',
        adminName: 'Педагог',
        adminId: 'teacher',
        action: 'visit_confirmed',
        actionType: 'visit',
        description: 'Подтверждено посещение клиента',
        targetId: '4',
        targetName: 'Дмитрий Соколов',
        details: 'Групповая тренировка - 18:00',
        ip: '192.168.1.25'
      }
    ];

    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  useEffect(() => {
    let filtered = logs;

    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.targetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по типу действия
    if (actionTypeFilter !== 'all') {
      filtered = filtered.filter(log => log.actionType === actionTypeFilter);
    }

    // Фильтр по администратору
    if (adminFilter !== 'all') {
      filtered = filtered.filter(log => log.adminId === adminFilter);
    }

    // Фильтр по дате
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        
        switch (dateFilter) {
          case 'today':
            return logDate >= today;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return logDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            return logDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, actionTypeFilter, dateFilter, adminFilter]);

  const getActionIcon = (actionType: string, action: string) => {
    switch (actionType) {
      case 'client':
        return <User className="w-4 h-4" />;
      case 'subscription':
        return <CreditCard className="w-4 h-4" />;
      case 'visit':
        return action.includes('confirmed') ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
      case 'admin':
        return <Settings className="w-4 h-4" />;
      case 'system':
        return <Activity className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string, action: string) => {
    switch (actionType) {
      case 'client':
        return 'bg-blue-100 text-blue-800';
      case 'subscription':
        return 'bg-green-100 text-green-800';
      case 'visit':
        return action.includes('confirmed') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getActionTypeText = (actionType: string) => {
    switch (actionType) {
      case 'client': return 'Клиент';
      case 'subscription': return 'Абонемент';
      case 'visit': return 'Посещение';
      case 'admin': return 'Администрирование';
      case 'system': return 'Система';
      default: return 'Другое';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold text-neutral-900">
          Журнал действий ({filteredLogs.length})
        </h2>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Download className="w-4 h-4 mr-2 inline" />
          Экспорт
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { type: 'client', label: 'Клиенты', count: logs.filter(l => l.actionType === 'client').length },
          { type: 'subscription', label: 'Абонементы', count: logs.filter(l => l.actionType === 'subscription').length },
          { type: 'visit', label: 'Посещения', count: logs.filter(l => l.actionType === 'visit').length },
          { type: 'admin', label: 'Админ', count: logs.filter(l => l.actionType === 'admin').length },
          { type: 'system', label: 'Система', count: logs.filter(l => l.actionType === 'system').length }
        ].map((stat) => (
          <div key={stat.type} className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-2xl font-bold text-neutral-900">{stat.count}</div>
            <div className="text-sm text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск в журнале..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все типы</option>
            <option value="client">Клиенты</option>
            <option value="subscription">Абонементы</option>
            <option value="visit">Посещения</option>
            <option value="admin">Администрирование</option>
            <option value="system">Система</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все время</option>
            <option value="today">Сегодня</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
          </select>

          <select
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все администраторы</option>
            <option value="admin">Главный администратор</option>
            <option value="manager">Менеджер</option>
                            <option value="teacher">Педагог</option>
            <option value="system">Система</option>
          </select>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="space-y-1">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActionColor(log.actionType, log.action)}`}>
                    {getActionIcon(log.actionType, log.action)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-neutral-900">{log.description}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.actionType, log.action)}`}>
                        {getActionTypeText(log.actionType)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-neutral-600 mb-2">
                      {log.details}
                      {log.targetName && (
                        <span className="ml-2 font-medium">• {log.targetName}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-neutral-500 space-x-4">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {log.adminName}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(log.timestamp).toLocaleString('ru-RU')}
                      </span>
                      {log.ip && log.ip !== 'system' && (
                        <span className="flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          {log.ip}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Записи не найдены</h3>
            <p className="text-neutral-500">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </div>
  );
}