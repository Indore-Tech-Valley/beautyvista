import { FaSpa } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { GiScissors, GiLipstick } from 'react-icons/gi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function WelcomeCompo1() {
  const welcomeData = [
    {
      title: 'Skin Treatments',
      description: 'Revitalize your skin with expert facials & glowing skin therapies.',
      icon: <FaSpa className="text-4xl" />,
    },
    {
      title: 'Hair Styling',
      description: 'From casual waves to bridal buns, get the perfect look for every occasion.',
      icon: <GiScissors className="text-4xl" />,
    },
    {
      title: 'Makeup Studio',
      description: 'Enhance your beauty with professional and personalized makeup services.',
      icon: <GiLipstick className="text-4xl" />,
    },
    {
      title: 'Customer Care',
      description: 'We ensure comfort & care throughout every session for your satisfaction.',
      icon: <BiSupport className="text-4xl" />,
    },
  ];

  return (
    <section className="bg-pink-50  lg:py-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-rose-900 mb-4 text-center">
          Welcome to BeautyVista
        </h2>
        <p className="text-center text-gray-700 max-w-xl mx-auto mb-2">
          Step into a world of relaxation & elegance. Discover your true beauty with personalized care.
        </p>
        <div className="h-1 w-16 bg-rose-400 mb-10 rounded"></div>

        {/* Mobile Swiper */}
        <div className="block lg:hidden w-full">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false },
              768: { slidesPerView: 2, centeredSlides: false },
            }}
            className="pb-12"
          >
            {welcomeData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center p-6 mx-2">
                  <div className="bg-pink-100 text-rose-900 rounded-full w-24 h-24 flex items-center justify-center mb-4 border border-pink-200 shadow-sm hover:bg-pink-200 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-rose-900 mb-3">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev !text-rose-600 !text-2xl after:!text-2xl"></div>
            <div className="swiper-button-next !text-rose-600 !text-2xl after:!text-2xl"></div>
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-10 w-full">
          {welcomeData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8">
              <div className="bg-pink-100 text-rose-900 rounded-full w-24 h-24 flex items-center justify-center mb-4 border border-pink-200 shadow-sm hover:bg-pink-200 transition-colors duration-300">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-rose-900 mb-3">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WelcomeCompo1;
