'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
<footer className="bg-teal-50 text-gray-700 py-12 sm:py-16 relative overflow-hidden border-t border-gray-200">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute top-10 left-10 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌙
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-5xl"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          ⭐
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <motion.div
              className="flex items-center justify-center md:justify-start space-x-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo/logo.png"
                  alt="Логотип семейного центра Гармония"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                  ГАРМОНИЯ
                </span>
              </h3>
              <span className="text-2xl">✨</span>
            </motion.div>
            <p className="text-white/80 mb-6 max-w-sm mx-auto md:mx-0">
              🎨 Центр развития ребенка - место, где каждый малыш раскрывает свой потенциал с радостью и любовью!
            </p>
            
            {/* Social proof */}
            <div className="flex justify-center md:justify-start items-center space-x-1 mb-4">
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
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                </motion.div>
              ))}
              <span className="ml-2 text-white/80 text-sm">5.0 - любимы родителями!</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 flex items-center justify-center md:justify-start">
              <Phone className="w-5 h-5 mr-2" />
              📞 Свяжитесь с нами
            </h4>
            <div className="space-y-4">
              <motion.a 
                href="tel:+79801520865"
                className="flex items-center justify-center md:justify-start text-white/80 hover:text-white transition-colors group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Phone className="w-4 h-4 mr-3 group-hover:text-pink-300" />
                <span>+7 980 152-08-65</span>
              </motion.a>
              
              <motion.div 
                className="flex items-start justify-center md:justify-start text-white/80"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <MapPin className="w-4 h-4 mr-3 mt-1 text-blue-300" />
                <span className="text-sm leading-relaxed">
                  Родниковая улица, 30, корп. 3,<br/>
                  Москва<br/>
                  <span className="text-xs text-white/60">Остановка Румянцево-2</span>
                </span>
              </motion.div>
              
              <div className="flex items-center justify-center md:justify-start text-white/80">
                <Clock className="w-4 h-4 mr-3 text-yellow-300" />
                <span className="text-sm">Ежедневно 9:00 - 20:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6">🔗 Полезные ссылки</h4>
            <div className="space-y-3">
              <motion.a 
                href="#features" 
                className="block text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                🎨 Наши занятия
              </motion.a>
              <motion.a 
                href="#pricing" 
                className="block text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                💰 Цены и абонементы
              </motion.a>
              <motion.a 
                href="#" 
                className="block text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                📄 Политика конфиденциальности
              </motion.a>
              <motion.a 
                href="#" 
                className="block text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                ❓ Часто задаваемые вопросы
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/60 text-sm mb-4">
              © 2025 Центр развития ребенка "Гармония". Растим счастливых детей с 2019 года.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <span className="flex items-center text-white/80">
                <Heart className="w-4 h-4 mr-1 text-pink-400" />
                Сделано с любовью
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white/80">
                💝 Для самых дорогих - наших детей
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}