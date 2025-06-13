import React from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';
import { categories } from '../../data/CategoriesData';

const OurCategories = () => {
  return (
    <div className="bg-white text-gray-800  md:pt-0 pt-12 mb-8">
      <BreadcrumbBanner
        title="Categories"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 mt-6 ">
        <div className=" mb-12">
          <div>
            <h4 className="text-rose-700 font-semibold text-lg mb-2 text-left lg:text-center">Our Categories</h4>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight text-left lg:text-center">
              Explore Our Popular Categories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((item) => (
            <div key={item.id}>
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCategories;
