import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceCard from "../ServiceCard/ServiceCard";
import ServiceModal from "../ServiceModel/ServiceModel";
import { useNavigate } from "react-router-dom";

const ServicesSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalService, setModalService] = useState(null);

  const { services = [], loading, error } = useSelector(
    (state) => state.services || {}
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = modalService ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalService]);

  const settings = {
    lazyLoad: "ondemand",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const showSlider = services.length > 3;
  const servicesToShow = services.slice(0, 10); // Limit top services

  return (
    <section className="bg-white lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Always-visible Heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h4 className="text-rose-700 font-semibold text-lg tracking-wide">
                Our Services
              </h4>
              <div className="sm:hidden">
                <button
                  onClick={() => navigate("/services")}
                  className="w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
                >
                  See All →
                </button>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight">
              Explore Our Services
            </h2>
          </div>

          <div className="hidden sm:flex justify-end items-center">
            <button
              onClick={() => navigate("/services")}
              className="w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
            >
              See All →
            </button>
          </div>
        </div>

        {/* ✅ Slider or Grid or Loading/Error */}
        <div className="py-2">
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading services...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No services available.</p>
          ) : showSlider ? (
            <Slider {...settings}>
              {servicesToShow.map((service) => (
                <div className="px-2" key={service.id}>
                  <ServiceCard
                    service={service}
                    onViewDetails={() => setModalService(service)}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesToShow.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={() => setModalService(service)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ServiceModal service={modalService} onClose={() => setModalService(null)} />
    </section>
  );
};

export default ServicesSlider;
