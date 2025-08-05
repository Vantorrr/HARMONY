'use client';

import { motion } from 'framer-motion';
import { Phone, Heart, Star } from 'lucide-react';

interface CTASectionProps {
  onAuthModalOpen?: () => void;
}

export default function CTASection({ onAuthModalOpen }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎪
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-5xl opacity-10"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          🎠
        </motion.div>
        <motion.div
          className="absolute top-40 right-40 text-4xl opacity-15"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        >
          ⭐
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main headline */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-2xl sm:text-3xl mb-2">🌟 Готовы дать своему</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ребенку лучшее?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-neutral-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🎯 Запишитесь на пробное занятие и убедитесь сами - 
            <span className="font-bold text-pink-600"> ваш ребенок полюбит развиваться вместе с нами!</span>
          </motion.p>

          {/* Features highlight */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-pink-200/30">
              <div className="text-2xl sm:text-3xl mb-2">🏠</div>
              <h3 className="font-bold text-neutral-800 mb-1">Домашняя атмосфера</h3>
              <p className="text-sm text-neutral-600">Уютно и безопасно</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200/30">
              <div className="text-2xl sm:text-3xl mb-2">👩‍🏫</div>
              <h3 className="font-bold text-neutral-800 mb-1">Опытные педагоги</h3>
              <p className="text-sm text-neutral-600">Любят детей как своих</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-200/30">
              <div className="text-2xl sm:text-3xl mb-2">✨</div>
              <h3 className="font-bold text-neutral-800 mb-1">Индивидуальный подход</h3>
              <p className="text-sm text-neutral-600">К каждому ребенку</p>
            </div>
          </motion.div>

          {/* Call to action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              onClick={onAuthModalOpen}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-3xl text-lg sm:text-xl font-bold 
                       hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-3xl 
                       border-4 border-white/30 w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Записаться на занятие!
            </motion.button>
            
            <motion.a 
              href="tel:+79801520865"
              className="bg-white text-neutral-800 px-8 sm:px-10 py-4 sm:py-5 rounded-3xl text-lg sm:text-xl font-bold 
                       hover:bg-neutral-50 transition-all duration-300 shadow-lg hover:shadow-xl 
                       border-2 border-neutral-200 w-full sm:w-auto flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              📞 Позвонить нам
            </motion.a>
          </motion.div>

          {/* Contact info */}
          <motion.div 
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-neutral-600 mb-2">
              📍 <strong>Адрес:</strong> Родниковая улица, 30, корп. 3, Москва
            </p>
            <p className="text-neutral-600 mb-4">
              📞 <strong>Телефон:</strong> +7 980 152-08-65
            </p>
            
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
              <span className="ml-2 text-neutral-600 font-medium">Нас рекомендуют!</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}