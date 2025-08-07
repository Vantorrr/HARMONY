'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBanners, Banner } from '@/hooks/useBanners';

export default function BannersAdmin() {
  const { banners, activeBanners, addBanner, updateBanner, deleteBanner, toggleBannerActive } = useBanners();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  
  // Форма данные
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    bg: 'from-pink-400 to-red-500',
    icon: '🎁',
    order: 1,
    isActive: true
  });

  // Доступные градиенты (в цветах логотипа)
  const gradientOptions = [
    { value: 'from-blue-400 to-red-400', label: 'Синий-Красный (логотип)', preview: 'bg-gradient-to-r from-blue-400 to-red-400' },
    { value: 'from-yellow-400 to-blue-500', label: 'Желтый-Синий (логотип)', preview: 'bg-gradient-to-r from-yellow-400 to-blue-500' },
    { value: 'from-red-400 to-yellow-500', label: 'Красный-Желтый (логотип)', preview: 'bg-gradient-to-r from-red-400 to-yellow-500' },
    { value: 'from-blue-400 to-yellow-400', label: 'Синий-Желтый', preview: 'bg-gradient-to-r from-blue-400 to-yellow-400' },
    { value: 'from-yellow-300 to-red-400', label: 'Желтый-Красный', preview: 'bg-gradient-to-r from-yellow-300 to-red-400' },
    { value: 'from-blue-300 to-red-300', label: 'Голубой-Красный', preview: 'bg-gradient-to-r from-blue-300 to-red-300' }
  ];

  // Доступные иконки
  const iconOptions = ['🎁', '🌸', '⭐', '🎉', '💫', '🔥', '✨', '🎊', '🌟', '💝', '🎈', '🎀'];

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      bg: 'from-blue-400 to-red-400',
      icon: '🎁',
      order: 1,
      isActive: true
    });
    setEditingBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBanner) {
      updateBanner(editingBanner.id, formData);
    } else {
      addBanner(formData);
    }
    
    resetForm();
    setIsAddModalOpen(false);
  };

  const startEdit = (banner: Banner) => {
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      bg: banner.bg,
      icon: banner.icon,
      order: banner.order,
      isActive: banner.isActive
    });
    setEditingBanner(banner);
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🎪 Управление баннерами</h2>
          <p className="text-gray-600">Создавайте и редактируйте рекламные баннеры для главной страницы</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          ➕ Добавить баннер
        </button>
      </div>

      {/* Превью активных баннеров */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📱 Превью (как видят клиенты):</h3>
        <div className="bg-gradient-to-br from-blue-400 via-yellow-400 to-red-400 p-4 rounded-2xl">
          {activeBanners.length > 0 ? (
            <div className="space-y-3">
              {activeBanners.map((banner) => (
                <div
                  key={banner.id}
                  className={`bg-gradient-to-r ${banner.bg} rounded-2xl p-4 relative overflow-hidden`}
                >
                  <div className="absolute -right-2 -top-1 text-4xl opacity-20">
                    {banner.icon}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold text-sm mb-1">{banner.title}</h4>
                    <p className="text-white/90 text-xs mb-2">{banner.subtitle}</p>
                    <div className="bg-white text-gray-800 font-bold px-2 py-1 rounded text-xs inline-block">
                      Подробнее →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/80 py-8">
              Нет активных баннеров
            </div>
          )}
        </div>
      </div>

      {/* Список всех баннеров */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">📋 Все баннеры</h3>
        </div>
        
        <div className="divide-y">
          {banners.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Баннеры не созданы
            </div>
          ) : (
            banners.map((banner) => (
              <div key={banner.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Превью баннера */}
                    <div className={`w-20 h-12 rounded-lg bg-gradient-to-r ${banner.bg} flex items-center justify-center relative overflow-hidden`}>
                      <span className="text-lg opacity-60">{banner.icon}</span>
                    </div>
                    
                    {/* Информация */}
                    <div>
                      <h4 className="font-semibold text-gray-800">{banner.title}</h4>
                      <p className="text-sm text-gray-600">{banner.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          banner.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {banner.isActive ? '✅ Активен' : '❌ Отключен'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Порядок: {banner.order}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBannerActive(banner.id)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        banner.isActive
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {banner.isActive ? '⏸️ Отключить' : '▶️ Включить'}
                    </button>
                    <button
                      onClick={() => startEdit(banner)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                    >
                      ✏️ Редактировать
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Удалить этот баннер?')) {
                          deleteBanner(banner.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Модальное окно создания/редактирования */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingBanner ? '✏️ Редактировать баннер' : '➕ Создать баннер'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Заголовок */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="🎉 СКИДКА 30%"
                  />
                </div>

                {/* Подзаголовок */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подзаголовок
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="на первое занятие для новых клиентов!"
                  />
                </div>

                {/* Градиент */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цветовая схема
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gradientOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, bg: option.value })}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          formData.bg === option.value
                            ? 'border-blue-500'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className={`h-8 rounded ${option.preview}`}></div>
                        <span className="text-xs text-gray-600 mt-1 block">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Иконка */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Иконка
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-2 rounded-lg border-2 text-2xl transition-all ${
                          formData.icon === icon
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Порядок и активность */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Порядок
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Статус
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="mr-2"
                      />
                      Активен
                    </label>
                  </div>
                </div>

                {/* Превью */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Превью
                  </label>
                  <div className={`bg-gradient-to-r ${formData.bg} rounded-2xl p-4 relative overflow-hidden`}>
                    <div className="absolute -right-2 -top-1 text-4xl opacity-20">
                      {formData.icon}
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-white font-bold text-sm mb-1">{formData.title || 'Заголовок'}</h4>
                      <p className="text-white/90 text-xs mb-2">{formData.subtitle || 'Подзаголовок'}</p>
                      <div className="bg-white text-gray-800 font-bold px-2 py-1 rounded text-xs inline-block">
                        Подробнее →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsAddModalOpen(false);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {editingBanner ? 'Сохранить' : 'Создать'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}