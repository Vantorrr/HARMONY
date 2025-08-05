'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ArrowRight, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [debugCode, setDebugCode] = useState('');

  // Таймер для повторной отправки SMS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Очистка состояния при закрытии модала
  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setPhone('');
      setCode('');
      setError('');
      setSuccess('');
      setResendTimer(0);
      setDebugCode('');
    }
  }, [isOpen]);

  const formatPhoneForAPI = (formattedPhone: string): string => {
    // Извлекаем только цифры и проверяем формат
    const digits = formattedPhone.replace(/\D/g, '');
    // Если начинается с 8, заменяем на 7
    if (digits.startsWith('8') && digits.length === 11) {
      return '7' + digits.slice(1);
    }
    // Если начинается с 7 и длина 11
    if (digits.startsWith('7') && digits.length === 11) {
      return digits;
    }
    // Если длина 10, добавляем 7
    if (digits.length === 10) {
      return '7' + digits;
    }
    return digits;
  };

  const sendSMS = async (phoneNumber: string) => {
    try {
      setError('');
      setIsLoading(true);

      const response = await fetch('/api/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('SMS отправлен!');
        setStep('code');
        setResendTimer(60); // 60 секунд до повторной отправки
        
        // Для разработки показываем код
        if (data.debugCode) {
          setDebugCode(data.debugCode);
        }
      } else {
        setError(data.error || 'Ошибка отправки SMS');
      }
    } catch (error) {
      setError('Ошибка сети. Попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 18) return;
    
    const phoneForAPI = formatPhoneForAPI(phone);
    if (phoneForAPI.length !== 11 || !phoneForAPI.startsWith('7')) {
      setError('Неверный формат номера телефона');
      return;
    }

    await sendSMS(phoneForAPI);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 4) return;
    
    try {
      setError('');
      setIsLoading(true);

      const phoneForAPI = formatPhoneForAPI(phone);
      
      const response = await fetch('/api/sms/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneForAPI,
          code: code
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Авторизация успешна!');
        
        // Сохраняем токен и данные пользователя
        localStorage.setItem('harmony_auth_token', data.token);
        localStorage.setItem('harmony_auth', JSON.stringify(data.user));
        
        // Небольшая задержка для показа успеха
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onSuccess();
        onClose();
      } else {
        setError(data.error || 'Неверный код');
      }
    } catch (error) {
      setError('Ошибка сети. Попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    const phoneForAPI = formatPhoneForAPI(phone);
    await sendSMS(phoneForAPI);
  };

  const formatPhone = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (number.length <= 1) return number;
    if (number.length <= 4) return `+7 (${number.slice(1)}`;
    if (number.length <= 7) return `+7 (${number.slice(1, 4)}) ${number.slice(4)}`;
    if (number.length <= 9) return `+7 (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(7)}`;
    return `+7 (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(7, 9)}-${number.slice(9, 11)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-neutral-900">
                {step === 'phone' ? 'Вход в аккаунт' : 'Подтверждение'}
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Номер телефона
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="+7 (900) 123-45-67"
                      className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mt-2">
                    Мы отправим SMS с кодом подтверждения
                  </p>
                </div>

                {/* Error/Success Messages for Phone */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-700">{success}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={phone.length < 18 || isLoading}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Получить код
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Код из SMS
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="1234"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-widest"
                    maxLength={4}
                    required
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Код отправлен на номер {phone}
                  </p>
                </div>

                {/* Error/Success Messages for Code */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-700">{success}</p>
                  </motion.div>
                )}

                {/* Resend SMS Button */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-neutral-500">
                      Повторная отправка через {resendTimer} сек
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center justify-center mx-auto disabled:opacity-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Отправить код повторно
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={code.length !== 4 || isLoading}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Войти'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setCode('');
                  }}
                  className="w-full text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Изменить номер телефона
                </button>
              </form>
            )}

            {step === 'code' && debugCode && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
              >
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>🔧 Режим разработки</strong>
                </p>
                <p className="text-sm text-yellow-700">
                  Код для тестирования: <strong className="font-mono text-lg">{debugCode}</strong>
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  В продакшене этот блок не отображается
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}