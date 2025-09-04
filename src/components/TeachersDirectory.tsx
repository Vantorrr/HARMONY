'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
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
  const [teachers, setTeachers] = useState<TeacherCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Сначала проверяем localStorage (быстро)
    const loadLocal = () => {
      try {
        const saved = localStorage.getItem('harmony_teachers');
        if (saved) {
          const parsed = JSON.parse(saved) as any[];
          const list = parsed.map(t => ({ 
            name: t.name, 
            photo: t.photo || '/images/logo/logo.png', 
            subtitle: t.subtitle || 'Преподаватель' 
          }));
          setTeachers(list);
          setLoading(false);
          return list.length > 0;
        }
      } catch {}
      return false;
    };

    // Загружаем локальные данные сразу
    const hasLocal = loadLocal();

    // Затем пробуем Firestore (в фоне)
    try {
      const unsub = onSnapshot(collection(db, 'teachers'), (snap) => {
        const list: TeacherCardProps[] = snap.docs.map(d => {
          const data = d.data() as any;
          return {
            name: data.name || 'Без имени',
            photo: data.photo || '/images/logo/logo.png',
            subtitle: data.subtitle || 'Преподаватель'
          };
        });
        setTeachers(list);
        setLoading(false);
      }, (err) => {
        console.warn('Teachers Firestore failed:', err);
        if (!hasLocal) {
          setTeachers([]);
        }
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      console.warn('Firestore init failed:', e);
      if (!hasLocal) {
        setTeachers([]);
      }
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Преподаватели</h2>
      <p className="text-gray-600 mb-6">Скоро здесь появятся реальные фото и описания. Заполните их в админ‑панели.</p>

      {loading ? (
        <div className="text-gray-500 text-sm bg-white border border-gray-200 rounded-xl p-4">
          Загрузка преподавателей...
        </div>
      ) : teachers.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {teachers.map((t, idx) => (
            <TeacherCard key={idx} {...t} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm bg-white border border-gray-200 rounded-xl p-4">
          Преподаватели ещё не добавлены. Добавьте их в админ‑панели, и они появятся здесь автоматически.
        </div>
      )}
    </div>
  );
}


