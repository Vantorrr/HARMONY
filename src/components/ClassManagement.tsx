'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  Users,
  ArrowLeft,
  Plus,
  Filter
} from 'lucide-react';

interface ClassSession {
  id: string;
  date: string;
  time: string;
  type: string;
  teacher: string;
  location: string;
  status: 'upcoming' | 'completed' | 'missed' | 'cancelled';
  participants?: number;
  maxParticipants?: number;
}

interface ClassManagementProps {
  onBack: () => void;
}

export default function ClassManagement({ onBack }: ClassManagementProps) {
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'missed'>('all');

  useEffect(() => {
    // Мокап данных занятий
    const mockSessions: ClassSession[] = [
      {
        id: '1',
        date: '2024-08-06',
        time: '09:00',
        type: 'Силовое занятие',
        teacher: 'Иван Петров',
        location: 'Зал №1',
        status: 'upcoming',
        participants: 8,
        maxParticipants: 12
      },
      {
        id: '2',
        date: '2024-08-05',
        time: '18:30',
        type: 'Йога',
        teacher: 'Мария Сидорова',
        location: 'Зал №2',
        status: 'completed',
        participants: 15,
        maxParticipants: 15
      },
      {
        id: '3',
        date: '2024-08-04',
        time: '10:00',
        type: 'Кардио',
        teacher: 'Алексей Кузнецов',
        location: 'Зал №1',
        status: 'completed',
        participants: 10,
        maxParticipants: 15
      },
      {
        id: '4',
        date: '2024-08-03',
        time: '19:00',
        type: 'Функциональное занятие',
        teacher: 'Елена Волкова',
        location: 'Зал №3',
        status: 'missed',
        participants: 12,
        maxParticipants: 15
      },
      {
        id: '5',
        date: '2024-08-07',
        time: '17:00',
        type: 'Групповое занятие',
        teacher: 'Дмитрий Новиков',
        location: 'Зал №2',
        status: 'upcoming',
        participants: 5,
        maxParticipants: 20
      }
    ];

    setSessions(mockSessions);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-primary-600 bg-primary-50 border-primary-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'missed': return 'text-red-600 bg-red-50 border-red-200';
      case 'cancelled': return 'text-neutral-600 bg-neutral-50 border-neutral-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'missed': return <XCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Предстоит';
      case 'completed': return 'Завершено';
      case 'missed': return 'Пропущено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const handleCheckIn = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'completed' as const }
        : session
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              Управление занятиями
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="text-sm text-neutral-500 mb-1">Всего занятий</div>
            <div className="text-2xl font-bold text-neutral-900">{sessions.length}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="text-sm text-neutral-500 mb-1">Завершено</div>
            <div className="text-2xl font-bold text-green-600">
              {sessions.filter(s => s.status === 'completed').length}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="text-sm text-neutral-500 mb-1">Предстоит</div>
            <div className="text-2xl font-bold text-primary-600">
              {sessions.filter(s => s.status === 'upcoming').length}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="text-sm text-neutral-500 mb-1">Пропущено</div>
            <div className="text-2xl font-bold text-red-600">
              {sessions.filter(s => s.status === 'missed').length}
            </div>
          </motion.div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { key: 'all', label: 'Все' },
            { key: 'upcoming', label: 'Предстоящие' },
            { key: 'completed', label: 'Завершенные' },
            { key: 'missed', label: 'Пропущенные' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === filterOption.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Список занятий */}
        <div className="space-y-4">
          {filteredSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {session.type}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(session.status)}
                        {getStatusText(session.status)}
                      </div>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(session.date).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {session.time}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {session.teacher}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {session.location}
                    </div>
                  </div>

                  {session.participants !== undefined && (
                    <div className="flex items-center mt-3 text-sm text-neutral-600">
                      <Users className="w-4 h-4 mr-2" />
                      {session.participants}/{session.maxParticipants} участников
                      <div className="ml-3 flex-1 max-w-24">
                        <div className="bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all"
                            style={{ 
                              width: `${Math.min((session.participants / (session.maxParticipants || 1)) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Действия */}
                <div className="flex gap-2">
                  {session.status === 'upcoming' && (
                    <>
                      <button
                        onClick={() => handleCheckIn(session.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        Отметить посещение
                      </button>
                      <button className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 transition-colors text-sm font-medium">
                        Отменить
                      </button>
                    </>
                  )}
                  {session.status === 'completed' && (
                    <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium">
                      ✓ Посещение засчитано
                    </span>
                  )}
                  {session.status === 'missed' && (
                    <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-colors text-sm font-medium">
                      Восстановить занятие
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-2">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Занятий не найдено
            </h3>
            <p className="text-neutral-600">
              Попробуйте изменить фильтр или запишитесь на новое занятие
            </p>
          </div>
        )}
      </div>
    </div>
  );
}