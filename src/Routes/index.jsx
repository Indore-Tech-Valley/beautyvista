import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';

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
    </Routes>
  );
};

export default Index;
