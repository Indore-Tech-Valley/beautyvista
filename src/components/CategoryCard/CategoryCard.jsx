import React from 'react';
import { MdArrowForward } from 'react-icons/md';

const CategoryCard = ({ item, onViewDetails }) => {
  return (
    <div
      className="mb-2 rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl h-full flex flex-col"
    >
      <div className="relative">
        <img
          src={item.category_image || item.image || "https://via.placeholder.com/400x240?text=No+Image"}
          alt={item.name || "Category"}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Icon (optional) */}
       {item.icon && (
  <div className="absolute top-4 left-4 bg-rose-700 px-3 py-2 rounded-full text-white text-2xl h-12 w-12">
    <i className={`fa-solid fa-${item.icon} `}></i>
  </div>
)}

      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-xl text-rose-900 mb-3">
          {item.name || "Untitled Category"}
        </h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {item.description || "No description available."}
        </p>

        <button
          className="text-rose-700 font-medium hover:text-rose-900 transition-all mt-auto flex items-center gap-1"
          onClick={() => onViewDetails(item)}
        >
          View Details <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
