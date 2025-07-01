import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const ServiceCard = ({ service, onViewDetails }) => {
  const totalStars = 5;
  const fullStars = service.rating ? Math.floor(service.rating) : 0;

  return (
    <div className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={service.images?.[0] || "/placeholder.jpg"}
          alt={service.name}
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
        <h3 className="font-semibold text-xl text-rose-900 mb-1">{service.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {service.category} • {service.duration} mins
        </p>

        {/* <div className="flex items-center text-yellow-500 text-sm mb-2">
          {Array.from({ length: totalStars }).map((_, i) => (
            <FaStar
              key={i}
              className={i < fullStars ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          {service.rating && (
            <span className="ml-2 text-gray-600">
              {service.rating.toFixed(1)} ({service.reviews || 0})
            </span>
          )}
        </div> */}

        <div className="text-lg text-rose-700 font-semibold mb-4">
          ₹{service.price}
        </div>

        <button
          className="text-rose-700 font-medium hover:text-rose-900 transition-all"
          onClick={onViewDetails}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
