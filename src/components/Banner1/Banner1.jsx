import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import image1 from './Banner1Images/Image1.png';
import image2 from './Banner1Images/Image2.png';
import image3 from './Banner1Images/Image3.png';

const slides = [
  {
    heading: 'Radiant',
    highlight: 'Beauty Solutions',
    description:
      'At BeautyVista, we help you shine with premium skincare, haircare, and wellness services designed to enhance your natural beauty.',
    image: image1,
  },
  {
    heading: 'Relaxing',
    highlight: 'Spa Experience',
    description:
      'Escape into a world of relaxation with our indulgent spa treatments, thoughtfully curated to refresh your body and mind.',
    image: image2,
  },
  {
    heading: 'Expert',
    highlight: 'Makeover Artists',
    description:
      'From bridal elegance to party glam, our skilled artists at BeautyVista craft flawless looks that celebrate your unique style.',
    image: image3,
  },
];

const Banner1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full lg:h-screen md:py-0 py-10 relative overflow-hidden bg-pink-50">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        speed={1000}
        loop={true}
        slidesPerView={1}
        className="w-full h-full custom-swiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center bg-gradient-to-r from-pink-50 to-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col-reverse lg:flex-row justify-between items-center gap-10 h-full py-10 md:py-16 lg:py-20 w-full min-h-[600px] lg:min-h-[650px]">
                {/* Left Text Block */}
                <div className="lg:w-[55%] space-y-4 md:space-y-6 text-center lg:text-left">
                  <h4 className="text-pink-600 text-xl font-bold">
                    Welcome to BeautyVista
                  </h4>
                  <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {slide.heading}{' '}
                    <span className="text-pink-500">{slide.highlight}</span>
                  </h1>
                  <p className="max-w-lg mx-auto lg:mx-0 text-gray-700 text-lg sm:text-xl leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const appointmentElement = document.getElementById('appointment');
                        if (appointmentElement) {
                          appointmentElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="group relative inline-flex items-center justify-between gap-3 px-5 md:px-6 py-3 text-lg font-semibold text-gray-700 border border-gray-400 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      Book Now
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 group-hover:bg-pink-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Image Block */}
                <div className="lg:w-[45%] h-full flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.heading}
                    className="w-[250px] md:w-[400px] lg:w-[500px] h-auto object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Style Swiper pagination bullets */}
      <style>{`
        .custom-swiper .swiper-pagination {
          width: 100%;
          bottom: 1rem;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          z-index: 20;
        }
        .custom-swiper .swiper-pagination-bullet {
          width: 10px;  
          height: 10px;
          background: #f472b6;
          opacity: 0.6;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .custom-swiper .swiper-pagination-bullet-active {
          background: #ec4899;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Banner1;
