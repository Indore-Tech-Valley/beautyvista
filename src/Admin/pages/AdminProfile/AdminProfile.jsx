// src/pages/AdminProfile/AdminProfile.jsx
import React, { useState } from 'react';
import {
  User,
  Shield,
  Save,
  LayoutDashboard 
} from 'lucide-react';
import SecurityTab from './SecurityTab';
import ProfileTab from './profileTab';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const tabs = [
     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            <p className="text-pink-100 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4 bg-gray-50 p-6">
              <nav className="space-y-2">
             {tabs.map((tab) => {
  const Icon = tab.icon;
  return (
    <button
      key={tab.id}
      onClick={() => {
        if (tab.id === 'dashboard') {
          navigate('/admin/dashboard'); // ✅ useNavigate here
        } else {
          setActiveTab(tab.id);
        }
      }}
      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
        activeTab === tab.id
          ? 'bg-pink-600 text-white'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="mr-3" size={20} />
      {tab.label}
    </button>
  );
})}


              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-6">
              {renderTabContent()}

              {/* Save Button */}
              {/* <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium flex items-center"
                >
                  <Save className="mr-2" size={20} />
                  Save Changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
