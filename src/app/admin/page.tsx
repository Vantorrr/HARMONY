'use client';

import { useState, useEffect } from 'react';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Проверяем админскую авторизацию при загрузке
    const adminAuth = localStorage.getItem('harmony_admin_auth');
    if (adminAuth) {
      const authData = JSON.parse(adminAuth);
      // Проверяем, не истекла ли сессия (24 часа)
      if (Date.now() - authData.loginTime < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
        setAdminUser(authData);
      } else {
        localStorage.removeItem('harmony_admin_auth');
      }
    }
  }, []);

  const handleAuthSuccess = (user: any) => {
    setIsAuthenticated(true);
    setAdminUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('harmony_admin_auth');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />;
}