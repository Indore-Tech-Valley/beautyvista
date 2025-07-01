import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import image1 from './Banner1Images/Image1.jpg';
import image2 from './Banner1Images/Image2.jpg';
import image3 from './Banner1Images/Image3.jpg';

const bannerData = [
  {
    title: 'Welcome to BeautyVista',
    heading: 'Discover True Beauty',
    highlight: 'True Beauty',
    description:
      'From expert spa treatments to premium beauty services, let our curated professionals pamper you perfectly.',
    image1: image1,
    image2: image2,
    image3: image3,
  },
  {
    title: 'Glow Like Never Before',
    heading: 'Feel the Magic',
    highlight: 'Magic',
    description:
      'Experience personalized care, modern techniques, and luxurious pampering — all in one place.',
    image1: image2,
    image2: image3,
    image3: image1,
  },
  {
    title: 'Indulge Yourself Today',
    heading: 'Refresh & Rejuvenate',
    highlight: 'Refresh',
    description:
      'Treat your skin, hair, and soul with indulgent care from our beauty experts.',
    image1: image3,
    image2: image1,
    image3: image2,
  },
];

const Banner1 = () => {
  return (
    <div className="w-full h-full lg:h-screen md:py-0 py-10 relative overflow-hidden bg-pink-50 max-h-[786px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        speed={1000}
        loop={true}
        slidesPerView={1}
        className="w-full h-full custom-swiper"
      >
        {bannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center bg-gradient-to-r from-pink-50 to-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col-reverse lg:flex-row justify-between items-center gap-10 h-full py-10 md:py-16 lg:py-20 w-full min-h-[600px] lg:min-h-[650px]">

                {/* Left Text Block */}
                <div className="lg:w-[55%] space-y-4 md:space-y-6 text-center lg:text-left">
                  <h4 className="text-rose-800 text-xl font-bold">
                    {item.title}
                  </h4>
                  <h1
                    className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: item.heading.replace(
                        item.highlight,
                        `<span class="text-rose-700">${item.highlight}</span>`
                      ),
                    }}
                  />
                  <p className="max-w-lg mx-auto lg:mx-0 text-gray-700 text-lg sm:text-xl leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2">
                   <button
  onClick={() => {
    const appointmentElement = document.getElementById('appointment');
    if (appointmentElement) {
      appointmentElement.scrollIntoView({ behavior: 'smooth' });
    }
  }}
  className="cursor-pointer group relative inline-flex items-center justify-between gap-3 px-5 md:px-6 py-3 text-lg font-semibold text-gray-700 border border-gray-400 rounded-3xl hover:bg-rose-50 transition-all duration-300"
>
  Book Now
  <span className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-rose-700 hover:bg-rose-800 transition-colors">
    {/* Old arrow (slides right on hover) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white absolute transform transition-transform duration-300 group-hover:translate-x-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>

    {/* New arrow (comes in from left) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white absolute transform -translate-x-6 transition-transform duration-300 group-hover:translate-x-0"
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

                {/* Right Images */}
                <div className="lg:w-[45%] w-full h-full relative flex items-end justify-center lg:min-h-[600px] lg:pt-18">
                  <div className="relative w-full h-full max-w-[500px] flex flex-col lg:block items-center justify-center gap-6">
                    <img
                      src={item.image1}
                      alt="Top"
                      className="object-cover w-full lg:w-[260px] h-[220px] rounded-xl shadow-2xl lg:absolute top-2 left-0 z-30 lg:transform lg:rotate-[7deg]"
                    />
                    <img
                      src={item.image2}
                      alt="Middle"
                      className="hidden lg:block w-[220px] h-[200px] rounded-xl shadow-xl object-cover lg:absolute top-68 left-40 z-20 transform -translate-y-1/2 rotate-[8deg]"
                    />
                    <img
                      src={item.image3}
                      alt="Bottom"
                      className="hidden lg:block w-[200px] h-[180px] rounded-lg shadow-md object-cover lg:absolute top-88 left-70 z-10 transform rotate-[9deg]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
