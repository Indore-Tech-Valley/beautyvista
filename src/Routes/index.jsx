import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import OurServices from "../Pages/OurServices/OurServices";
import OurCategories from "../Pages/OurCategories/OurCategories";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Faqs from "../components/Faqs/Faqs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Appointment from "../components/Appoinment/Appoinment";
import Terms_Conditions from "../Pages/Terms_Conditions/Terms_Conditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivayPolicy";
import BeautyWellnessPage from "../Pages/BeautyWellnessPage/BeautyWellnessPage";
import WorkshopPage from "../Pages/WorkshopPage/WorkshopPage";
// import ServiceDetails from '../components/ServiceDetails/ServiceDetails';

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
      {/* <Route path="/faqs" element={<Faqs />} /> */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/termsConditions" element={<Terms_Conditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="beautyWellnessPage" element={<BeautyWellnessPage />} />
      <Route path="workshop" element={<WorkshopPage />} />
    </Routes>
  );
};

export default Index;
