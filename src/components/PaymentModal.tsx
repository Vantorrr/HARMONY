'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Check, 
  X,
  Loader2
} from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  type: 'group' | 'individual' | 'massage' | 'premium' | 'kids_group';
  price: number;
  duration: number;
  sessions: number;
  description: string;
  features: string[];
}

interface PaymentModalProps {
  subscription: Subscription;
  bonusPoints: number;
  onSuccess: (subscription: Subscription, usedBonus: number) => void;
  onClose: () => void;
}

export default function PaymentModal({ subscription, bonusPoints, onSuccess, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yukassa' | 'cloudpayments'>('card');
  const [useBonus, setUseBonus] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const maxBonusUse = Math.min(bonusPoints, Math.floor(subscription.price * 0.3)); // Максимум 30% от стоимости
  const finalPrice = subscription.price - useBonus;

  const formatCardNumber = (value: string) => {
    const number = value.replace(/\D/g, '');
    return number.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (number.length >= 2) {
      return `${number.slice(0, 2)}/${number.slice(2, 4)}`;
    }
    return number;
  };

  const handlePayment = async () => {
    if (finalPrice <= 0) return;
    
    setIsProcessing(true);
    
    // Симуляция обработки платежа
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onSuccess(subscription, useBonus);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900">
            Оплата абонемента
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Детали заказа */}
        <div className="bg-neutral-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3">{subscription.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Стоимость абонемента:</span>
              <span>{subscription.price.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Срок действия:</span>
              <span>{subscription.duration} дней</span>
            </div>
            <div className="flex justify-between">
              <span>Количество занятий:</span>
              <span>{subscription.sessions === 999 ? 'Безлимит' : subscription.sessions}</span>
            </div>
            {useBonus > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Скидка бонусами:</span>
                <span>-{useBonus.toLocaleString()} ₽</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>К оплате:</span>
              <span>{finalPrice.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>

        {/* Использование бонусов */}
        {bonusPoints > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-3">Использовать бонусы</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Доступно: {bonusPoints.toLocaleString()} бонусов (макс. {maxBonusUse.toLocaleString()} для этого заказа)
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={maxBonusUse}
                value={useBonus}
                onChange={(e) => setUseBonus(Number(e.target.value))}
                className="flex-1"
              />
              <span className="font-medium">{useBonus.toLocaleString()} ₽</span>
            </div>
          </div>
        )}

        {/* Способы оплаты */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Способ оплаты</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                paymentMethod === 'card' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1" />
              Банковская карта
            </button>
            <button
              onClick={() => setPaymentMethod('yukassa')}
              className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                paymentMethod === 'yukassa' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center mx-auto mb-1">
                ЮK
              </div>
              ЮKassa
            </button>
            <button
              onClick={() => setPaymentMethod('cloudpayments')}
              className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                paymentMethod === 'cloudpayments' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center mx-auto mb-1">
                CP
              </div>
              CloudPayments
            </button>
          </div>
        </div>

        {/* Форма карты */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Номер карты
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({...cardData, number: formatCardNumber(e.target.value)})}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Срок действия
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({...cardData, expiry: formatExpiry(e.target.value)})}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Имя владельца карты
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                placeholder="IVAN PETROV"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Безопасность */}
        <div className="flex items-center justify-center text-sm text-neutral-500 mb-6">
          <Shield className="w-4 h-4 mr-2" />
          Платеж защищен SSL-шифрованием
        </div>

        {/* Кнопка оплаты */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || finalPrice <= 0}
          className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Обработка платежа...
            </>
          ) : finalPrice <= 0 ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Получить бесплатно
            </>
          ) : (
            `Оплатить ${finalPrice.toLocaleString()} ₽`
          )}
        </button>

        {/* Демо уведомление */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
          <strong>Демо режим:</strong> Платеж будет имитирован. Реальное списание средств не произойдет.
        </div>
      </motion.div>
    </div>
  );
}