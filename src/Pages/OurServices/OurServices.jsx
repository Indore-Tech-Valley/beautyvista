import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';

const services = [
  {
    id: 1,
    title: "Party Makeup",
    price: 49,
    image: "https://i.ibb.co/TWx44J8/party.jpg",
    rating: 4.5,
    featured: true
  },
  {
    id: 2,
    title: "Bridal Makeup",
    price: 49,
    image: "https://i.ibb.co/VqBkxSZ/bridal.jpg",
    rating: 4.5,
    featured: false
  },
  {
    id: 3,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  },
  {
    id: 4,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  },
  {
    id: 5,
    title: "Low Bun Style",
    price: 49,
    image: "https://i.ibb.co/NyqSyJk/bun.jpg",
    rating: 4.5,
    featured: true
  }
];

const OurServices = () => {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm italic text-gray-500">Our Services</p>
          <h2 className="text-2xl font-bold text-gray-800">Our Popular Services</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
         <div>
            <ServiceCard service={service}/>
         </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;