import React from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  return (
    <div
      key={service.id}
      className="rounded-xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.featured && (
          <span className="absolute top-4 left-4 bg-rose-700 text-white text-xs px-3 py-1 rounded-full shadow">
            Featured
          </span>
        )}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
          <FaHeart className="text-gray-400 hover:text-rose-600 cursor-pointer transition-colors duration-300" />
        </div>
      </div>

      <div className="px-6 py-5">
        <h3 className="font-semibold text-xl text-rose-900 mb-3">{service.title}</h3>

        <div className="flex items-center text-yellow-500 text-sm mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={i < Math.floor(service.rating) ? 'text-yellow-500' : 'text-gray-300'} />
          ))}
          <span className="ml-2 text-gray-600">{service.rating.toFixed(1)}</span>
        </div>

        <div className="text-lg text-rose-700 font-semibold mb-4">
          USD {service.price.toFixed(2)}
          <span className="ml-3 text-sm line-through text-gray-400 font-normal">USD 59.00</span>
        </div>

        <button className="w-full border border-rose-700 text-rose-700 font-medium py-2 rounded-full hover:bg-rose-700 hover:text-white transition-all duration-300">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
