'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AgeGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupType: 'babies' | 'school' | 'adults' | 'complex' | 'speech' | 'math' | 'massage' | 'afterschool' | 'workshop' | 'drawing' | 'pottery';
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

  const getComplexContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-green-600 text-xs font-bold">2,5-4</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Комплексные занятия</h2>
        <p className="text-gray-600">для малышей 2,5–4 лет</p>
      </div>

      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <p className="text-gray-700 leading-relaxed">
          Комплексное занятие для малышей 2,5–4 лет. Это комплекс занятий, которое включает следующие направления и помогает развить все ключевые навыки в игровой форме.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Что включает программа:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📚</span>
            <div>
              <p className="font-medium text-gray-800">Сказкотерапия</p>
              <p className="text-sm text-gray-600">погружаемся в добрую сказку, развиваем речь и воображение</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-medium text-gray-800">Творчество</p>
              <p className="text-sm text-gray-600">лепим, рисуем и создаём маленькие шедевры</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎵</span>
            <div>
              <p className="font-medium text-gray-800">Музыка и ритм</p>
              <p className="text-sm text-gray-600">танцуем, играем на инструментах, учимся слушать мелодии</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏃</span>
            <div>
              <p className="font-medium text-gray-800">Спорт и движение</p>
              <p className="text-sm text-gray-600">прыгаем, бегаем, тренируем ловкость и координацию</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🌍</span>
            <div>
              <p className="font-medium text-gray-800">Окружающий мир</p>
              <p className="text-sm text-gray-600">знакомимся с природой, животными, учимся заботиться о мире</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🔢</span>
            <div>
              <p className="font-medium text-gray-800">Математика и логика</p>
              <p className="text-sm text-gray-600">играем с цифрами, формами и размерами</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">✋</span>
            <div>
              <p className="font-medium text-gray-800">Мелкая и крупная моторика</p>
              <p className="text-sm text-gray-600">развиваем ручки и тело через весёлые упражнения</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-green-600 mr-2">✨</span>
          Почему стоит попробовать?
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Комплексное развитие</strong> – все ключевые навыки в одном занятии</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Игровой формат</strong> – малыши учатся, даже не замечая этого!</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Смена активности</strong> – ребёнок не устаёт и остаётся вовлечённым</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Социализация</strong> – учимся общаться и играть в дружной компании</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getSpeechContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-purple-600 text-xs font-bold">3+</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Логопедические занятия</h2>
        <p className="text-gray-600">для детей и взрослых</p>
      </div>

      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
        <p className="text-gray-700 leading-relaxed">
          Логопедические занятия для детей и взрослых с индивидуальным подходом и учётом возрастных особенностей.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Направления работы:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🗣️</span>
            <div>
              <p className="font-medium text-gray-800">Исправление звукопроизношения</p>
              <p className="text-sm text-gray-600">коррекция звуков Р, Л, Ш, С, Ц и других</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📚</span>
            <div>
              <p className="font-medium text-gray-800">Развитие речи</p>
              <p className="text-sm text-gray-600">расширение словаря, грамматика, связная речь</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📖</span>
            <div>
              <p className="font-medium text-gray-800">Коррекция дислексии и дисграфии</p>
              <p className="text-sm text-gray-600">помощь при трудностях с чтением и письмом</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">😮</span>
            <div>
              <p className="font-medium text-gray-800">Артикуляционная гимнастика</p>
              <p className="text-sm text-gray-600">укрепляем речевой аппарат</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🌊</span>
            <div>
              <p className="font-medium text-gray-800">Работа над плавностью речи</p>
              <p className="text-sm text-gray-600">при заикании, быстром темпе речи</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎓</span>
            <div>
              <p className="font-medium text-gray-800">Подготовка к школе</p>
              <p className="text-sm text-gray-600">развитие фонематического слуха, обучение грамоте</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-purple-600 mr-2">📌</span>
          Формат занятий
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-bold mt-1">👶</span>
            <p className="text-gray-700"><strong>Дети от 3 лет</strong> – игровая форма, развитие через сказки и упражнения</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-bold mt-1">👩‍🎓</span>
            <p className="text-gray-700"><strong>Школьники</strong> – подготовка к урокам, исправление нарушений</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 font-bold mt-1">👨‍💼</span>
            <p className="text-gray-700"><strong>Взрослые</strong> – индивидуальная работа с учетом особенностей</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getMathContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-orange-600 text-xs font-bold">1-9</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Занятия по математике</h2>
        <p className="text-gray-600">для детей и подростков</p>
      </div>

      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
        <p className="text-gray-700 leading-relaxed">
          Занятия по математике для детей и подростков с индивидуальным подходом и современными методиками обучения.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Программы обучения:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎯</span>
            <div>
              <p className="font-medium text-gray-800">Начальная школа (1–4 класс)</p>
              <p className="text-sm text-gray-600">увлекательные уроки в игровой форме, развитие логики и уверенного счёта</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📊</span>
            <div>
              <p className="font-medium text-gray-800">Подростки (5–8 класс)</p>
              <p className="text-sm text-gray-600">понятное объяснение сложных тем, помощь в усвоении школьной программы</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏆</span>
            <div>
              <p className="font-medium text-gray-800">ОГЭ (9 класс)</p>
              <p className="text-sm text-gray-600">полный разбор экзамена, стратегии решения задач, регулярные пробники</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-orange-600 mr-2">✨</span>
          Почему выбирают нас?
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Опытный педагог</strong> – индивидуальный подход к каждому ребёнку, умение объяснять просто и интересно</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Гибкий формат</strong> – занятия в удобное время</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Реальные результаты</strong> – повышение успеваемости и уверенности в своих силах</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 font-bold mt-1">✅</span>
            <p className="text-gray-700"><strong>Подготовка без стресса</strong> – дружелюбная атмосфера и поддержка на каждом этапе</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getMassageContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-teal-600 text-xs font-bold">ALL</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Профессиональный массаж</h2>
        <p className="text-gray-600">для детей и взрослых</p>
      </div>

      <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
        <p className="text-gray-700 leading-relaxed">
          Профессиональный массаж для детей и взрослых с индивидуальным подходом от опытных массажистов.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
          Для детей:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">💪</span>
            <div>
              <p className="font-medium text-gray-800">Физическое развитие</p>
              <p className="text-sm text-gray-600">способствует правильному физическому развитию</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🛡️</span>
            <div>
              <p className="font-medium text-gray-800">Укрепление иммунитета</p>
              <p className="text-sm text-gray-600">укрепляет иммунитет и мышечный корсет</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🩺</span>
            <div>
              <p className="font-medium text-gray-800">Коррекция нарушений</p>
              <p className="text-sm text-gray-600">помогает при неврологических и ортопедических нарушениях</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">😴</span>
            <div>
              <p className="font-medium text-gray-800">Улучшение самочувствия</p>
              <p className="text-sm text-gray-600">улучшает сон и пищеварение</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
          Для взрослых:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">😌</span>
            <div>
              <p className="font-medium text-gray-800">Снятие напряжения</p>
              <p className="text-sm text-gray-600">снимает мышечное напряжение и стресс</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🦴</span>
            <div>
              <p className="font-medium text-gray-800">Устранение болей</p>
              <p className="text-sm text-gray-600">устраняет боли в спине и суставах</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏃</span>
            <div>
              <p className="font-medium text-gray-800">Восстановление</p>
              <p className="text-sm text-gray-600">восстанавливает после физических нагрузок</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">✨</span>
            <div>
              <p className="font-medium text-gray-800">Общее самочувствие</p>
              <p className="text-sm text-gray-600">улучшает общее самочувствие и тонус организма</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-teal-600 mr-2">👐</span>
          Наши специалисты
        </h3>
        <p className="text-gray-700 leading-relaxed">
          У нас работают опытные массажисты, которые помогут каждому снять напряжение и восстановить силы. Индивидуальный подход к каждому клиенту.
        </p>
      </div>
    </div>
  );

  const getAfterschoolContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-yellow-400 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-lime-600 text-xs font-bold">1-6</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Группы продлённого дня</h2>
        <p className="text-gray-600">с выполнением домашних заданий</p>
      </div>

      <div className="bg-lime-50 p-4 rounded-xl border border-lime-200">
        <p className="text-gray-700 leading-relaxed text-center font-medium">
          <em>Помогаем детям учиться легко и с удовольствием!</em>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
          Что мы предлагаем:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">📚</span>
            <div>
              <p className="font-medium text-gray-800">Профессиональная помощь с домашними заданиями</p>
              <p className="text-sm text-gray-600">для учеников 1-6 классов</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">👩‍🏫</span>
            <div>
              <p className="font-medium text-gray-800">Контроль выполнения уроков</p>
              <p className="text-sm text-gray-600">опытными педагогами</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">👤</span>
            <div>
              <p className="font-medium text-gray-800">Индивидуальный подход</p>
              <p className="text-sm text-gray-600">к каждому ребенку</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏡</span>
            <div>
              <p className="font-medium text-gray-800">Комфортная атмосфера</p>
              <p className="text-sm text-gray-600">для продуктивной работы</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
          Наши преимущества:
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-lime-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Избавляем родителей от "домашки" после работы</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lime-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Прививаем навыки самостоятельной работы</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lime-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Поддерживаем интерес к учебе</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lime-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Гибкий график посещения</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-lime-50 to-yellow-50 p-4 rounded-xl border border-lime-200">
        <div className="flex items-center justify-center mb-3">
          <span className="text-2xl mr-2">🍏</span>
          <h3 className="text-lg font-bold text-gray-800">Включен перекус и вода</h3>
        </div>
        <p className="text-gray-700 text-center font-medium">
          <em>С нами домашние задания перестают быть стрессом!</em>
        </p>
        <p className="text-gray-700 text-center mt-2">
          Запишите ребенка и подарите ему больше свободного времени вечером! 📚✨
        </p>
      </div>
    </div>
  );

  const getWorkshopContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-slate-600 text-xs font-bold">♂️</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Мастерская для мальчиков</h2>
        <p className="text-gray-600">развиваем навыки и уверенность в себе!</p>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <p className="text-gray-700 leading-relaxed text-center font-medium">
          <em>Практические занятия, где мальчики учатся работать руками и мыслить технически.</em>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
          Чему научим:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🔧</span>
            <div>
              <p className="font-medium text-gray-800">Работа с инструментами</p>
              <p className="text-sm text-gray-600">отвертка и другие базовые инструменты</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🪵</span>
            <div>
              <p className="font-medium text-gray-800">Основы столярного дела</p>
              <p className="text-sm text-gray-600">проекты из дерева своими руками</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🔩</span>
            <div>
              <p className="font-medium text-gray-800">Простые ремонтные навыки</p>
              <p className="text-sm text-gray-600">починить, собрать, отремонтировать</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">⚡</span>
            <div>
              <p className="font-medium text-gray-800">Основы электротехники и моделирования</p>
              <p className="text-sm text-gray-600">безопасное изучение электричества</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-medium text-gray-800">Творческий подход</p>
              <p className="text-sm text-gray-600">к решению бытовых задач</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
          Формат занятий:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">👤</span>
            <div>
              <p className="font-medium text-gray-800">Индивидуальный подход</p>
              <p className="text-sm text-gray-600">к каждому ребенку</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🛡️</span>
            <div>
              <p className="font-medium text-gray-800">Безопасность и поддержка</p>
              <p className="text-sm text-gray-600">опытного наставника</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🏠</span>
            <div>
              <p className="font-medium text-gray-800">Реальные проекты</p>
              <p className="text-sm text-gray-600">которые можно забрать домой</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-slate-600 mr-2">🎯</span>
          Почему стоит записаться?
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-slate-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Развиваем самостоятельность и логическое мышление</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-slate-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Учим полезным в жизни навыкам</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-slate-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Даем возможность творить и видеть результат</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-slate-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Создаем дружескую атмосферу без стресса</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getDrawingContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-pink-600 text-xs font-bold">ART</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Занятия по рисованию</h2>
        <p className="text-gray-600">для детей и взрослых</p>
      </div>

      <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
        <p className="text-gray-700 leading-relaxed">
          Наши уроки рисования раскрывают творческий потенциал, развивают художественное видение и дарят радость созидания в уютной вдохновляющей атмосфере.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
          Для детей:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-medium text-gray-800">Основы живописи и графики</p>
              <p className="text-sm text-gray-600">акварель, гуашь, пастель, карандаш</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">✏️</span>
            <div>
              <p className="font-medium text-gray-800">Веселые техники</p>
              <p className="text-sm text-gray-600">пальчиковая живопись, монотипия, рисование мыльными пузырями</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🖌️</span>
            <div>
              <p className="font-medium text-gray-800">Развивающие занятия</p>
              <p className="text-sm text-gray-600">цветоведение, композиция, изучение форм и текстур</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🐻</span>
            <div>
              <p className="font-medium text-gray-800">Тематические уроки</p>
              <p className="text-sm text-gray-600">любимые персонажи, животные, природа</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
          Для взрослых:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🖼️</span>
            <div>
              <p className="font-medium text-gray-800">Академический рисунок</p>
              <p className="text-sm text-gray-600">пропорции, перспектива, светотень</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🌿</span>
            <div>
              <p className="font-medium text-gray-800">Скетчинг и зарисовки</p>
              <p className="text-sm text-gray-600">скетчбуки, городские пейзажи, ботаническая иллюстрация</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🖌️</span>
            <div>
              <p className="font-medium text-gray-800">Авторские техники</p>
              <p className="text-sm text-gray-600">акрил, масло, смешанные медиа</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎭</span>
            <div>
              <p className="font-medium text-gray-800">Арт-терапия</p>
              <p className="text-sm text-gray-600">раскрепощение через творчество</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
          Наши преимущества:
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-pink-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Индивидуальный подход к каждому ученику</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-pink-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Совмещение классических и современных методик</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-pink-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Подготовка к поступлению в художественные школы (для детей)</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-pink-600 font-bold mt-1">✔</span>
            <p className="text-gray-700">Уютная творческая атмосфера без критики</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-pink-600 mr-2">🎨</span>
          Формат занятий
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-pink-600">•</span>
            <p className="text-gray-700">Групповые и индивидуальные занятия</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-600">•</span>
            <p className="text-gray-700">Мастер-классы по разным техникам</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-600">•</span>
            <p className="text-gray-700">Пленэры (летом)</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-600">•</span>
            <p className="text-gray-700">Творческие выставки работ учеников</p>
          </div>
        </div>
        <p className="text-gray-700 text-center mt-4 font-medium">
          Развиваем креативность, терпение и художественный вкус через радость творчества! ✨
        </p>
      </div>
    </div>
  );

  const getPotteryContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-red-800 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="text-amber-700 text-xs font-bold">🏺</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Гончарное ремесло</h2>
        <p className="text-gray-600">для детей и взрослых</p>
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
        <p className="text-gray-700 leading-relaxed">
          Погрузитесь в мир древнего искусства, где глина оживает в ваших руках! Наши мастер-классы и курсы по керамике подарят неповторимый опыт ручной работы и творческого самовыражения.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
          Что вас ждет:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🌀</span>
            <div>
              <p className="font-medium text-gray-800">Работа на гончарном круге</p>
              <p className="text-sm text-gray-600">освоение базовых техник центровки, вытягивания и формовки сосудов</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">✋</span>
            <div>
              <p className="font-medium text-gray-800">Ручная лепка</p>
              <p className="text-sm text-gray-600">создание изделий без круга (игрушки, декоративные тарелки, скульптуры)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-medium text-gray-800">Декорирование</p>
              <p className="text-sm text-gray-600">роспись ангобами, глазурование, техника «sgraffito»</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl">🔥</span>
            <div>
              <p className="font-medium text-gray-800">Обжиг</p>
              <p className="text-sm text-gray-600">знакомство с процессом превращения глины в керамику</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center">
            <span className="text-amber-600 mr-2">👶</span>
            Для детей и подростков:
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Веселые поделки (зверушки, свистульки)</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Первые шаги на гончарном круге с инструктором</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Развитие мелкой моторики и пространственного мышления</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center">
            <span className="text-amber-600 mr-2">👨‍🎨</span>
            Для взрослых:
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Полный цикл создания керамики от эскиза до готового изделия</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Профессиональные техники работы с разными видами глин</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 mt-1">•</span>
              <p className="text-gray-700">Тематические мастер-классы (японская раку, керамическая флористика)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">🏺</span>
          Почему стоит попробовать:
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-1">✔</span>
            <p className="text-gray-700"><strong>Антистресс-терапия</strong> – работа с глиной успокаивает и медитирует</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-1">✔</span>
            <p className="text-gray-700"><strong>Уникальные handmade-изделия</strong> для дома или в подарок</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-1">✔</span>
            <p className="text-gray-700"><strong>Работа в уютной мастерской</strong> с профессиональным оборудованием</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-1">✔</span>
            <p className="text-gray-700"><strong>Группы для начинающих</strong> и продолжающих</p>
          </div>
        </div>
        <p className="text-gray-700 text-center mt-4 font-medium italic">
          Подарите себе магию превращения глины в искусство! Каждое занятие – это новая история, которую вы создаете своими руками.
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
      case 'complex':
        return getComplexContent();
      case 'speech':
        return getSpeechContent();
      case 'math':
        return getMathContent();
      case 'massage':
        return getMassageContent();
      case 'afterschool':
        return getAfterschoolContent();
      case 'workshop':
        return getWorkshopContent();
      case 'drawing':
        return getDrawingContent();
      case 'pottery':
        return getPotteryContent();
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