'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TouchButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TouchButton({ 
  onClick, 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false 
}: TouchButtonProps) {
  
  const variants = {
    primary: 'bg-gradient-to-r from-pink-400 to-purple-500 text-white',
    secondary: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white',
    success: 'bg-gradient-to-r from-green-400 to-blue-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    danger: 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[56px]'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 
        border-2 border-white/20 backdrop-blur-sm
        min-w-[44px] touch-manipulation flex items-center justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={disabled ? {} : { 
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.button>
  );
}