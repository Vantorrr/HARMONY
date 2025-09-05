'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  MoreVertical,
  User,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  registrationDate: string;
  lastVisit?: string;
  status: 'active' | 'inactive' | 'suspended';
  subscriptions: any[];
  visits: number;
  bonusPoints: number;
}

interface ClientsListProps {
  onSelectClient: (client: Client) => void;
  adminUser: any;
}

export default function ClientsList({ onSelectClient, adminUser }: ClientsListProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Мокап данных клиентов
    const mockClients: Client[] = [
      {
        id: '1',
        name: 'Анна Петрова',
        phone: '+7 (999) 123-45-67',
        email: 'anna@example.com',
        registrationDate: '2024-06-15',
        lastVisit: '2024-08-04',
        status: 'active',
        subscriptions: [
          {
            id: 'sub1',
            name: 'Групповой Безлимит',
            remainingSessions: 12,
            expiryDate: '2024-09-15'
          }
        ],
        visits: 45,
        bonusPoints: 1250
      },
      {
        id: '2',
        name: 'Иван Сидоров',
        phone: '+7 (999) 234-56-78',
        email: 'ivan@example.com',
        registrationDate: '2024-07-01',
        lastVisit: '2024-08-05',
        status: 'active',
        subscriptions: [
          {
            id: 'sub2',
            name: 'Индивидуальные занятия',
            remainingSessions: 3,
            expiryDate: '2024-08-20'
          }
        ],
        visits: 28,
        bonusPoints: 890
      },
      {
        id: '3',
        name: 'Мария Козлова',
        phone: '+7 (999) 345-67-89',
        registrationDate: '2024-05-20',
        lastVisit: '2024-07-15',
        status: 'inactive',
        subscriptions: [],
        visits: 15,
        bonusPoints: 320
      },
      {
        id: '4',
        name: 'Алексей Новиков',
        phone: '+7 (999) 456-78-90',
        email: 'alex@example.com',
        registrationDate: '2024-04-10',
        lastVisit: '2024-08-05',
        status: 'active',
        subscriptions: [
          {
            id: 'sub3',
            name: 'Групповой + Массаж',
            remainingSessions: 8,
            expiryDate: '2024-08-25'
          }
        ],
        visits: 67,
        bonusPoints: 2150
      },
      {
        id: '5',
        name: 'Елена Смирнова',
        phone: '+7 (999) 567-89-01',
        registrationDate: '2024-03-05',
        status: 'suspended',
        subscriptions: [],
        visits: 102,
        bonusPoints: 450
      }
    ];

    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  useEffect(() => {
    let filtered = clients;

    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'visits':
          return b.visits - a.visits;
        case 'registration':
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
        case 'lastVisit':
          const aLastVisit = a.lastVisit ? new Date(a.lastVisit).getTime() : 0;
          const bLastVisit = b.lastVisit ? new Date(b.lastVisit).getTime() : 0;
          return bLastVisit - aLastVisit;
        default:
          return 0;
      }
    });

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <Clock className="w-4 h-4" />;
      case 'suspended': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      case 'suspended': return 'Заблокирован';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold text-neutral-900">
          Клиенты ({filteredClients.length})
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по имени или телефону"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="suspended">Заблокированные</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">По имени</option>
            <option value="visits">По посещениям</option>
            <option value="registration">По дате регистрации</option>
            <option value="lastVisit">По последнему визиту</option>
          </select>

          {/* Export */}
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Экспорт
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Контакты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Посещения
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Абонементы
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Последний визит
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-neutral-50 cursor-pointer"
                  onClick={() => onSelectClient(client)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-medium">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{client.name}</div>
                        <div className="text-sm text-neutral-500">#{client.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{client.phone}</div>
                    {client.email && (
                      <div className="text-sm text-neutral-500">{client.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {getStatusIcon(client.status)}
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {client.visits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">
                      {client.subscriptions.length > 0 ? `${client.subscriptions.length} активных` : 'Нет активных'}
                    </div>
                    {client.subscriptions.length > 0 && (
                      <div className="text-sm text-neutral-500">
                        {client.subscriptions[0].remainingSessions} занятий
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {client.lastVisit ? new Date(client.lastVisit).toLocaleDateString('ru-RU') : 'Никогда'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Клиенты не найдены</h3>
            <p className="text-neutral-500">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </div>
  );
}