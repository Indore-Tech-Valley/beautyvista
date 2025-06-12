import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import categories from "../../data/CategoriesData";

const Category = () => {
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
    <section className="bg-white lg:py-8 py-6 ">
      <div className="max-w-7xl mx-auto px-6">
     <div className="grid grid-cols-2 lg:gap-0 gap-4 mb-5">
  {/* Row 1: Title and Button */}
  <h4 className="text-rose-700 font-semibold text-lg uppercase tracking-wide my-auto">
    Our Categories
  </h4>
  <div className="flex sm:justify-end">
    <button 
      onClick={() => navigate('/categories')} 
      className=" w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
    >
      See All →
    </button>
  </div>

  {/* Row 2: Full-width Heading */}
  <h2 className="col-span-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight ">
    Explore Our Categories
  </h2>
</div>




        <div className="py-2">
          <Slider {...settings}>
            {categories.map((item) => (
              <div className="px-2" key={item.id}>
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
