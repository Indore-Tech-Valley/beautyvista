import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import OurServices from '../Pages/OurServices/OurServices';
import OurCategories from '../Pages/OurCategories/OurCategories';
import ContactUs from '../Pages/ContactUs/ContactUs';
import Faqs from '../Pages/Faqs/Faqs';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Appointment from '../components/Appoinment/Appoinment';

// import AboutUs from '../components/AboutUs/AboutUs';
// import AboutPage from '../components/AboutPage/AboutPage';
// import Events from '../components/Events/Events';
// import TermsConditions from '../components/TermsConditions/TermsConditions';
// import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
// import ServicePage from '../components/ServicePage/ServicePage';
// import ContactPage from '../components/ContactPage/ContactUsPage';


const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<OurServices />} />
      <Route path="/categories" element={<OurCategories />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/about" element={<AboutUs />} />
 

    </Routes>
  );
};

export default Index;
