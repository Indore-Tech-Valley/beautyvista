// CallToAction.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';

function CallToAction() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/contact#ContactUs');
  };

  return (
    <section className="bg-rose-50 lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 lg:flex-row items-center justify-between text-center lg:text-left">
        
        {/* Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="mb-4 text-2xl sm:text-4xl lg:text-4xl font-bold text-rose-900 leading-tight">
            Need an appointment?
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            At <span className="font-semibold text-rose-700">BeautyVista</span>, we’re here to help you feel your best. Our team is available to assist you 24/7 — just reach out!
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div>
  <button
    onClick={handleNavigate}
    className="relative group block w-full sm:w-auto text-center bg-rose-700 hover:bg-rose-800 text-white px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden min-w-[160px] h-[50px] transition-colors duration-300 ease-in-out shadow-md"
  >
    <span className="absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 group-hover:-translate-y-full">
      <FaPhoneAlt className="text-white text-xl" />
      Contact Us
    </span>
    <span className="absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
      <FaPhoneAlt className="text-white text-xl" />
      Contact Us
    </span>
  </button>
</div>


      </div>
    </section>
  );
}

export default CallToAction;
