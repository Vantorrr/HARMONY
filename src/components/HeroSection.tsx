'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onLoginClick?: () => void;
}

export default function HeroSection({ onLoginClick }: HeroSectionProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  // Генерируем анимационные данные только на клиенте
  useEffect(() => {
    const bubbles = Array.from({ length: 8 }, (_, i) => ({
      left: [10, 25, 40, 60, 75, 90, 20, 50][i] + '%',
      top: [15, 35, 70, 20, 80, 30, 60, 45][i] + '%',
      delay: i * 0.5,
      duration: [3, 4, 3.5, 4.5, 3, 5, 3.5, 4][i],
      moveX: [20, -30, 40, -20, 30, -40, 25, -15][i]
    }));

    const circles = Array.from({ length: 6 }, (_, i) => ({
      left: (10 + i * 15) + '%',
      top: [25, 45, 65, 35, 75, 55][i] + '%',
      rotation: i * 60,
      duration: [15, 18, 20, 16, 22, 19][i]
    }));

    setAnimationData({ bubbles, circles });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 overflow-hidden">
      {/* Animated background elements */}
      {animationData && (
        <div className="absolute inset-0">
          {/* Floating bubbles */}
          {animationData.bubbles.map((bubble: any, i: number) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute w-8 h-8 bg-white/20 rounded-full"
              style={{
                left: bubble.left,
                top: bubble.top,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, bubble.moveX, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Floating rainbow circles */}
          {animationData.circles.map((circle: any, i: number) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute w-16 h-16 rounded-full"
              style={{
                background: `conic-gradient(from ${circle.rotation}deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #ff6b6b)`,
                left: circle.left,
                top: circle.top,
                opacity: 0.1,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Animals */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-16 text-6xl sm:text-8xl cursor-pointer"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          whileHover={{ scale: 1.3, rotate: 20 }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🐻
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 text-5xl sm:text-7xl cursor-pointer"
          animate={{ 
            y: [0, 20, 0],
            x: [0, 15, 0],
            rotate: [0, -10, 10, 0],
          }}
          whileHover={{ scale: 1.3, rotate: -20 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          🦊
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-7xl sm:text-9xl cursor-pointer"
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, -20, 20, 0],
            scale: [1, 1.2, 1],
          }}
          whileHover={{ scale: 1.4, rotate: 30 }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        >
          🐰
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-16 text-6xl sm:text-8xl cursor-pointer"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          whileHover={{ scale: 1.3, rotate: -25 }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
        >
          🐯
        </motion.div>

        {/* Floating stars and sparkles */}
        <motion.div
          className="absolute top-16 right-1/4 text-3xl sm:text-4xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⭐
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 left-1/4 text-2xl sm:text-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 text-2xl sm:text-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, -180, -360],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        >
          🌟
        </motion.div>

        {/* Rainbow */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl sm:text-6xl"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌈
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-16 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black text-white mb-4 sm:mb-6 leading-tight"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)", 
                  "0 0 40px rgba(255,255,255,0.8)", 
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌈 Добро пожаловать в
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent font-black relative"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                ЦЕНТР "ГАРМОНИЯ"
                
                {/* Sparkle effects around title */}
                <motion.div
                  className="absolute -top-2 -right-2 text-3xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-2xl"
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  🌟
                </motion.div>
              </motion.div>
              
              <motion.div
                className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 font-bold"
                animate={{ 
                  y: [0, 5, 0],
                  color: ["#ffffff", "#fde68a", "#ffffff"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                🎨 Развиваем детей с любовью! 💝
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div 
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/95 mb-8 sm:mb-12 font-medium max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.p
              className="mb-3"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎯 Делаем развитие детей интересным и продуктивным!
            </motion.p>
            <motion.p 
              className="hidden sm:block mb-3"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              👨‍👩‍👧‍👦 Пока дети развиваются - родители отдыхают с пользой!
            </motion.p>
            <motion.p
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              ✨ Растим счастливых и гармоничных детей вместе!
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mb-16"
          >
            <motion.button
              onClick={onLoginClick}
              className="relative bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 text-white 
                       px-6 xs:px-8 sm:px-12 py-4 xs:py-5 sm:py-6 rounded-full 
                       text-lg xs:text-xl sm:text-2xl font-black 
                       shadow-2xl border-4 border-white/30 backdrop-blur-sm overflow-hidden
                       min-h-[60px] min-w-[240px] touch-manipulation"
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -1, 1, 0],
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              <motion.span
                className="relative z-10"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)", 
                    "0 0 20px rgba(255,255,255,0.8)", 
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Записаться на занятия! 🎉
              </motion.span>
              
              {/* Button sparkles */}
              <motion.div
                className="absolute top-2 right-4 text-lg"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-4 text-sm"
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 0.3,
                }}
              >
                💫
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { icon: "💝", number: "500+", text: "Счастливых детей", color: "from-pink-400 to-red-400" },
              { icon: "👥", number: "3-6", text: "Детей в группе", color: "from-blue-400 to-cyan-400" },
              { icon: "⭐", number: "5", text: "Лет заботы", color: "from-yellow-400 to-orange-400" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${stat.color} bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                transition={{ duration: 0.3 }}
                animate={{
                  y: [0, -5, 0],
                }}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <motion.div
                  className="text-4xl sm:text-5xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div 
                  className="text-2xl sm:text-3xl font-black text-white mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-sm sm:text-base text-white/90 font-bold leading-tight">
                  {stat.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}