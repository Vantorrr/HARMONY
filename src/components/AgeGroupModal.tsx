'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AgeGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupType: 'babies' | 'school' | 'adults';
}

export default function AgeGroupModal({ isOpen, onClose, groupType }: AgeGroupModalProps) {
  if (!isOpen) return null;

  const getBabiesContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-yellow-600 text-sm font-bold">1-3</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Занятия по раннему развитию</h2>
        <p className="text-gray-600">для детей от 1 года</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
        <p className="text-gray-700 leading-relaxed">
          Наши занятия направлены на гармоничное развитие малышей через игровую деятельность с учетом возрастных особенностей.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Основные направления:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🧸</span>
            <div>
              <p className="font-medium text-gray-800">Сенсорное развитие</p>
              <p className="text-sm text-gray-600">знакомство с формами, цветами, текстурами (мягкое/твердое, большое/маленькое)</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎵</span>
            <div>
              <p className="font-medium text-gray-800">Музыкально-ритмические игры</p>
              <p className="text-sm text-gray-600">развитие слуха, чувства ритма, простые танцы и потешки, песни</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏃</span>
            <div>
              <p className="font-medium text-gray-800">Крупная и мелкая моторика</p>
              <p className="text-sm text-gray-600">ползание, ходьба с препятствиями, игры с крупами, шнуровками, сортерами</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🗣</span>
            <div>
              <p className="font-medium text-gray-800">Речевое развитие</p>
              <p className="text-sm text-gray-600">стимулирование лепета, первые слова, звукоподражание, чтение коротких стихов, потешек</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">❤️</span>
            <div>
              <p className="font-medium text-gray-800">Эмоциональный и социальный контакт</p>
              <p className="text-sm text-gray-600">взаимодействие с другими детьми, реакция на просьбы, совместные игры</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-medium text-gray-800">Творческое развитие</p>
              <p className="text-sm text-gray-600">рисование, лепка, аппликации и многое другое</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Методики:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Элементы Монтессори</p>
              <p className="text-xs text-gray-600">свобода выбора в безопасной среде</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Игры по системе Железновых</p>
              <p className="text-xs text-gray-600">музыкально-двигательные упражнения</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Сказкотерапия и пальчиковые игры</p>
              <p className="text-xs text-gray-600">для развития речи и воображения</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Творчество</p>
              <p className="text-xs text-gray-600">рисование ладошками, лепка из мягкого теста, аппликации</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border border-yellow-200">
        <p className="text-gray-700 text-center leading-relaxed">
          Занятия проходят в доброжелательной атмосфере, где каждый малыш развивается в своем темпе вместе с мамой или близким взрослым. 🌟
        </p>
      </div>
    </div>
  );

  const getSchoolContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-blue-600 text-sm font-bold">7-16</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Подготовка к школе</h2>
        <p className="text-gray-600">для детей 7-16 лет</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p className="text-gray-700 leading-relaxed">
          Наши занятия направлены на комплексную подготовку детей к школе в соответствии с программами школ «Школа России» и «Школа XXI века».
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Основные направления:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📚</span>
            <div>
              <p className="font-medium text-gray-800">Обучение грамоте</p>
              <p className="text-sm text-gray-600">развитие фонематического слуха, знакомство с буквами и звуками, чтение и письмо</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">✏️</span>
            <div>
              <p className="font-medium text-gray-800">Математика</p>
              <p className="text-sm text-gray-600">счет в пределах 10, простые задачи, геометрические фигуры, величины и их измерения, логическое мышление</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🧠</span>
            <div>
              <p className="font-medium text-gray-800">Развитие речи</p>
              <p className="text-sm text-gray-600">обогащение словарного запаса, составление рассказов, ответы на вопросы</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-medium text-gray-800">Мелкая моторика</p>
              <p className="text-sm text-gray-600">подготовка руки к письму (штриховка, обводка, работа с прописями)</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🔍</span>
            <div>
              <p className="font-medium text-gray-800">Познавательное развитие</p>
              <p className="text-sm text-gray-600">окружающий мир, времена года, животные и растения</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">👫</span>
            <div>
              <p className="font-medium text-gray-800">Социально-коммуникативные навыки</p>
              <p className="text-sm text-gray-600">умение работать в группе, следовать правилам, развивать усидчивость</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p className="text-gray-700 text-center font-medium">
          Занятия проходят по программе Л.Петерсон и К.Шевелёв
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Методики:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Игровой подход</p>
              <p className="text-xs text-gray-600">для поддержания интереса</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Интерактивные задания</p>
              <p className="text-xs text-gray-600">работа с карточками, пазлами, дидактическими играми</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Элементы ТРИЗ</p>
              <p className="text-xs text-gray-600">развитие творческого и критического мышления</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600">✔</span>
            <div>
              <p className="font-medium text-gray-800">Системность и последовательность</p>
              <p className="text-xs text-gray-600">в соответствии с возрастными нормами</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl border border-blue-200">
        <p className="text-gray-700 text-center leading-relaxed">
          Занятия проходят в увлекательной форме, что помогает детям легко адаптироваться к школьной программе. 🎯
        </p>
      </div>
    </div>
  );

  const getAdultsContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-red-600 text-xs font-bold">18+</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Занятия по шахматам</h2>
        <p className="text-gray-600">для детей и взрослых</p>
      </div>

      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
        <p className="text-gray-700 leading-relaxed">
          Наши уроки шахмат — это увлекательное развитие стратегического мышления, логики и концентрации в дружеской атмосфере для игроков любого уровня.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Что вы освоите:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">♟️</span>
            <div>
              <p className="font-medium text-gray-800">Основы игры</p>
              <p className="text-sm text-gray-600">ходы фигур, шахматная нотация, правила и этикет</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🧠</span>
            <div>
              <p className="font-medium text-gray-800">Тактика и стратегия</p>
              <p className="text-sm text-gray-600">комбинации, ловушки, атака и защита</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏆</span>
            <div>
              <p className="font-medium text-gray-800">Классические партии</p>
              <p className="text-sm text-gray-600">разбор партий великих гроссмейстеров</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">⏱️</span>
            <div>
              <p className="font-medium text-gray-800">Игра на время</p>
              <p className="text-sm text-gray-600">блиц и рапид для развития скорости мышления</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Формат занятий:
        </h3>
        
        <div className="space-y-4">
          {/* Для детей */}
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-gray-800 mb-3 text-center">👶 Для детей:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Игровое обучение через сказки и задачи</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Турниры с призами и рейтинговой системой</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Развитие памяти и умения принимать решения</p>
              </div>
            </div>
          </div>

          {/* Для взрослых */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-800 mb-3 text-center">🧑‍💼 Для взрослых:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Углублённое изучение дебютов и эндшпилей</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Анализ ошибок и персональные рекомендации</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <p className="text-sm text-gray-700">Тренировочные партии с разбором ходов</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-xl border border-red-200">
        <p className="text-gray-700 text-center leading-relaxed font-medium">
          Играйте с умом и удовольствием! 🌟
        </p>
      </div>
    </div>
  );

  const getContent = () => {
    switch (groupType) {
      case 'babies':
        return getBabiesContent();
      case 'school':
        return getSchoolContent();
      case 'adults':
        return getAdultsContent();
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-end rounded-t-2xl">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {getContent()}
        </div>
      </motion.div>
    </div>
  );
}