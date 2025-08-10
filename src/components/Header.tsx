'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  onLoginClick: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <nav className="bg-white fixed w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                <Image
                  src="/images/logo/logo.png"
                  alt="Логотип семейного центра Гармония"
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900">
                ГАРМОНИЯ
              </h1>
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="text-lg sm:text-xl"
              >
                ✨
              </motion.div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <motion.a 
              href="#features" 
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              🎨 Расписание
            </motion.a>
            <motion.a 
              href="#pricing" 
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              💰 Цены
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              📞 Контакты
            </motion.a>
            <motion.button 
              onClick={onLoginClick} 
              className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base font-bold transition-all duration-300 shadow hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Войти
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Login Button */}
            <motion.button 
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold 
                       shadow min-h-[44px] min-w-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀
            </motion.button>
            
            {/* Hamburger Menu */}
              <motion.button
              onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-white border border-gray-200 min-h-[44px] min-w-[44px] 
                       flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-pink-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-pink-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                <motion.button
                  onClick={() => handleLinkClick('#features')}
                  className="w-full text-left p-4 rounded-2xl bg-white 
                           border border-gray-200 hover:border-gray-300 transition-all duration-200
                           min-h-[60px] flex items-center justify-between touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎨</span>
                    <span className="font-bold text-lg text-gray-800">Расписание</span>
                  </div>
                  <span className="text-pink-500">→</span>
                </motion.button>

                <motion.button
                  onClick={() => handleLinkClick('#pricing')}
                  className="w-full text-left p-4 rounded-2xl bg-white 
                           border border-gray-200 hover:border-gray-300 transition-all duration-200
                           min-h-[60px] flex items-center justify-between touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <span className="font-bold text-lg text-gray-800">Цены</span>
                  </div>
                  <span className="text-blue-500">→</span>
                </motion.button>

                <motion.button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full text-left p-4 rounded-2xl bg-white 
                           border border-gray-200 hover:border-gray-300 transition-all duration-200
                           min-h-[60px] flex items-center justify-between touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📞</span>
                    <span className="font-bold text-lg text-gray-800">Контакты</span>
                  </div>
                  <span className="text-purple-500">→</span>
                </motion.button>

                {/* Mobile CTA Button */}
                <motion.button
                  onClick={() => {
                    onLoginClick();
                    closeMobileMenu();
                  }}
                  className="w-full p-4 rounded-2xl bg-blue-600 text-white font-bold text-lg
                           shadow hover:shadow-md transition-all duration-300
                           min-h-[60px] flex items-center justify-center touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">🚀</span>
                  Войти в личный кабинет
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}