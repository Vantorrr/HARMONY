'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Users, 
  User, 
  Sparkles, 
  Check, 
  Clock,
  Star
} from 'lucide-react';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';

// Адаптер для преобразования SubscriptionPlan в Subscription
interface Subscription {
  id: string;
  name: string;
  type: 'group' | 'individual' | 'massage' | 'premium';
  price: number;
  originalPrice?: number;
  duration: number; // в днях
  sessions: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface SubscriptionShopProps {
  onPurchase: (subscription: Subscription) => void;
  onClose: () => void;
}

export default function SubscriptionShop({ onPurchase, onClose }: SubscriptionShopProps) {
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const { getActivePlans } = useSubscriptionPlans();

  // Преобразуем данные из хука в формат компонента
  const subscriptions: Subscription[] = getActivePlans().map(plan => ({
    id: plan.id,
    name: plan.name,
    type: plan.type,
    price: plan.price,
    originalPrice: plan.originalPrice,
    duration: plan.duration,
    sessions: plan.sessions,
    description: plan.description,
    features: plan.features,
    popular: plan.isPopular
  }));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'group': return <Users className="w-6 h-6" />;
      case 'individual': return <User className="w-6 h-6" />;
      case 'massage': return <Sparkles className="w-6 h-6" />;
      case 'premium': return <Star className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group': return 'text-primary-500 bg-primary-50';
      case 'individual': return 'text-secondary-500 bg-secondary-50';
      case 'massage': return 'text-accent-500 bg-accent-50';
      case 'premium': return 'text-purple-500 bg-purple-50';
      default: return 'text-primary-500 bg-primary-50';
    }
  };

  const handlePurchase = (subscription: Subscription) => {
    setSelectedSub(subscription);
    // Здесь будет интеграция с платежной системой
    onPurchase(subscription);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-heading font-bold text-neutral-900">
            Выберите абонемент
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {subscriptions.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer flex flex-col h-full ${
                sub.popular ? 'border-secondary-400 shadow-xl ring-2 ring-secondary-200' : 'border-neutral-200 hover:border-primary-300'
              }`}
              onClick={() => handlePurchase(sub)}
            >
              {sub.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl border-2 border-white whitespace-nowrap">
                    🔥 ХИТ 🔥
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(sub.type)}`}>
                  {getTypeIcon(sub.type)}
                </div>
                <div className="text-right">
                  {sub.originalPrice && (
                    <div className="text-sm text-neutral-400 line-through">
                      {sub.originalPrice.toLocaleString()} ₽
                    </div>
                  )}
                  <div className="text-2xl font-bold text-neutral-900">
                    {sub.price.toLocaleString()} ₽
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-heading font-semibold mb-2">{sub.name}</h3>
              <p className="text-neutral-600 mb-4">{sub.description}</p>

              <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {sub.duration} дней
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-1" />
                  {sub.sessions === 999 ? 'Безлимит' : `${sub.sessions} занятий`}
                </div>
              </div>

              <div className="space-y-2 mb-6 flex-grow">
                {sub.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl font-medium transition-all mt-auto ${
                sub.popular 
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:shadow-2xl transform hover:scale-105 font-bold shadow-lg' 
                  : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
              }`}>
                {sub.popular ? '🔥 КУПИТЬ ХИТ 🔥' : 'Купить абонемент'}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-neutral-50 rounded-xl">
          <h3 className="font-heading font-semibold mb-3">Способы оплаты:</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-neutral-600">
              <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center mr-2">
                VISA
              </div>
              Банковские карты
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <div className="w-8 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center mr-2">
                MC
              </div>
              MasterCard
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <div className="w-8 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center mr-2">
                ЮK
              </div>
              ЮKassa
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center mr-2">
                CP
              </div>
              CloudPayments
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}