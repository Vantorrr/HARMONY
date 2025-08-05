'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  BellOff, 
  Clock, 
  AlertTriangle, 
  CreditCard, 
  Gift,
  Settings,
  TestTube,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationSettingsProps {
  userId?: string;
  onClose?: () => void;
}

export default function NotificationSettings({ userId, onClose }: NotificationSettingsProps) {
  const {
    isSupported,
    permission,
    isLoading,
    error,
    preferences,
    initializeNotifications,
    savePreferences,
    syncTokenWithServer,
    sendTestNotification,
    isEnabled,
    needsPermission
  } = useNotifications();

  const [isInitializing, setIsInitializing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Автоматическая синхронизация с сервером при изменении настроек
  useEffect(() => {
    if (isEnabled && userId) {
      setIsSyncing(true);
      syncTokenWithServer(userId).finally(() => {
        setIsSyncing(false);
      });
    }
  }, [preferences, isEnabled, userId, syncTokenWithServer]);

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      await initializeNotifications();
    } finally {
      setIsInitializing(false);
    }
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    savePreferences({
      ...preferences,
      [key]: value
    });
  };

  const getStatusIcon = () => {
    if (isLoading || isInitializing) {
      return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;
    }
    
    if (!isSupported) {
      return <XCircle className="w-6 h-6 text-gray-400" />;
    }
    
    if (permission === 'granted' && isEnabled) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    
    if (permission === 'denied') {
      return <XCircle className="w-6 h-6 text-red-500" />;
    }
    
    return <Bell className="w-6 h-6 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (isLoading || isInitializing) {
      return 'Инициализация...';
    }
    
    if (!isSupported) {
      return 'Не поддерживается браузером';
    }
    
    if (permission === 'granted' && isEnabled) {
      return 'Уведомления включены';
    }
    
    if (permission === 'denied') {
      return 'Разрешение отклонено';
    }
    
    return 'Требуется разрешение';
  };

  const notificationTypes = [
    {
      key: 'reminders' as const,
      title: 'Напоминания о занятиях',
      description: 'Уведомления за 30 минут до занятия',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-blue-500',
      testType: 'reminder' as const
    },
    {
      key: 'expiry' as const,
      title: 'Истечение абонемента',
      description: 'Предупреждения об окончании абонемента',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-orange-500',
      testType: 'expiry' as const
    },
    {
      key: 'balance' as const,
      title: 'Низкий баланс',
      description: 'Уведомления о малом количестве бонусов',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-red-500',
      testType: 'balance' as const
    },
    {
      key: 'promotions' as const,
      title: 'Акции и скидки',
      description: 'Специальные предложения и новости',
      icon: <Gift className="w-5 h-5" />,
      color: 'text-purple-500',
      testType: 'promotion' as const
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
              <p className="text-gray-600">Настройте пуш-уведомления</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <h3 className="font-semibold text-gray-900">{getStatusText()}</h3>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {isSyncing && <p className="text-blue-500 text-sm">Синхронизация с сервером...</p>}
              </div>
            </div>
            
            {needsPermission && (
              <button
                onClick={handleInitialize}
                disabled={isInitializing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isInitializing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
                Включить уведомления
              </button>
            )}
          </div>
        </div>

        {/* Settings */}
        {isEnabled && (
          <>
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Типы уведомлений
              </h3>
              
              {notificationTypes.map((type) => (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${type.color}`}>
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{type.title}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendTestNotification(type.testType)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Отправить тест"
                      >
                        <TestTube className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[type.key]}
                          onChange={(e) => handlePreferenceChange(type.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Test All */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-yellow-800">Тестирование</h4>
                  <p className="text-sm text-yellow-700">Отправить все типы уведомлений для проверки</p>
                </div>
                <button
                  onClick={() => {
                    sendTestNotification('reminder');
                    setTimeout(() => sendTestNotification('expiry'), 1000);
                    setTimeout(() => sendTestNotification('balance'), 2000);
                    setTimeout(() => sendTestNotification('promotion'), 3000);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  Тест всех типов
                </button>
              </div>
            </div>
          </>
        )}

        {/* Help */}
        {permission === 'denied' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mt-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Разрешение отклонено</h4>
                <p className="text-sm text-red-700 mb-3">
                  Чтобы включить уведомления, разрешите их в настройках браузера:
                </p>
                <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                  <li>Нажмите на значок замка в адресной строке</li>
                  <li>Выберите "Разрешить" для уведомлений</li>
                  <li>Обновите страницу</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}