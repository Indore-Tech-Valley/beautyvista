import React from "react";
import { useNavigate } from 'react-router-dom';

const images = [
  "https://media.istockphoto.com/id/516981844/photo/hairdresser-washing-hair.jpg?s=612x612&w=0&k=20&c=U4DecDt3Vplgu7BVXMCeSC0cprGexeePIFMR2iZtxjo=",
  "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
  "https://cdn.shopify.com/s/files/1/0285/1004/files/shutterstock_391326496_large.jpg?v=1530168257",
];

const Expertise = ({ showAppointmentButton = true }) => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    // Navigate to homepage and scroll to appointment
    navigate('/#appointment');
  };

  return (
    <section className="bg-white  lg:py-20 py-10">
      <div className="max-w-7xl px-6 mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 relative flex flex-col gap-4 justify-center items-center min-h-[400px]">
          <img src={images[0]} alt="Expertise 1" className="lg:absolute top-0 left-0 w-full lg:w-74 lg:h-40 object-cover shadow-lg z-20 border-white border-6" />
          <img src={images[1]} alt="Expertise 2" className="lg:absolute top-10 right-16 w-full lg:w-74 lg:h-82 object-cover shadow-lg z-30 border-white border-6" />
          <img src={images[2]} alt="Expertise 3" className="lg:absolute left-0 bottom-0 w-full lg:w-74 lg:h-50 object-cover shadow-lg z-40 border-white border-6" />
        </div>

        {/* Right Text Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="mb-4 text-2xl sm:text-4xl lg:text-5xl font-bold text-rose-700 leading-tight">
            25+ Years of <span className="text-pink-500">Expertise</span> in Wellness
          </h2>

          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            With over 25 years of dedicated experience in wellness and relaxation, we have mastered
            the art of creating a sanctuary where your mind, body, and soul can thrive. Our journey
            has been built on the principles of holistic healing, personalized care, and innovative
            spa therapies.
          </p>

          <div>
            <h4 className="text-2xl font-semibold text-rose-700 mb-3">Our Mission & Vision</h4>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              We envision a world where self-care is a priority, offering innovative spa therapies
              and personalized care to help our clients achieve balance and harmony in their lives.
            </p>
          </div>

          {showAppointmentButton && (
            <button
              onClick={handleAppointmentClick}
              className="mt-4 inline-flex items-center gap-3 px-6 py-3 border border-gray-400 rounded-full text-lg font-semibold text-gray-700 hover:shadow-md transition-all duration-300"
            >
              Appointment Now
              <span className="inline-flex items-center justify-center bg-rose-700 text-white rounded-full p-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
