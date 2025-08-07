'use client';

import { motion } from 'framer-motion';

interface BottomNavigationProps {
  activeTab: 'home' | 'classes' | 'bonuses' | 'profile';
  onTabChange: (tab: 'home' | 'classes' | 'bonuses' | 'profile') => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'classes', icon: '📚', label: 'Занятия' },
    { id: 'bonuses', icon: '🎁', label: 'Бонусы' },
    { id: 'profile', icon: '👤', label: 'Профиль' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-0 flex-1 ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-orange-500'
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Иконка */}
            <motion.div
              className={`text-2xl mb-1 ${
                activeTab === tab.id ? 'filter drop-shadow-sm' : ''
              }`}
              animate={{
                scale: activeTab === tab.id ? 1.1 : 1,
                rotate: activeTab === tab.id ? [0, -5, 5, 0] : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {tab.icon}
            </motion.div>

            {/* Текст */}
            <span className={`text-xs font-medium leading-none ${
              activeTab === tab.id ? 'text-white' : 'text-gray-600'
            }`}>
              {tab.label}
            </span>

            {/* Активный индикатор */}
            {activeTab === tab.id && (
              <motion.div
                className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                layoutId="activeIndicator"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Безопасная зона для iPhone */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </div>
  );
}