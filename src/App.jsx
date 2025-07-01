import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './routes';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import BackToTopButton from './components/BackToTopButton/BackToTopButton';


function AppContent(){

  const location = useLocation();
  const isAdminRoute=location.pathname.startsWith("/admin")
  

  return (
    <>
    {
      isAdminRoute ? (
        <AdminRoutes/>
      )
      :(
<>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Index />
      <Footer />
         <FloatingActionButtons />
</>
      )
    }
    </>
  )
}


function App() {
  return (
    <>

    <BrowserRouter basename='/beautyvista'>
    <ScrollToTop />

    <AppContent/>

      {/* ✅ Place ToastContainer here */}
    </BrowserRouter>
    </>
  );
}

export default App;
