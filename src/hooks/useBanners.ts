'use client';

import { useState, useEffect } from 'react';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  icon: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
}

const defaultBanners: Banner[] = [
  {
    id: '1',
    title: '🎉 СКИДКА 30%',
    subtitle: 'на первое занятие для новых клиентов!',
    bg: 'from-blue-400 to-red-400',
    icon: '🎁',
    isActive: true,
    order: 1,
    createdAt: new Date()
  },
  {
    id: '2',
    title: '🧘‍♀️ ЙОГА ДЛЯ МАМ',
    subtitle: 'Каждый вторник и четверг в 19:00',
    bg: 'from-yellow-400 to-blue-500',
    icon: '🌸',
    isActive: true,
    order: 2,
    createdAt: new Date()
  }
];

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);

  // Загрузка баннеров из localStorage при инициализации
  useEffect(() => {
    const savedBanners = localStorage.getItem('harmony_banners');
    if (savedBanners) {
      try {
        const parsed = JSON.parse(savedBanners);
        setBanners(parsed.map((banner: any) => ({
          ...banner,
          createdAt: new Date(banner.createdAt)
        })));
      } catch (error) {
        console.error('Error parsing banners:', error);
      }
    }
  }, []);

  // Сохранение в localStorage при изменении
  const saveBanners = (newBanners: Banner[]) => {
    setBanners(newBanners);
    localStorage.setItem('harmony_banners', JSON.stringify(newBanners));
  };

  // Получить активные баннеры отсортированные по порядку
  const getActiveBanners = () => {
    return banners
      .filter(banner => banner.isActive)
      .sort((a, b) => a.order - b.order);
  };

  // Добавить новый баннер
  const addBanner = (bannerData: Omit<Banner, 'id' | 'createdAt'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    const newBanners = [...banners, newBanner];
    saveBanners(newBanners);
  };

  // Обновить баннер
  const updateBanner = (id: string, updates: Partial<Banner>) => {
    const newBanners = banners.map(banner =>
      banner.id === id ? { ...banner, ...updates } : banner
    );
    saveBanners(newBanners);
  };

  // Удалить баннер
  const deleteBanner = (id: string) => {
    const newBanners = banners.filter(banner => banner.id !== id);
    saveBanners(newBanners);
  };

  // Переключить активность баннера
  const toggleBannerActive = (id: string) => {
    updateBanner(id, { 
      isActive: !banners.find(b => b.id === id)?.isActive 
    });
  };

  // Изменить порядок баннера
  const reorderBanner = (id: string, newOrder: number) => {
    updateBanner(id, { order: newOrder });
  };

  return {
    banners,
    activeBanners: getActiveBanners(),
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBannerActive,
    reorderBanner
  };
}