import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// Pages
import Auth from '../Admin/pages/Auth/Auth';
import Dashboard from '../Admin/pages/Dashboard/Dashboard';
import AdminProfile from '../Admin/pages/AdminProfile/AdminProfile';
import AdminLayout from '../Admin/pages/AdminLayout/AdminLayout';
import Categories from '../Admin/pages/Categories/Categories';
import Services from '../Admin/pages/Services/Services';
import Appointments from '../Admin/pages/Appoinments/Appoinments';
import Config from '../Admin/pages/Config/Config';
import ContactForms from '../Admin/pages/ContactForms/ContactForms';
import Testimonials from '../Admin/pages/Testimonials.jsx/Testimonilas';
import Faqs from '../Admin/pages/Faqs/faqs';
import Users from '../Admin/pages/Users/Users';

const AdminRoutes = () => {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsAdminLoggedIn(!!token);
  }, [location]);

  // ⛔ Prevent route flickering until token is checked
  if (isAdminLoggedIn === null) return null;

  return (
    <Routes>
      {/* Public route: Admin Login */}
      <Route
        path="/admin"
        element={
          isAdminLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Auth />
        }
      />

      {/* Protected Routes */}
      {isAdminLoggedIn ? (
        <>
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="services" element={<Services />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<Appointments />} />
            <Route path="config" element={<Config />} />
            <Route path="testimonials" element={<Testimonials />} />
           <Route path="contactforms" element={<ContactForms />} />
           <Route path="contactforms/:id" element={<ContactForms />} />

          </Route>
        </>
      ) : (
        // Redirect all other admin routes to login if not authenticated
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      )}

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
