'use client';

import { motion } from 'framer-motion';

interface HomePageProps {
  userName: string;
  userBonusPoints: number;
  onShowClassManagement: () => void;
  onShowLoyaltyProgram: () => void;
}

export default function HomePage({ 
  userName, 
  userBonusPoints, 
  onShowClassManagement, 
  onShowLoyaltyProgram 
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-4">
      {/* Заголовок */}
      <motion.div 
        className="text-center mb-8 pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 font-heading">
          🌈 Привет, {userName}! 🌈
        </h1>
        <p className="text-lg text-white opacity-90">
          Добро пожаловать в центр "ГАРМОНИЯ"
        </p>
      </motion.div>

      {/* Статистика */}
      <motion.div 
        className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center">
          <p className="text-white text-lg mb-2">💰 Ваши бонусы</p>
          <p className="text-4xl font-bold text-white">{userBonusPoints}</p>
          <p className="text-white/80 text-sm">баллов</p>
        </div>
      </motion.div>

      {/* Быстрые действия */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">🚀 Быстрые действия</h2>
        
        {/* Кнопка Занятия */}
        <motion.button
          onClick={onShowClassManagement}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="text-4xl mr-4">📚</div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">Мои занятия</h3>
              <p className="text-gray-600">Расписание и записи</p>
            </div>
          </div>
          <div className="text-orange-500 text-2xl">→</div>
        </motion.button>

        {/* Кнопка Бонусы */}
        <motion.button
          onClick={onShowLoyaltyProgram}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="text-4xl mr-4">🎁</div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">Бонусная программа</h3>
              <p className="text-gray-600">Копите и тратьте баллы</p>
            </div>
          </div>
          <div className="text-orange-500 text-2xl">→</div>
        </motion.button>

        {/* Новости */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            📢 Новости центра
          </h3>
          <div className="space-y-3">
            <div className="bg-yellow-100 rounded-xl p-3">
              <p className="text-sm text-gray-700">
                🎉 <strong>Новые группы!</strong> Открыт набор на творческие мастерские для детей 5-7 лет
              </p>
            </div>
            <div className="bg-blue-100 rounded-xl p-3">
              <p className="text-sm text-gray-700">
                🧘‍♀️ <strong>Йога для мам!</strong> Каждый вторник и четверг в 19:00
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}