import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import services from '../../data/ServicesData';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

const OurServices = () => {
  return (
    <div className=" bg-white text-gray-800 md:pt-0 pt-12">
       <BreadcrumbBanner
        title="Services"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h4 className="text-rose-700 font-semibold text-lg mb-2">Our Services</h4>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 leading-tight">
              Explore Our Popular Services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
