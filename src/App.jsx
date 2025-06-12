import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './routes';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import BackToTopButton from './components/BackToTopButton/BackToTopButton';


function App() {
  return (
    // <BrowserRouter basename='/dentia-frontend-demo'>
    <BrowserRouter  basename='/beautyvista'>
     <ScrollToTop />
    <Navbar/>
    <Index />
    
    {/* <BackToTopButton /> Add here */}
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
