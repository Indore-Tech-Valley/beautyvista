import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceCard from "../ServiceCard/ServiceCard";
import services from "../../data/ServicesData";
import { useNavigate } from "react-router-dom";

const ServicesSlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="bg-white lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
  {/* Left Section */}
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <h4 className="text-rose-700 font-semibold text-lg  tracking-wide">
        Our Services
      </h4>
      <div className="sm:hidden">
        <button 
          onClick={() => navigate('/services')} 
          className="w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
        >
          See All →
        </button>
      </div>
    </div>

    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight">
      Explore Our Categories
    </h2>
  </div>

  {/* Right Section (Only visible on sm and above) */}
  <div className="hidden sm:flex justify-end items-center">
    <button 
      onClick={() => navigate('/services')} 
      className="w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
    >
      See All →
    </button>
  </div>
</div>

        <div className="py-2">
          <Slider {...settings}>
            {services.map((service) => (
              <div className="px-2" key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
