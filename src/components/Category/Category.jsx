import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categoriesSlice/categoriesSlice";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryModal from "../CategoryModel.jsx/CategoryModel";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [modalCategory, setModalCategory] = useState(null);

  const { categories = [], loading, error } = useSelector(
    (state) => state.categories || {}
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(categories)

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

  const renderSliderContent = () => {
    if (loading)
      return <p className="text-center text-gray-500">Loading categories...</p>;
    if (error)
      return <p className="text-center text-red-500">{error}</p>;
    if (categories.length === 0)
      return <p className="text-center text-gray-500">No categories found.</p>;

    return categories?.categories.length <= 3 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories?.categories.map((item, index) => (
          <CategoryCard
            key={item.id || index}
            item={item}
            index={index}
            onViewDetails={setModalCategory}
          />
        ))}
      </div>
    ) : (
      <Slider ref={sliderRef} {...settings}>
        {categories?.categories.map((item, index) => (
          <div className="px-2" key={item.id || index}>
            <CategoryCard
              item={item}
              index={index}
              onViewDetails={setModalCategory}
            />
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <section className="bg-white lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h4 className="text-rose-700 font-semibold text-lg tracking-wide">
                Our Categories
              </h4>
              <div className="sm:hidden">
                <button
                  onClick={() => navigate("/categories")}
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

          <div className="hidden sm:flex justify-end items-center">
            <button
              onClick={() => navigate("/categories")}
              className="w-32 border border-rose-700 text-rose-700 px-4 py-2 rounded-md hover:bg-rose-700 hover:text-white transition-all duration-300"
            >
              See All →
            </button>
          </div>
        </div>

        {/* Slider or Grid */}
        <div className="py-2">{renderSliderContent()}</div>
      </div>

      {/* Modal */}
      <CategoryModal
        category={modalCategory}
        onClose={() => setModalCategory(null)}
      />
    </section>
  );
};

export default Category;
