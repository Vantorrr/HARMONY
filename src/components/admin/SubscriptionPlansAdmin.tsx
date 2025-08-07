'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Save, X, Star, Flame, Percent, Clock, Users, CreditCard, Tag, Eye, EyeOff, Copy, TrendingUp
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubscriptionPlans, type SubscriptionPlan } from '@/hooks/useSubscriptionPlans';

interface SubscriptionPlansAdminProps {
  adminUser: {
    username: string;
    role: string;
    permissions: string[];
  };
}

// Zod schema for form validation
const subscriptionSchema = z.object({
  name: z.string().min(1, 'Введите название'),
  type: z.enum(['group', 'individual', 'massage', 'premium']),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  originalPrice: z.number().optional().nullable().transform(e => e === "" ? undefined : e),
  duration: z.number().min(1, 'Срок должен быть больше 0'),
  sessions: z.number().min(1, 'Количество занятий должно быть больше 0'),
  description: z.string().min(1, 'Введите описание'),
  features: z.array(z.string()).min(1, 'Добавьте хотя бы одну особенность').transform(arr => arr.filter(f => f.trim() !== '')),
  isActive: z.boolean(),
  isPopular: z.boolean(),
  discountPercent: z.number().min(0).max(100),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export default function SubscriptionPlansAdmin({ adminUser }: SubscriptionPlansAdminProps) {
  const { plans, addPlan, updatePlan, deletePlan, togglePlanStatus, togglePopular, duplicatePlan, resetToDefaults } = useSubscriptionPlans();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      isActive: true,
      isPopular: false,
      discountPercent: 0,
      features: [''],
      originalPrice: undefined,
    }
  });

  const features = watch('features') || [''];

  useEffect(() => {
    if (selectedPlan) {
      reset({
        name: selectedPlan.name,
        type: selectedPlan.type,
        price: selectedPlan.price,
        originalPrice: selectedPlan.originalPrice,
        duration: selectedPlan.duration,
        sessions: selectedPlan.sessions,
        description: selectedPlan.description,
        features: selectedPlan.features.length > 0 ? selectedPlan.features : [''],
        isActive: selectedPlan.isActive,
        isPopular: selectedPlan.isPopular,
        discountPercent: selectedPlan.discountPercent,
      });
    } else {
      reset({
        isActive: true,
        isPopular: false,
        discountPercent: 0,
        features: [''],
        originalPrice: undefined,
      });
    }
  }, [selectedPlan, reset]);

  const filteredPlans = plans.filter(plan => {
    if (filterType !== 'all' && plan.type !== filterType) return false;
    if (filterStatus === 'active' && !plan.isActive) return false;
    if (filterStatus === 'inactive' && plan.isActive) return false;
    if (filterStatus === 'popular' && !plan.isPopular) return false;
    return true;
  });

  const openEditForm = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsEditing(true);
    setShowForm(true);
  };

  const openCreateForm = () => {
    setSelectedPlan(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlan(null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: SubscriptionForm) => {
    const finalData = {
      ...data,
      originalPrice: data.discountPercent > 0 ? data.originalPrice : undefined,
    };

    if (isEditing && selectedPlan) {
      updatePlan({ ...selectedPlan, ...finalData });
    } else {
      addPlan(finalData, adminUser);
    }
    closeForm();
  };

  const handleAddFeature = () => {
    setValue('features', [...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setValue('features', newFeatures.length > 0 ? newFeatures : ['']);
  };

  const handleUpdateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setValue('features', newFeatures);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group': return 'bg-blue-100 text-blue-800';
      case 'individual': return 'bg-purple-100 text-purple-800';
      case 'massage': return 'bg-pink-100 text-pink-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'group': return 'Групповой';
      case 'individual': return 'Персональный';
      case 'massage': return 'Массаж';
      case 'premium': return 'Премиум';
      default: return 'Другой';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Управление тарифами</h1>
            <p className="text-white/80">Создавайте и редактируйте абонементы для клиентов</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCreateForm}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Создать абонемент
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (confirm('🔄 СБРОСИТЬ ВСЕ АБОНЕМЕНТЫ к дефолтным для детского центра?\n\nЭто удалит все текущие абонементы и восстановит правильные!')) {
                  resetToDefaults();
                  alert('✅ Абонементы сброшены к детскому центру!');
                }
              }}
              className="bg-red-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              🔄 Сброс
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Активные</p>
              <p className="text-2xl font-bold text-gray-900">{plans.filter(p => p.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Популярные</p>
              <p className="text-2xl font-bold text-gray-900">{plans.filter(p => p.isPopular).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего</p>
              <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все типы</option>
            <option value="group">Групповые</option>
            <option value="individual">Персональный</option>
            <option value="massage">Массаж</option>
            <option value="premium">Премиум</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="popular">Популярные</option>
          </select>

          <div className="text-sm text-neutral-600 flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            Активных: {plans.filter(p => p.isActive).length} из {plans.length}
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative ${
              plan.isPopular ? 'ring-4 ring-yellow-300 ring-opacity-50' : ''
            } ${!plan.isActive ? 'opacity-60' : ''}`}
          >
            {/* Status badges */}
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🔥 ХИТ ПРОДАЖ 🔥
                </div>
              </div>
            )}

            <div className="pt-4">
              {/* Type badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.type)}`}>
                  {getTypeText(plan.type)}
                </span>
                {plan.discountPercent > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                    -{plan.discountPercent}%
                  </span>
                )}
              </div>

              {/* Plan info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">₽{plan.price.toLocaleString()}</span>
                {plan.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₽{plan.originalPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {plan.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    {feature}
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <div className="text-xs text-gray-500 ml-4">
                    +{plan.features.length - 3} дополнительных
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openEditForm(plan)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Редактировать
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    plan.isActive
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {plan.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePopular(plan.id)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    plan.isPopular
                      ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => duplicatePlan(plan, adminUser)}
                  className="px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors text-sm"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deletePlan(plan.id)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="mt-3 text-xs text-neutral-500">
                Обновлен {new Date(plan.updatedAt).toLocaleDateString('ru-RU')} • {plan.createdBy}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Редактировать абонемент' : 'Создать новый абонемент'}
                </h3>
                <p className="text-gray-600 mt-1">
                  {isEditing ? 'Измените параметры абонемента' : 'Заполните информацию о новом тарифе'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeForm}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Название абонемента *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Групповой Премиум"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Тип абонемента *
                  </label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="group">Групповой</option>
                    <option value="individual">Персональный</option>
                    <option value="massage">Массаж</option>
                    <option value="premium">Премиум</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="3000"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Скидка (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    {...register('discountPercent', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Первоначальная цена (₽)
                  </label>
                  <input
                    type="number"
                    {...register('originalPrice', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="3000"
                  />
                </div>
              </div>

              {/* Duration & Sessions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Срок действия (дни) *
                  </label>
                  <input
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="30"
                  />
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Количество занятий *
                  </label>
                  <input
                    type="number"
                    {...register('sessions', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="15"
                  />
                  {errors.sessions && <p className="text-red-500 text-sm mt-1">{errors.sessions.message}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Подробное описание абонемента и его преимуществ"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Особенности абонемента
                </label>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleUpdateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Например: Доступ в зал"
                      />
                      {features.length > 1 && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveFeature(index)}
                          className="w-12 h-12 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  ))}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddFeature}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить особенность
                  </motion.button>
                </div>
                {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>}
              </div>

              {/* Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Настройки</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('isActive')}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Активен</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('isPopular')}
                      className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500"
                    />
                    <span className="text-gray-700 font-medium">Популярный (ХИТ) 🔥</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Сохранить изменения' : 'Создать абонемент'}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeForm}
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Отмена
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}