import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import NavigationHeader from '../../components/NaviagationHeader/NavigationHeader';
import { Menu } from 'lucide-react';
import Cookies from 'js-cookie';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 👇 Check for auth token on mount
  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   if (!token) {
  //     navigate("/admin/login");
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/admin");
  };

  const currentUser = {
    name: 'Admin User',
    email: 'admin@beautyvista.com',
    role: 'Super Admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=ec4899&color=fff'
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'rgba(255,255,255,0.1)' }}
        />
      )}

      {/* Main Area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between md:justify-end px-4 py-3 bg-white shadow-sm sticky top-0 z-30 border-gray-200">
          <button
            className="text-gray-600 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <NavigationHeader currentUser={currentUser} onLogout={handleLogout} />
          </div>

          {/* Mobile Info */}
          <div className="flex md:hidden items-center gap-3">
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-gray-500 text-xs">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
