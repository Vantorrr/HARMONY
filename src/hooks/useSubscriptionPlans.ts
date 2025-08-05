// Хук для управления абонементами через localStorage
import { useState, useEffect } from 'react';
import { subscriptionPlans as initialPlans, type SubscriptionPlan } from '@/data/subscriptions';

const STORAGE_KEY = 'harmony_subscription_plans';

export function useSubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedPlans = localStorage.getItem(STORAGE_KEY);
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (error) {
        console.error('Ошибка загрузки абонементов:', error);
        setPlans(initialPlans);
        savePlans(initialPlans);
      }
    } else {
      setPlans(initialPlans);
      savePlans(initialPlans);
    }
    setLoading(false);
  }, []);

  // Сохранение в localStorage
  const savePlans = (newPlans: SubscriptionPlan[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlans));
    setPlans(newPlans);
    
    // Уведомляем другие компоненты об изменениях
    window.dispatchEvent(new CustomEvent('subscriptionPlansUpdated', { 
      detail: newPlans 
    }));
  };

  // Создание нового абонемента
  const createPlan = (planData: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: SubscriptionPlan = {
      ...planData,
      id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const updatedPlans = [...plans, newPlan];
    savePlans(updatedPlans);
    
    return newPlan;
  };

  // Обновление абонемента
  const updatePlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    const updatedPlans = plans.map(plan => 
      plan.id === id 
        ? { 
            ...plan, 
            ...updates, 
            updatedAt: new Date().toISOString().split('T')[0] 
          }
        : plan
    );
    
    savePlans(updatedPlans);
    return updatedPlans.find(p => p.id === id);
  };

  // Удаление абонемента
  const deletePlan = (id: string) => {
    const updatedPlans = plans.filter(plan => plan.id !== id);
    savePlans(updatedPlans);
  };

  // Переключение активности
  const toggleActive = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      updatePlan(id, { isActive: !plan.isActive });
    }
  };

  // Переключение популярности
  const togglePopular = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      updatePlan(id, { isPopular: !plan.isPopular });
    }
  };

  // Копирование абонемента
  const duplicatePlan = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      const duplicatedPlan = {
        ...plan,
        name: `${plan.name} (копия)`,
        isPopular: false,
        createdBy: 'admin'
      };
      
      // Удаляем id и даты чтобы createPlan создал новые
      const { id: _, createdAt: __, updatedAt: ___, ...planData } = duplicatedPlan;
      return createPlan(planData);
    }
  };

  // Получение активных абонементов для клиентов
  const getActivePlans = () => plans.filter(plan => plan.isActive);

  // Получение популярных абонементов
  const getPopularPlans = () => plans.filter(plan => plan.isPopular && plan.isActive);

  // Получение статистики
  const getStats = () => ({
    total: plans.length,
    active: plans.filter(p => p.isActive).length,
    popular: plans.filter(p => p.isPopular).length,
    inactive: plans.filter(p => !p.isActive).length,
  });

  return {
    plans,
    loading,
    createPlan,
    updatePlan,
    deletePlan,
    toggleActive,
    togglePopular,
    duplicatePlan,
    getActivePlans,
    getPopularPlans,
    getStats,
  };
}