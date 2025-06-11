import { FaPhoneAlt } from 'react-icons/fa';

function CallToAction() {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-pink-200 px-8 sm:px-26 py-8 sm:py-10 shadow-md flex flex-col gap-6 sm:gap-0 sm:flex-row items-center sm:justify-between text-center sm:text-left">
      
      {/* Text Content */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-rose-900">
          Have a need an appointment?
        </h3>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          At <span className="font-semibold text-rose-700">BeautyVista</span>, we’re here to help you feel your best.
          Our team is available to assist you 24/7 — just reach out!
        </p>
      </div>

      {/* Call-to-Action Button */}
      <div>
        <button className="w-full sm:w-auto flex justify-center items-center gap-2 bg-rose-800 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow">
          <FaPhoneAlt className="text-white" />
          Contact Us
        </button>
      </div>
      
    </div>
  );
}

export default CallToAction;
