'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Users, 
  User, 
  Bell, 
  Clock, 
  AlertTriangle, 
  CreditCard, 
  Gift,
  Calendar,
  Target,
  BarChart3,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

interface NotificationAdminProps {
  adminUser: any;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'reminder' | 'expiry' | 'balance' | 'promotion' | 'custom';
  title: string;
  body: string;
  icon?: string;
  image?: string;
  action?: string;
  url?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationCampaign {
  id: string;
  name: string;
  template: NotificationTemplate;
  targetType: 'all' | 'segment' | 'individual';
  targetUsers: string[];
  scheduledAt?: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  stats: {
    sent: number;
    delivered: number;
    clicked: number;
    failed: number;
  };
}

export default function NotificationAdmin({ adminUser }: NotificationAdminProps) {
  const [activeTab, setActiveTab] = useState<'send' | 'templates' | 'campaigns' | 'stats'>('send');
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<NotificationCampaign[]>([]);

  // Мокап данных шаблонов
  useEffect(() => {
    const mockTemplates: NotificationTemplate[] = [
      {
        id: '1',
        name: 'Напоминание о занятии',
        type: 'reminder',
        title: '⏰ Время занятия!',
        body: 'Ваше занятие начнется через 30 минут. Не забудьте взять полотенце!',
        icon: '/icon-reminder.png',
        action: 'Подтвердить',
        url: '/#classes',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Истечение абонемента',
        type: 'expiry',
        title: '⚠️ Абонемент истекает',
        body: 'Ваш абонемент истекает через {days} дней. Продлите его со скидкой!',
        icon: '/icon-warning.png',
        action: 'Продлить',
        url: '/#subscriptions',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'Акция месяца',
        type: 'promotion',
        title: '🔥 Горячая акция!',
        body: 'Скидка 30% на все абонементы! Только до конца месяца!',
        icon: '/icon-promotion.png',
        image: '/promo-banner.jpg',
        action: 'Посмотреть',
        url: '/#shop',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-20'
      }
    ];
    setTemplates(mockTemplates);
  }, []);

  // Форма отправки уведомления
  const [sendForm, setSendForm] = useState({
    templateId: '',
    targetType: 'all' as 'all' | 'segment' | 'individual',
    targetUsers: [] as string[],
    scheduleType: 'now' as 'now' | 'scheduled',
    scheduledAt: '',
    customTitle: '',
    customBody: '',
    customUrl: ''
  });

  const handleSendNotification = async () => {
    setIsLoading(true);
    
    try {
      // Симуляция отправки
      console.log('📱 Sending notification:', sendForm);
      
      const selectedTemplate = templates.find(t => t.id === sendForm.templateId);
      
      // Создаем кампанию
      const newCampaign: NotificationCampaign = {
        id: Date.now().toString(),
        name: `${selectedTemplate?.name || 'Кастомное уведомление'} - ${new Date().toLocaleDateString()}`,
        template: selectedTemplate || {
          id: 'custom',
          name: 'Кастомное',
          type: 'custom',
          title: sendForm.customTitle,
          body: sendForm.customBody,
          url: sendForm.customUrl,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        targetType: sendForm.targetType,
        targetUsers: sendForm.targetUsers,
        scheduledAt: sendForm.scheduleType === 'scheduled' ? sendForm.scheduledAt : undefined,
        sentAt: sendForm.scheduleType === 'now' ? new Date().toISOString() : undefined,
        status: sendForm.scheduleType === 'now' ? 'sent' : 'scheduled',
        stats: {
          sent: sendForm.targetType === 'all' ? 1247 : sendForm.targetUsers.length,
          delivered: sendForm.targetType === 'all' ? 1198 : Math.floor(sendForm.targetUsers.length * 0.95),
          clicked: sendForm.targetType === 'all' ? 287 : Math.floor(sendForm.targetUsers.length * 0.23),
          failed: sendForm.targetType === 'all' ? 49 : Math.floor(sendForm.targetUsers.length * 0.05)
        }
      };

      setCampaigns(prev => [newCampaign, ...prev]);

      // Сброс формы
      setSendForm({
        templateId: '',
        targetType: 'all',
        targetUsers: [],
        scheduleType: 'now',
        scheduledAt: '',
        customTitle: '',
        customBody: '',
        customUrl: ''
      });

      alert('✅ Уведомление отправлено!');
      
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('❌ Ошибка отправки уведомления');
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'expiry': return <AlertTriangle className="w-4 h-4" />;
      case 'balance': return <CreditCard className="w-4 h-4" />;
      case 'promotion': return <Gift className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'text-blue-500 bg-blue-100';
      case 'expiry': return 'text-orange-500 bg-orange-100';
      case 'balance': return 'text-red-500 bg-red-100';
      case 'promotion': return 'text-purple-500 bg-purple-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'send', name: 'Отправить', icon: <Send className="w-5 h-5" /> },
    { id: 'templates', name: 'Шаблоны', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'campaigns', name: 'Кампании', icon: <Target className="w-5 h-5" /> },
    { id: 'stats', name: 'Статистика', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Push-уведомления</h1>
            <p className="text-white/80">Управление уведомлениями для клиентов</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <Bell className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Send Tab */}
          {activeTab === 'send' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Шаблон */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выберите шаблон
                  </label>
                  <select
                    value={sendForm.templateId}
                    onChange={(e) => setSendForm(prev => ({ ...prev, templateId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Кастомное уведомление</option>
                    {templates.filter(t => t.isActive).map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Аудитория */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Аудитория
                  </label>
                  <select
                    value={sendForm.targetType}
                    onChange={(e) => setSendForm(prev => ({ ...prev, targetType: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Все пользователи (1,247)</option>
                    <option value="segment">Активные клиенты (892)</option>
                    <option value="individual">Выбранные клиенты</option>
                  </select>
                </div>
              </div>

              {/* Кастомное сообщение */}
              {!sendForm.templateId && (
                <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Кастомное уведомление</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                    <input
                      type="text"
                      value={sendForm.customTitle}
                      onChange={(e) => setSendForm(prev => ({ ...prev, customTitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Заголовок уведомления"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Текст</label>
                    <textarea
                      value={sendForm.customBody}
                      onChange={(e) => setSendForm(prev => ({ ...prev, customBody: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows={3}
                      placeholder="Текст уведомления"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL (опционально)</label>
                    <input
                      type="text"
                      value={sendForm.customUrl}
                      onChange={(e) => setSendForm(prev => ({ ...prev, customUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              )}

              {/* Время отправки */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Время отправки</h3>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="now"
                      checked={sendForm.scheduleType === 'now'}
                      onChange={(e) => setSendForm(prev => ({ ...prev, scheduleType: e.target.value as any }))}
                      className="mr-2"
                    />
                    Отправить сейчас
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="scheduled"
                      checked={sendForm.scheduleType === 'scheduled'}
                      onChange={(e) => setSendForm(prev => ({ ...prev, scheduleType: e.target.value as any }))}
                      className="mr-2"
                    />
                    Запланировать
                  </label>
                </div>
                
                {sendForm.scheduleType === 'scheduled' && (
                  <input
                    type="datetime-local"
                    value={sendForm.scheduledAt}
                    onChange={(e) => setSendForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>

              {/* Отправить */}
              <div className="flex justify-end">
                <button
                  onClick={handleSendNotification}
                  disabled={isLoading || (!sendForm.templateId && !sendForm.customTitle)}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {sendForm.scheduleType === 'now' ? 'Отправить' : 'Запланировать'}
                </button>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Шаблоны уведомлений</h3>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Создать шаблон
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(template.type)}`}>
                        {getTypeIcon(template.type)}
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{template.title}</p>
                    <p className="text-xs text-gray-500 mb-3">{template.body}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Обновлен {new Date(template.updatedAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full ${template.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {template.isActive ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">История кампаний</h3>
              
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">{campaign.template.title}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        campaign.status === 'sent' ? 'bg-green-100 text-green-600' :
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                        campaign.status === 'sending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {campaign.status === 'sent' ? 'Отправлено' :
                         campaign.status === 'scheduled' ? 'Запланировано' :
                         campaign.status === 'sending' ? 'Отправляется' : 'Черновик'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Отправлено:</span>
                        <div className="font-semibold">{campaign.stats.sent.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Доставлено:</span>
                        <div className="font-semibold text-green-600">{campaign.stats.delivered.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Кликов:</span>
                        <div className="font-semibold text-blue-600">{campaign.stats.clicked.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">CTR:</span>
                        <div className="font-semibold">{((campaign.stats.clicked / campaign.stats.delivered) * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {campaigns.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Кампаний пока нет</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Статистика уведомлений</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Всего отправлено</p>
                      <p className="text-2xl font-bold text-blue-900">8,247</p>
                    </div>
                    <Send className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Доставлено</p>
                      <p className="text-2xl font-bold text-green-900">7,934</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Кликов</p>
                      <p className="text-2xl font-bold text-purple-900">1,847</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">CTR</p>
                      <p className="text-2xl font-bold text-orange-900">23.3%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Статистика по типам</h4>
                <div className="space-y-3">
                  {[
                    { type: 'reminder', name: 'Напоминания', sent: 3247, clicked: 847, ctr: 26.1 },
                    { type: 'expiry', name: 'Истечение абонемента', sent: 1847, clicked: 567, ctr: 30.7 },
                    { type: 'promotion', name: 'Акции', sent: 2847, clicked: 398, ctr: 14.0 },
                    { type: 'balance', name: 'Баланс', sent: 306, clicked: 35, ctr: 11.4 }
                  ].map((stat) => (
                    <div key={stat.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(stat.type)}`}>
                          {getTypeIcon(stat.type)}
                        </div>
                        <span className="font-medium">{stat.name}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span>Отправлено: <strong>{stat.sent.toLocaleString()}</strong></span>
                        <span>Кликов: <strong>{stat.clicked}</strong></span>
                        <span>CTR: <strong>{stat.ctr}%</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}