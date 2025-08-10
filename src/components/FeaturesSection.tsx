'use client';

import { motion } from 'framer-motion';
import { 
  Smartphone, 
  CreditCard, 
  Users, 
  Bell, 
  Heart, 
  BookOpen,
  Palette,
  Activity
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "🧸 Развивашки для малышей",
      description: "Сенсорное развитие, мелкая моторика и первые творческие шаги для детей 2-4 лет"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "📚 Подготовка к школе",
      description: "Обучение чтению, письму и математике в игровой форме для детей 5-7 лет"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "🎨 Творческая мастерская",
      description: "Рисование, лепка, аппликация - развиваем творческий потенциал каждого ребенка"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "⚽ Спортивные занятия",
      description: "Физическая подготовка, командные игры, гимнастика и танцы для здорового развития"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "👨‍👩‍👧‍👦 Для родителей",
      description: "Массаж и йога для родителей, пока дети развиваются - время для себя"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "📱 Удобное приложение",
      description: "Записывайтесь на занятия, следите за прогрессом и получайте уведомления"
    }
  ];

  return (
<section id="features" className="py-16 sm:py-20 bg-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-2xl sm:text-3xl mb-2">🌟 Что мы предлагаем</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Лучшее для ваших детей!
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ✨ Развиваем детей с любовью и профессионализмом в уютной атмосфере. 
            Индивидуальный подход к каждому ребенку!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-pink-200"
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 harmony-gradient rounded-3xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-900 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-neutral-700 mb-6 font-medium">
            🏠 Мы создаем домашнюю атмосферу, где каждый ребенок чувствует себя особенным!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-sm font-medium text-neutral-600">👥 Группы по</span>
              <span className="text-2xl font-bold text-pink-500 mx-2">3-6</span>
              <span className="text-sm font-medium text-neutral-600">детей</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-sm font-medium text-neutral-600">🏆</span>
              <span className="text-2xl font-bold text-blue-500 mx-2">5</span>
              <span className="text-sm font-medium text-neutral-600">лет опыта</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-sm font-medium text-neutral-600">💝</span>
              <span className="text-2xl font-bold text-purple-500 mx-2">500+</span>
              <span className="text-sm font-medium text-neutral-600">счастливых детей</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}