import React from 'react'
import { FaStar, FaHeart } from 'react-icons/fa';


const ServiceCard = ({service}) => {
  return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            {service.featured && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">Featured</span>
            )}
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-lg">{service.title}</h3>
                <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              <div className="flex items-center text-yellow-500 text-sm mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(service.rating) ? 'text-yellow-500' : 'text-gray-300'} />
                ))}
                <span className="ml-2 text-gray-600">{service.rating}</span>
              </div>
              <div className="text-sm text-gray-800 mb-2">
                <span className="font-bold">USD {service.price.toFixed(2)}</span>{' '}
                <span className="line-through text-gray-400">USD 59.00</span>
              </div>
              <button className="w-full border border-gray-800 text-sm py-2 rounded hover:bg-gray-100">
                Book Appointment
              </button>
            </div>
          </div>
  )
}

export default ServiceCard