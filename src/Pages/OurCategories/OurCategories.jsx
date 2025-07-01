import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';
import CategoryModal from '../../components/CategoryModel.jsx/CategoryModel';
import { fetchCategories } from '../../redux/features/categoriesSlice/categoriesSlice';

const OurCategories = () => {
  const dispatch = useDispatch();
  const [modalCategory, setModalCategory] = useState(null);

  // Redux state
  const { categories = [], loading, error } = useSelector(
    (state) => state.categories || {}
  );

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-white text-gray-800 md:pt-0 pt-12 mb-8 min-h-screen">
      <BreadcrumbBanner
        title="Categories"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="mb-12">
          <h4 className="text-rose-700 font-semibold text-lg mb-2 text-left lg:text-center">
            Our Categories
          </h4>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight text-left lg:text-center">
            Explore Our Popular Categories
          </h2>
        </div>

        {/* Loading / Error / Data States */}
        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories?.categories.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onViewDetails={() => setModalCategory(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Rendering */}
      {modalCategory && (
        <CategoryModal
          category={modalCategory}
          onClose={() => setModalCategory(null)}
        />
      )}
    </div>
  );
};

export default OurCategories;
