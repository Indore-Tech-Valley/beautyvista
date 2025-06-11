// Developed By: Mantresh (ITV-0005)

import { FaSpa } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { GiScissors, GiLipstick } from 'react-icons/gi';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function WelcomeCompo1() {
  const welcomeData = [
    {
      title: 'Skin Treatments',
      description: 'Rejuvenate your skin with our expert facials and glowing skin therapies.',
      icon: <FaSpa className="text-4xl" />,
    },
    {
      title: 'Hair Styling',
      description: 'From casual waves to bridal buns, we craft the perfect look for every occasion.',
      icon: <GiScissors className="text-4xl" />,
    },
    {
      title: 'Makeup Studio',
      description: 'Enhance your natural beauty with our personalized makeup sessions.',
      icon: <GiLipstick className="text-4xl" />,
    },
    {
      title: 'Customer Care',
      description: 'We’re here for you — every step, every session. Beauty with care and comfort.',
      icon: <BiSupport className="text-4xl" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-pink-50 p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-4">Welcome to BeautyVista</h2>
      <p className="text-center text-gray-700 max-w-md">
        Step into a world of elegance and relaxation. BeautyVista brings out your true beauty with personalized care and a professional touch.
      </p>
      <div className="h-1 w-16 bg-pink-600 mt-2 mx-auto rounded"></div>

      <div className="mt-16 w-full max-w-6xl">
        {/* Mobile & Tablet: Swiper Slider | Desktop: Grid */}
        <div className="block lg:hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
            }}
            className="pb-12"
          >
            {welcomeData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-pink-100 text-rose-900 rounded-full w-20 h-20 flex items-center justify-center mb-4 border border-pink-200 shadow-sm hover:bg-pink-200 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-rose-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !text-rose-600 !text-2xl after:!text-2xl"></div>
            <div className="swiper-button-next !text-rose-600 !text-2xl after:!text-2xl"></div>
          </Swiper>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {welcomeData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-pink-100 text-rose-900 rounded-full w-20 h-20 flex items-center justify-center mb-4 border border-pink-200 shadow-sm hover:bg-pink-200 transition-colors duration-300">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-rose-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 40px !important;
          height: 40px !important;
          margin-top: -20px !important;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }
      `}</style> */}
    </div>
  );
}

export default WelcomeCompo1;