import { FaPhoneAlt } from 'react-icons/fa';

function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-rose-50 to-pink-200 lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6  flex flex-col gap-8 lg:flex-row items-center justify-between text-center lg:text-left">
        
        {/* Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="mb-4 text-2xl sm:text-4xl lg:text-4xl font-bold text-rose-900 leading-tight ">
           Need an appointment?
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            At <span className="font-semibold text-rose-700">BeautyVista</span>, we’re here to help you feel your best. Our team is available to assist you 24/7 — just reach out!
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div>
          <button className="w-full sm:w-auto flex justify-center items-center gap-3 bg-rose-800 hover:bg-rose-700 text-white font-semibold py-4 px-10 rounded-xl transition-colors duration-200 shadow-md text-lg">
            <FaPhoneAlt className="text-white text-xl" />
            Contact Us
          </button>
        </div>
        
      </div>
    </section>
  );
}

export default CallToAction;
