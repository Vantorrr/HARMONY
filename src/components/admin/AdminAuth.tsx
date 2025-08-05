'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const adminAuthSchema = z.object({
  username: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
});

type AdminAuthForm = z.infer<typeof adminAuthSchema>;

interface AdminAuthProps {
  onAuthSuccess: (user: any) => void;
}

// Предустановленные админы
const adminUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'super_admin',
    name: 'Главный администратор',
    permissions: ['all']
  },
  {
    id: '2', 
    username: 'manager',
    password: 'manager123',
    role: 'manager',
    name: 'Менеджер',
    permissions: ['clients', 'subscriptions', 'reports']
  },
  {
    id: '3',
    username: 'teacher',
    password: 'teacher123', 
    role: 'teacher',
    name: 'Педагог',
    permissions: ['visits', 'clients_view']
  }
];

export default function AdminAuth({ onAuthSuccess }: AdminAuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminAuthForm>({
    resolver: zodResolver(adminAuthSchema),
  });

  const onSubmit = async (data: AdminAuthForm) => {
    setIsLoading(true);
    setAuthError('');

    // Симуляция проверки
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = adminUsers.find(
      u => u.username === data.username && u.password === data.password
    );

    if (user) {
      const authData = {
        ...user,
        loginTime: Date.now(),
      };
      
      localStorage.setItem('harmony_admin_auth', JSON.stringify(authData));
      onAuthSuccess(authData);
    } else {
      setAuthError('Неверный логин или пароль');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">
            Административная панель
          </h1>
          <p className="text-neutral-600">
            Войдите в систему для управления центром
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Логин
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                {...register('username')}
                type="text"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.username ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="Введите логин"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="Введите пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error */}
          {authError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
            >
              {authError}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Авторизация...' : 'Войти в систему'}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 text-center mb-3">Демо-аккаунты:</p>
          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>admin / admin123</span>
              <span className="text-green-600">Главный админ</span>
            </div>
            <div className="flex justify-between">
              <span>manager / manager123</span>
              <span className="text-blue-600">Менеджер</span>
            </div>
            <div className="flex justify-between">
              <span>teacher / teacher123</span>
              <span className="text-purple-600">Педагог</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}