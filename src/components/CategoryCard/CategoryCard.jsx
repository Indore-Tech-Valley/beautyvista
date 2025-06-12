import React from 'react';

const CategoryCard = ({ item }) => {
  return (
    <div
      key={item.id}
      className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-rose-700 p-3 rounded-full text-white text-2xl">
          {item.icon}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl text-rose-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-5">{item.description}</p>
        <button className="text-rose-700 font-medium hover:text-rose-900 transition-all">
          View Details →
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
