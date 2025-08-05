'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Users, Clock } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { 
      number: "500+", 
      label: "Счастливых детей", 
      icon: "🧸",
      color: "from-pink-400 to-pink-600"
    },
    { 
      number: "5", 
      label: "Лет заботливого развития", 
      icon: "🎂",
      color: "from-blue-400 to-blue-600"
    },
    { 
      number: "3-6", 
      label: "Детей в группе", 
      icon: "👥",
      color: "from-purple-400 to-purple-600"
    },
    { 
      number: "98%", 
      label: "Довольных родителей", 
      icon: "💝",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-16 sm:py-20 harmony-gradient text-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 text-4xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎈
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-3xl opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          🌟
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-5xl opacity-20"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        >
          🎪
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            🌈 Наши достижения
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Цифры, которые говорят сами за себя - мы растим счастливое будущее!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                className="text-4xl sm:text-5xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div 
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-2 sm:mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.15 + 0.3
                }}
              >
                {stat.number}
              </motion.div>
              
              <div className="text-sm sm:text-base lg:text-lg text-white/90 font-medium leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-lg sm:text-xl font-medium">
              💖 <em>"Каждый ребенок уникален, и мы помогаем ему раскрыть свой потенциал!"</em>
            </p>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              - Команда центра "Гармония"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}