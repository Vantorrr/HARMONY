// Общие данные программ для детского центра развития "Гармония"
export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'kids-early' | 'kids-school' | 'kids-creative' | 'kids-sports' | 'parent-massage' | 'parent-yoga';
  price: number;
  originalPrice?: number;
  duration: number; // дни
  sessions: number;
  description: string;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  discountPercent: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'kids-razvivashki',
    name: '🧸 Развивашки (2-4 года)',
    type: 'kids-early',
    price: 3200,
    duration: 30,
    sessions: 8,
    description: 'Первые шаги в мир знаний и творчества!',
    features: [
      '🔍 Сенсорное развитие',
      '✋ Мелкая моторика',
      '🎨 Первые поделки',
      '🏖️ Игры с песком',
      '🎵 Музыкальные занятия'
    ],
    isActive: true,
    isPopular: true,
    discountPercent: 0,
    createdAt: '2024-06-01',
    updatedAt: '2024-07-15',
    createdBy: 'admin'
  },
  {
    id: 'kids-school-prep',
    name: '🎒 Подготовка к школе (5-7 лет)',
    type: 'kids-school',
    price: 4500,
    originalPrice: 5200,
    duration: 30,
    sessions: 12,
    description: 'Готовим к школе с радостью и уверенностью!',
    features: [
      '📖 Обучение чтению',
      '🔢 Математика для малышей',
      '✍️ Письмо и каллиграфия',
      '🧩 Логическое мышление',
      '👫 Социальные навыки'
    ],
    isActive: true,
    isPopular: true,
    discountPercent: 13,
    createdAt: '2024-06-15',
    updatedAt: '2024-08-01',
    createdBy: 'admin'
  },
  {
    id: 'kids-creative',
    name: '🎨 Творческая мастерская',
    type: 'kids-creative',
    price: 3800,
    duration: 30,
    sessions: 10,
    description: 'Раскрываем творческий потенциал каждого ребенка!',
    features: [
      '🖌️ Рисование и живопись',
      '🏺 Лепка из глины',
      '✂️ Аппликация',
      '🍃 Поделки из природных материалов',
      '🖼️ Выставки работ'
    ],
    isActive: true,
    isPopular: false,
    discountPercent: 0,
    createdAt: '2024-06-10',
    updatedAt: '2024-08-05',
    createdBy: 'admin'
  },
  {
    id: 'kids-sports',
    name: '⚽ Спортивные занятия',
    type: 'kids-sports',
    price: 4200,
    duration: 30,
    sessions: 12,
    description: 'Здоровое тело - здоровый дух!',
    features: [
      '🏃 Общая физическая подготовка',
      '🤝 Командные игры',
      '🤸 Гимнастика',
      '💃 Танцы',
      '⚖️ Развитие координации'
    ],
    isActive: true,
    isPopular: false,
    discountPercent: 0,
    createdAt: '2024-06-01',
    updatedAt: '2024-07-20',
    createdBy: 'admin'
  },
  {
    id: 'parent-massage',
    name: '🧘‍♀️ Массаж для родителей',
    type: 'parent-massage',
    price: 4500,
    duration: 45,
    sessions: 6,
    description: 'Пока дети развиваются - родители отдыхают!',
    features: [
      '💆‍♀️ Расслабляющий массаж',
      '😌 Снятие стресса',
      '🌸 Ароматерапия',
      '🕯️ Уютная атмосфера',
      '⏰ Время только для себя'
    ],
    isActive: true,
    isPopular: false,
    discountPercent: 0,
    createdAt: '2024-06-20',
    updatedAt: '2024-07-25',
    createdBy: 'admin'
  },
  {
    id: 'parent-yoga',
    name: '🧘 Йога для мам',
    type: 'parent-yoga',
    price: 5200,
    duration: 60,
    sessions: 8,
    description: 'Восстановление сил и гармонии',
    features: [
      '🕉️ Хатха-йога',
      '🫁 Дыхательные практики',
      '🧠 Медитация',
      '🤸‍♀️ Растяжка',
      '😴 Релаксация'
    ],
    isActive: true,
    isPopular: false,
    discountPercent: 0,
    createdAt: '2024-06-10',
    updatedAt: '2024-08-05',
    createdBy: 'admin'
  }
];

// Утилитарные функции
export const getActiveSubscriptions = () => subscriptionPlans.filter(plan => plan.isActive);
export const getPopularSubscriptions = () => subscriptionPlans.filter(plan => plan.isPopular);
export const getSubscriptionById = (id: string) => subscriptionPlans.find(plan => plan.id === id);
export const getSubscriptionsByType = (type: string) => subscriptionPlans.filter(plan => plan.type === type);