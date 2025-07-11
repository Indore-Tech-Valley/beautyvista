  import { React, useEffect, useState } from 'react';
  import {
    Home, Scissors, Grid3X3, Calendar, HelpCircle,
    MessageSquare, Settings, User2, LogOut, X
  } from 'lucide-react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { fetchConfig } from '../../../redux/features/Configs/configs';
  import { useSelector, useDispatch } from 'react-redux';
  import Cookies from 'js-cookie'

  const sidebarItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/users', label: 'Users', icon: User2 },
    { path: '/admin/services', label: 'Services', icon: Scissors },
    { path: '/admin/categories', label: 'Categories', icon: Grid3X3 },
    { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { path: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { path: '/admin/contactForms', label: 'Contact Forms', icon: MessageSquare },
    { path: '/admin/config', label: 'Frontend Config', icon: Settings },
  ];

  const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchConfig());
    }, [dispatch]);

    const config = useSelector((state) => state.config?.config);
    const [activeItem, setActiveItem] = useState(location.pathname);

      const handleLogout = () => {
        Cookies.remove("authToken");
        navigate("/admin");
      };

    return (
    <div
  className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-all duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static lg:shadow-none border-r border-gray-100 overflow-y-auto flex flex-col`}
>
  {/* Top Section: Header + Navigation */}
  <div className="flex-grow flex flex-col">
    {/* Header */}
    <div className="pt-4 pb-5 px-4 border-b border-gray-100 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {config?.site_logo ? (
            <img
              src={config.site_logo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
    </div>

    {/* Navigation */}
    <nav className="pt-6 px-4 bg-gray-50 flex-1">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => {
              setActiveItem(item.path);
              navigate(item.path);
              if (onClose) onClose();
            }}
            className={`w-full flex items-center px-4 py-3 mb-2 text-left rounded-xl transition-all duration-200 group ${
              isActive
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon
              className={`mr-3 transition-transform duration-200 ${
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
              }`}
              size={20}
            />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  </div>

  {/* Bottom Section: Logout */}
  <div className="p-4 border-t border-gray-100 bg-gray-100">
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center px-4 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 group"
    >
      <LogOut className="mr-3 group-hover:text-red-500" size={18} />
      <span className="font-medium">Logout</span>
    </button>
  </div>
</div>

    );
  };

  export default Sidebar;
