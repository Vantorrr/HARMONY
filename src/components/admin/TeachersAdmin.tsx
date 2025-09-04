'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Upload } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

interface Teacher {
  id: string;
  name: string;
  photo: string; // data URL or path
  subtitle?: string;
}

const LOCAL_KEY = 'harmony_teachers';

export default function TeachersAdmin() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('Преподаватель');
  const [photo, setPhoto] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'teachers'));
        if (!snap.empty) {
          const list: Teacher[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
          setTeachers(list);
          return;
        }
      } catch (e) {
        // fallback to localStorage
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) {
          try { setTeachers(JSON.parse(saved)); } catch {}
        }
      }
    };
    load();
  }, []);

  const persistLocal = (list: Teacher[]) => {
    setTeachers(list);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  };

  const addTeacher = async () => {
    if (!name.trim()) {
      alert('Введите ФИО преподавателя');
      return;
    }
    setIsSaving(true);
    try {
      let photoUrl = photo;
      if (photo && photo.startsWith('data:')) {
        const storageRef = ref(storage, `teachers/${Date.now()}.jpg`);
        await uploadString(storageRef, photo, 'data_url');
        photoUrl = await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, 'teachers'), {
        name: name.trim(),
        subtitle: subtitle.trim(),
        photo: photoUrl || '/images/logo/logo.png'
      });
      const newTeacher = { id: docRef.id, name: name.trim(), subtitle: subtitle.trim(), photo: photoUrl || '/images/logo/logo.png' };
      const updatedList = [newTeacher, ...teachers];
      setTeachers(updatedList);
      // Дублируем в localStorage для быстрого доступа
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedList));
      alert('Преподаватель добавлен');
    } catch (e) {
      // fallback local
      const t: Teacher = { id: crypto.randomUUID(), name: name.trim(), subtitle: subtitle.trim(), photo: photo || '/images/logo/logo.png' };
      persistLocal([t, ...teachers]);
      alert('Сохранено локально (без Firestore). Проверьте настройки Firebase правил.');
    }
    setName(''); setSubtitle('Преподаватель'); setPhoto('');
    setIsSaving(false);
  };

  const removeTeacher = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'teachers', id));
      const updatedList = teachers.filter(t => t.id !== id);
      setTeachers(updatedList);
      // Синхронизируем localStorage
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedList));
    } catch (e) {
      persistLocal(teachers.filter(t => t.id !== id));
    }
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Преподаватели</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="ФИО" className="border rounded-lg px-3 py-2" />
          <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} placeholder="Подпись (напр. Преподаватель)" className="border rounded-lg px-3 py-2" />
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer">
            <Upload className="w-4 h-4" /> Фото
            <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
          </label>
          <button onClick={addTeacher} disabled={!name.trim() || isSaving} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${(!name.trim() || isSaving) ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            <Plus className="w-4 h-4" /> {isSaving ? 'Сохранение...' : 'Добавить'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teachers.map(t => (
          <motion.div key={t.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="border rounded-xl overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-gray-100" style={{backgroundImage:`url(${t.photo})`, backgroundSize:'cover', backgroundPosition:'center'}} />
            <div className="p-3">
              <div className="font-medium text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-600">{t.subtitle}</div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>removeTeacher(t.id)} className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Удалить
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


