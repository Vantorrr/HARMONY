'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function MobileModal({ isOpen, onClose, title, children, className = '' }: MobileModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ 
            y: '100%',
            scale: 0.95,
            opacity: 0 
          }}
          animate={{ 
            y: 0,
            scale: 1,
            opacity: 1 
          }}
          exit={{ 
            y: '100%',
            scale: 0.95,
            opacity: 0 
          }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.3
          }}
          className={`
            bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md sm:w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h3>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}