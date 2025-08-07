'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useBanners } from '@/hooks/useBanners';
import AgeGroupModal from './AgeGroupModal';

interface HomePageProps {
  userName: string;
  userBonusPoints: number;
  onShowClassManagement: () => void;
  onShowLoyaltyProgram: () => void;
  onShowSubscriptions: () => void;
}

export default function HomePage({ 
  userName, 
  userBonusPoints, 
  onShowClassManagement, 
  onShowLoyaltyProgram,
  onShowSubscriptions
}: HomePageProps) {
  const { activeBanners } = useBanners();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<'babies' | 'school' | 'adults'>('babies');

  // Автоматическое переключение баннеров
  useEffect(() => {
    if (activeBanners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % activeBanners.length);
    }, 4000); // меняем каждые 4 секунды

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const handleGroupClick = (group: 'babies' | 'school' | 'adults') => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-yellow-400 to-red-400 p-4">
      {/* Заголовок */}
      <motion.div
        className="text-center mb-8 pt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 font-heading tracking-wide relative">
            <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
              ✨ Добро пожаловать! ✨
            </span>
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 rounded-2xl blur-lg"></div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white font-semibold mb-2"
        >
          Привет, <span className="text-yellow-300 font-bold">{userName}</span>! 👋
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/90 text-base font-medium"
        >
          🌟 Центр развития ребенка <span className="text-yellow-200 font-bold">"ГАРМОНИЯ"</span> 🌟
        </motion.p>
        
        <motion.div 
          className="flex justify-center items-center mt-4 space-x-2"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="h-1 w-8 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
          <div className="text-yellow-300">⭐</div>
          <div className="h-1 w-8 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
        </motion.div>
      </motion.div>

      {/* Карточки возрастных групп */}
      <motion.div 
        className="mb-8 px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {/* Малыши - Раннее развитие */}
          <motion.div
            className="flex flex-col items-center text-center cursor-pointer group"
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleGroupClick('babies')}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                delay: 0.4,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
          >
            <motion.div 
              className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 flex items-center justify-center shadow-xl mb-3 border-4 border-white/80 group-hover:border-white transition-all duration-300 mx-auto"
              animate={{
                y: [0, -4, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <motion.div 
                className="text-4xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🧸
              </motion.div>
            </motion.div>
            <motion.h3 
              className="text-white text-sm font-bold mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Раннее развитие
            </motion.h3>
            <motion.p 
              className="text-white/80 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Малыши 1-3 года
            </motion.p>
          </motion.div>

          {/* Школьники - Подготовка к школе */}
          <motion.div
            className="flex flex-col items-center text-center cursor-pointer group"
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleGroupClick('school')}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                delay: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
          >
            <motion.div 
              className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 flex items-center justify-center shadow-xl mb-3 border-4 border-white/80 group-hover:border-white transition-all duration-300 mx-auto"
              animate={{
                y: [0, -6, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2
              }}
            >
              <motion.div 
                className="text-4xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4
                }}
              >
                🎒
              </motion.div>
            </motion.div>
            <motion.h3 
              className="text-white text-sm font-bold mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Подготовка к школе
            </motion.h3>
            <motion.p 
              className="text-white/80 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Дети 7-16 лет
            </motion.p>
          </motion.div>

          {/* Взрослые - Шахматы и досуг */}
          <motion.div
            className="flex flex-col items-center text-center cursor-pointer group"
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleGroupClick('adults')}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                delay: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
          >
            <motion.div 
              className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-red-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-xl mb-3 border-4 border-white/80 group-hover:border-white transition-all duration-300 mx-auto"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.6
              }}
            >
              <motion.div 
                className="text-4xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -3, 3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.8
                }}
              >
                ♟️
              </motion.div>
            </motion.div>
            <motion.h3 
              className="text-white text-sm font-bold mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Шахматы
            </motion.h3>
            <motion.p 
              className="text-white/80 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Для всех возрастов
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Рекламные баннеры прямо под stories */}
      {activeBanners.length > 0 && (
        <motion.div
          className="relative overflow-hidden mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            key={currentBanner}
            className={`bg-gradient-to-r ${activeBanners[currentBanner]?.bg} rounded-2xl p-5 shadow-lg relative overflow-hidden`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Фоновая иконка */}
            <div className="absolute -right-4 -top-2 text-6xl opacity-20">
              {activeBanners[currentBanner]?.icon}
            </div>
            
            {/* Контент баннера */}
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-1">
                {activeBanners[currentBanner]?.title}
              </h3>
              <p className="text-white/90 text-sm mb-3">
                {activeBanners[currentBanner]?.subtitle}
              </p>
              <button className="bg-white text-gray-800 font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Подробнее →
              </button>
            </div>
          </motion.div>

          {/* Индикаторы */}
          {activeBanners.length > 1 && (
            <div className="flex justify-center mt-2 space-x-2">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBanner 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Статистика */}
      <motion.div 
        className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="text-center">
          <p className="text-white text-sm mb-1">💰 Ваши бонусы</p>
          <p className="text-2xl font-bold text-white">{userBonusPoints}</p>
          <p className="text-white/80 text-xs">баллов</p>
        </div>
      </motion.div>

      {/* Быстрые действия */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold text-white mb-3">🚀 Быстрые действия</h2>
        
        {/* Кнопка Занятия */}
        <motion.button
          onClick={onShowClassManagement}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="text-3xl mr-3">📖</div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">Мои занятия</h3>
              <p className="text-sm text-gray-600">Расписание и записи</p>
            </div>
          </div>
          <div className="text-blue-500 text-xl">→</div>
        </motion.button>

        {/* Кнопка Абонементы */}
        <motion.button
          onClick={onShowSubscriptions}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="text-3xl mr-3">🎫</div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">Абонементы</h3>
              <p className="text-sm text-gray-600">Тарифы и покупка</p>
            </div>
          </div>
          <div className="text-yellow-500 text-xl">→</div>
        </motion.button>

        {/* Кнопка Бонусы */}
        <motion.button
          onClick={onShowLoyaltyProgram}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="text-3xl mr-3">⭐</div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">Бонусная программа</h3>
              <p className="text-sm text-gray-600">Копите и тратьте баллы</p>
            </div>
          </div>
          <div className="text-red-500 text-xl">→</div>
        </motion.button>


      </motion.div>

      {/* Модальное окно для возрастных групп */}
      <AgeGroupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        groupType={selectedGroup}
      />
    </div>
  );
}