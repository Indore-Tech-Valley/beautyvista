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
      'At BeautyVista, we specialize in enhancing your natural glow with premium skincare, haircare, and wellness treatments for every need.',
    image: image1,
  },
  {
    heading: 'Relaxing',
    highlight: 'Spa Experience',
    description:
      'Unwind in a serene environment with our luxurious spa therapies, customized to rejuvenate your body and mind.',
    image: image2,
  },
  {
    heading: 'Expert',
    highlight: 'Makeover Artists',
    description:
      'Whether it’s bridal glam or a party look, our professional artists at BeautyVista bring out the best version of you.',
    image: image3,
  },
];

const Banner1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-pink-50">
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
            <div className="w-full h-full flex items-center bg-gradient-to-r from-pink-50 to-white transition-opacity duration-1000 ease-in-out">
              <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-10 h-full py-12 lg:py-20 w-full">
                
                {/* Left Text */}
                <div
                  key={index} 
                  className={`lg:w-[60%] space-y-6 transition-all duration-700 ease-in-out ${
                    activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <h4 className="text-pink-600 font-bold text-md lg:text-lg">
                    WELCOME TO BEAUTYVISTA
                  </h4>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    {slide.heading}{' '}
                    <span className="text-pink-500">{slide.highlight}</span>
                  </h1>
                  <p className="max-w-lg text-gray-500 text-base sm:text-lg">
                    {slide.description}
                  </p>
                  <div className="pt-4">
                    <button className="group relative inline-flex items-center justify-between gap-3 px-6 py-3 text-sm font-medium text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100 transition-all duration-300">
                      Book Now
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 group-hover:bg-pink-700 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div
                  className={`lg:w-[40%] flex justify-center transition-all duration-700 ease-in-out ${
                    activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.heading}
                    className="w-[300px] md:w-[450px] lg:w-[550px] h-auto object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Style Swiper pagination bullets */}
      <style>
        {`
        .custom-swiper .swiper-pagination {
          position: absolute;
          left: 9.5rem;
          bottom: 5rem;
          display: flex;
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
      `}
      </style>
    </div>
  );
};

export default Banner1;
