import React from 'react';
import {
  Home, Scissors, Grid3X3, Calendar, HelpCircle,
  MessageSquare, Star, Settings, User2, X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { path: '/admin/users', label: 'Users', icon: User2 },
  { path: '/admin/services', label: 'Services', icon: Scissors },
  { path: '/admin/categories', label: 'Categories', icon: Grid3X3 },
  { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { path: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { path: '/admin/contactForms', label: 'Contact Forms', icon: MessageSquare },
  // { path: '/admin/testimonials', label: 'Testimonials', icon: Star },
  // { path: '/admin/config', label: 'Frontend Config', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:shadow-none`}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-pink-600">BeautyVista</h2>
        <button onClick={onClose} className="text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* Logo for Desktop */}
      <div className="hidden md:block p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-pink-600">BeautyVista</h2>
        <p className="text-sm text-gray-600">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="mt-4 md:mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (onClose) onClose(); // close sidebar on mobile
              }}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3" size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
