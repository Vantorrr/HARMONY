'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
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
    let unsubscribe: (() => void) | null = null;

    const toCard = (arr: any[]): TeacherCardProps[] =>
      arr.map(t => ({
        name: t.name,
        photo: t.photo || '/images/logo/logo.png',
        subtitle: t.subtitle || 'Преподаватель'
      }));

    const loadFromLocal = () => {
      try {
        const saved = localStorage.getItem('harmony_teachers');
        if (saved) {
          const parsed = JSON.parse(saved) as any[];
          setTeachers(toCard(parsed));
        } else {
          setTeachers([]);
        }
      } catch {
        setTeachers([]);
      }
    };

    const init = async () => {
      setLoading(true);
      // Подписываемся на Firestore; если пусто — используем локальный кэш один раз
      try {
        unsubscribe = onSnapshot(collection(db, 'teachers'), (snap) => {
          const cloud = snap.docs.map(d => d.data());
          if (cloud.length > 0) {
            const list = toCard(cloud as any[]);
            setTeachers(list);
            // синхронизируем локальный кэш
            localStorage.setItem('harmony_teachers', JSON.stringify(cloud));
          } else {
            loadFromLocal();
          }
          setLoading(false);
        }, (err) => {
          console.warn('Firestore onSnapshot error:', err);
          loadFromLocal();
          setLoading(false);
        });

        // Однократно проверяем наличие в облаке, если подписка задерживается
        const firstSnap = await getDocs(collection(db, 'teachers'));
        if (firstSnap.empty) {
          loadFromLocal();
          setLoading(false);
        }
      } catch (e) {
        loadFromLocal();
        setLoading(false);
      }
    };

    init();

    // Слушаем изменения localStorage (синхронизация между вкладками)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'harmony_teachers') {
        loadFromLocal();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
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


