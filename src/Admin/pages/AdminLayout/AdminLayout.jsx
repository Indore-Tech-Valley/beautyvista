import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import NavigationHeader from '../../components/NaviagationHeader/NavigationHeader';
import { Menu } from 'lucide-react';
import Cookies from 'js-cookie';
import { fetchAdminProfile } from '../../../redux/features/adminProfileSlice/adminProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: currentUser } = useSelector((state) => state.adminProfile);

  // 🔐 Auth check and profile fetch
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      navigate('/admin/login');
    } else if (!currentUser) {
      dispatch(fetchAdminProfile());
    }
  }, [navigate, dispatch, currentUser]);

  // 🚪 Logout
  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'rgba(255,255,255,0.1)' }}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between lg:justify-end px-4 py-3 bg-white shadow-sm sticky top-0 z-30 border-gray-200">
          <button
            className="text-gray-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Navigation Header */}
          <div className="md:block">
            <NavigationHeader currentUser={currentUser} onLogout={handleLogout} />
          </div>
        </div>

        {/* Routed Page Content */}
        <main className="flex-1 overflow-y-auto bg-white md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
