import React from "react";
import { FaBrush, FaCut, FaPalette } from "react-icons/fa";
import { motion } from "framer-motion";
import CategoryCard from "../CategoryCard/CategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Make Up",
    description: "Enhance your beauty with our expert makeup services for all occasions.",
    image: "https://media.istockphoto.com/id/687244776/photo/makeup-artist-applying-eyeshadow-on-a-girl.jpg?s=612x612&w=0&k=20&c=QkFL3oe-poYi4p1ZaboIOVie_ycRz0fTJG9Ex5LpNoQ=",
    icon: <FaBrush className="text-white text-xl" />,
  },
  {
    id: 2,
    title: "Hair Styling",
    description: "Trendy cuts, styles, and hair care solutions to suit your unique look.",
    image: "https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg",
    icon: <FaCut className="text-white text-xl" />,
  },
  {
    id: 3,
    title: "Hair Coloring",
    description: "Get vibrant, long-lasting hair colors personalized just for you.",
    image: "https://media.istockphoto.com/id/1305824214/photo/woman-dyeing-her-hair-at-the-salon.jpg?s=612x612&w=0&k=20&c=Jk2XQqn-5Tf1IeUPhmLYMP1Lq2nSlW_0udRXzc_KAJI=",
    icon: <FaPalette className="text-white text-xl" />,
  },
  {
  id: 4,
    title: "Make Up",
    description: "Enhance your beauty with our expert makeup services for all occasions.",
    image: "https://media.istockphoto.com/id/687244776/photo/makeup-artist-applying-eyeshadow-on-a-girl.jpg?s=612x612&w=0&k=20&c=QkFL3oe-poYi4p1ZaboIOVie_ycRz0fTJG9Ex5LpNoQ=",
    icon: <FaBrush className="text-white text-xl" />,
  },
  {
    id: 5,
    title: "Hair Styling",
    description: "Trendy cuts, styles, and hair care solutions to suit your unique look.",
    image: "https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg",
    icon: <FaCut className="text-white text-xl" />,
  },
];

const Category = () => {
    const navigate=useNavigate();
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
            <h4 className="text-[#8d6e63] font-semibold text-lg mb-2">Our Categories</h4>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
              Explore Our Categories
            </h2>
          </div>
          <button
          onClick={()=>navigate('/categories')}
          className="border border-[#8d6e63] text-[#8d6e63] px-5 py-2 rounded hover:bg-[#8d6e63] hover:text-white transition-all">
            See All →
          </button>
        </motion.div>

  
          <div className="py-2">
      <Slider {...settings}>
        {categories.map((item) => (
          <div className="px-2">
          <CategoryCard item={item} />
          </div>
        ))}
      </Slider>
      </div>
      </div>
    </section>
  );
};

export default Category;
