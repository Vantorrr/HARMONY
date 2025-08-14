'use client';

import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

interface TeacherCardProps {
  name: string;
  photo: string;
  subtitle?: string;
}

const TeacherCard = ({ name, photo, subtitle }: TeacherCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
  >
    <div className="relative w-full h-40 bg-gray-100">
      <Image src={photo} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900">{name}</h3>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  </motion.div>
);

export default function TeachersDirectory() {
  const [teachers, setTeachers] = useState<TeacherCardProps[] | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // сначала пробуем Firestore
        const snap = await getDocs(collection(db, 'teachers'));
        if (!snap.empty) {
          const list: TeacherCardProps[] = snap.docs.map(d => {
            const data = d.data() as any;
            return {
              name: data.name || 'Без имени',
              photo: data.photo || '/images/logo/logo.png',
              subtitle: data.subtitle || 'Преподаватель'
            };
          });
          setTeachers(list);
          return;
        }
      } catch (e) {
        console.warn('Teachers Firestore fetch failed, fallback to localStorage', e);
      }
      // fallback: localStorage или заглушки
      try {
        const saved = localStorage.getItem('harmony_teachers');
        if (saved) {
          const parsed = JSON.parse(saved) as any[];
          setTeachers(parsed.map(t => ({ name: t.name, photo: t.photo || '/images/logo/logo.png', subtitle: t.subtitle || 'Преподаватель' })));
          return;
        }
      } catch {}
      setTeachers([
        { name: 'Иван Петров', photo: '/images/logo/logo.png', subtitle: 'Преподаватель' },
        { name: 'Елена Волкова', photo: '/images/logo/logo.png', subtitle: 'Преподаватель' },
        { name: 'Мария Смирнова', photo: '/images/logo/logo.png', subtitle: 'Преподаватель' },
        { name: 'Дмитрий Новиков', photo: '/images/logo/logo.png', subtitle: 'Преподаватель' },
      ]);
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Преподаватели</h2>
      <p className="text-gray-600 mb-6">Скоро здесь появятся реальные фото и описания. Заполните их в админ‑панели.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(teachers || []).map((t, idx) => (
          <TeacherCard key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}


