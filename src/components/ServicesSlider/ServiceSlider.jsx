import React from "react";
import { FaBrush, FaCut, FaPalette } from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceCard from "../ServiceCard/ServiceCard";


const services = [
  {
    id: 1,
    title: "Party Makeup",
    price: 49,
    image: "https://i.ibb.co/TWx44J8/party.jpg",
    rating: 4.5,
    featured: true
  },
  {
    id: 2,
    title: "Bridal Makeup",
    price: 49,
    image: "https://i.ibb.co/VqBkxSZ/bridal.jpg",
    rating: 4.5,
    featured: false
  },
  {
    id: 3,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  },
   {
    id: 4,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  },
  {
    id: 5,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  }
]


const ServicesSlider = () => {
    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        },
      }
    ]
  };
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Animated Heading */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h4 className="text-[#8d6e63] font-semibold text-lg mb-2">Our Services</h4>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
              Explore Our Services
            </h2>
          </div>
          <button className="border border-[#8d6e63] text-[#8d6e63] px-5 py-2 rounded hover:bg-[#8d6e63] hover:text-white transition-all">
            See All →
          </button>
        </motion.div>

  
          <div className="py-2">
      <Slider {...settings}>
        {services.map((service) => (
          <div className="px-2">
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
