'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  // Генерируем анимационные данные только на клиенте
  useEffect(() => {
    // Фиксированные данные для анимаций чтобы избежать hydration error
    const bubbles = Array.from({ length: 8 }, (_, i) => ({
      left: [15, 35, 60, 80, 20, 45, 70, 90][i] + '%',
      top: [20, 40, 70, 30, 80, 15, 55, 25][i] + '%',
      delay: i * 0.8,
      duration: [6, 7, 8, 6.5, 7.5, 8.5, 7, 6][i],
      moveX: [10, -15, 20, -10, 15, -20, 12, -8][i]
    }));

    const stars = Array.from({ length: 6 }, (_, i) => ({
      left: (15 + i * 15) + '%',
      top: [35, 45, 55, 25, 65, 40][i] + '%',
      delay: i * 1.2,
      duration: [8, 9, 10, 8.5, 9.5, 8][i],
      emoji: ['⭐', '✨', '🌟'][i % 3]
    }));

    const circles = Array.from({ length: 3 }, (_, i) => ({
      left: (25 + i * 25) + '%',
      top: [45, 35, 55][i] + '%',
      duration: [20, 25, 30][i],
      rotation: i * 120
    }));

    setAnimationData({ bubbles, stars, circles });
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    // Показываем логотип через 300ms
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 300);

    // Анимация прогресса с фиксированными шагами
    let progressStep = 0;
    const progressSteps = [3, 5, 4, 6, 7, 4, 8, 5, 6, 9]; // Фиксированные шаги
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            onLoadingComplete();
          }, 1200);
          return 100;
        }
        const step = progressSteps[progressStep % progressSteps.length];
        progressStep++;
        return prev + step;
      });
    }, 350);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressTimer);
    };
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
  className="fixed inset-0 z-50 flex items-center justify-center bg-teal-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.05,
          transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Animated background elements */}
        {animationData && (
          <div className="absolute inset-0">
            {/* Floating bubbles */}
            {animationData.bubbles.map((bubble: any, i: number) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute w-3 h-3 bg-white/15 rounded-full"
                style={{
                  left: bubble.left,
                  top: bubble.top,
                }}
                animate={{
                  y: [0, -150, 0],
                  x: [0, bubble.moveX, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: bubble.duration,
                  repeat: Infinity,
                  delay: bubble.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}

            {/* Floating stars */}
            {animationData.stars.map((star: any, i: number) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-xl"
                style={{
                  left: star.left,
                  top: star.top,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {star.emoji}
              </motion.div>
            ))}

            {/* Rainbow circles */}
            {animationData.circles.map((circle: any, i: number) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute w-24 h-24 rounded-full opacity-5"
                style={{
                  background: `conic-gradient(from ${circle.rotation}deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #ff6b6b)`,
                  left: circle.left,
                  top: circle.top,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
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

        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -5, 0],
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: 0.3,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                className="mb-8"
              >
                {/* Client logo */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
                  <div className="w-full h-full bg-white/95 rounded-3xl shadow-2xl flex items-center justify-center backdrop-blur-sm border-4 border-white/50 p-4">
                    <Image
                      src="/images/logo/logo.png"
                      alt="Логотип семейного центра Гармония"
                      width={180}
                      height={180}
                      className="object-contain"
                      priority
                    />
                  </div>
                  
                  {/* Sparkle effects around logo */}
                  <motion.div
                    className="absolute -top-3 -right-3 text-xl"
                    animate={{ 
                      rotate: [0, 180, 360],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 -left-3 text-lg"
                    animate={{ 
                      rotate: [360, 180, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      delay: 1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    🌟
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4"
                  animate={{ 
                    textShadow: [
                      "0 0 15px rgba(255,255,255,0.3)", 
                      "0 0 25px rgba(255,255,255,0.5)", 
                      "0 0 15px rgba(255,255,255,0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  Центр "Гармония"
                </motion.h1>

                <motion.p 
                  className="text-lg sm:text-xl text-white/90 font-medium"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: 1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  🎨 Развиваем детей с любовью 💝
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-64 sm:w-80 mx-auto">
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Загружаем волшебство...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              
              {/* Progress bar container */}
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Loading messages */}
            <motion.div
              className="text-white/70 text-sm"
              animate={{ 
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {progress < 30 && "🧸 Готовим игрушки..."}
              {progress >= 30 && progress < 60 && "🎨 Смешиваем краски..."}
              {progress >= 60 && progress < 90 && "✨ Добавляем волшебство..."}
              {progress >= 90 && "🎉 Почти готово!"}
            </motion.div>
          </div>

          {/* Floating cute elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 text-3xl"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              🐻
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4 text-2xl"
              animate={{ 
                y: [0, 6, 0],
                x: [0, 4, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                delay: 2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              🦊
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 left-1/3 text-2xl"
              animate={{ 
                y: [0, -6, 0],
                rotate: [0, -8, 8, 0],
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              🐰
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}