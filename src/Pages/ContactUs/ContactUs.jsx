// ContactUs.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";
import ContactForm from "../../components/ContactForm/ContactForm";

const ContactUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#ContactUs') {
      const element = document.getElementById('ContactUs');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay ensures element is mounted
      }
    }
  }, [location]);

  return (
    <div id="ContactUs" className="w-full bg-white text-gray-800 md:pt-0 pt-12 mb-8   ">
      {/* Breadcrumb */}
      <BreadcrumbBanner 
        title="Contact Us" 
        path="Home" 
        image="https://www.priyankabeautyspa.com/images/slider/herbal-facial-beauty-salon-chennai.jpg" 
      />

      {/* Main Section */}
      <div className="min-h-screen flex justify-center items-center">
   <ContactForm/>
   </div>
    </div>
  );
};

export default ContactUs;
