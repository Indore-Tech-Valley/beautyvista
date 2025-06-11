import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import image1 from './Banner1Images/Image1.jpg';

const slides = [
  {
    heading: 'Radiant',
    highlight: 'Beauty Solutions',
    description:
      'At BeautyVista, we specialize in enhancing your natural glow with premium skincare, haircare, and wellness treatments for every need.',
    image: image1
  },
  {
    heading: 'Relaxing',
    highlight: 'Spa Experience',
    description:
      'Unwind in a serene environment with our luxurious spa therapies, customized to rejuvenate your body and mind.',
    image: 'https://madebydesignesia.com/themes/dentia/images/misc/c3.webp',
  },
  {
    heading: 'Expert',
    highlight: 'Makeover Artists',
    description:
      'Whether it’s bridal glam or a party look, our professional artists at BeautyVista bring out the best version of you.',
    image: 'https://madebydesignesia.com/themes/dentia/images/misc/c1.webp',
  },
];

const Banner1 = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="bg-gradient-to-r from-pink-50 to-white flex items-center">
            <div className="max-w-7xl mx-auto px-6 pb-2 flex flex-col lg:flex-row justify-between w-full gap-5 lg:py-24 py-12">
              
              {/* Left Text */}
              <div className="lg:w-[65%] space-y-4 lg:text-left">
                <h4 className="text-pink-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
                  WELCOME TO BEAUTYVISTA
                </h4>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                  {slide.heading} <span className="text-pink-500">{slide.highlight}</span>
                </h1>
                <p className="lg:pt-4 max-w-lg lg:mx-0 text-gray-500 text-base sm:text-lg">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row lg:items-center justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
                <button className="group relative inline-flex items-center justify-between gap-3 px-6 py-3 text-sm font-medium text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100 transition-all duration-300">
  Book Now
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 group-hover:bg-teal-800 transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </span>
</button>

                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-[45%] flex justify-center mb-12 lg:mb-0">
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="w-[400px] md:w-[520px] lg:w-[620px] h-auto object-contain bg-white"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner1;
