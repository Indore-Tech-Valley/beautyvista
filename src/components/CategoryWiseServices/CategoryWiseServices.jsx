import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServiceCard from '../ServiceCard/ServiceCard';
import ServiceModal from '../ServiceModel/ServiceModel';

const CategoryWiseServices = ({ category }) => {
  const [modalService, setModalService] = useState(null);

  // 🔽 Access services from Redux
  const { services = [] } = useSelector((state) => state.services || {});

  // 🔽 Filter services by category
  const filteredServices = services.filter(
    (service) => service.category === category
  );

  // 🔽 Skip if nothing to render
  if (!filteredServices.length) return null;

  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* ✅ Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 capitalize">
            Services in {category}
          </h2>
        </div>

        {/* ✅ Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id || `${service.name}-${Math.random()}`}
              service={service}
              onViewDetails={() => setModalService(service)}
            />
          ))}
        </div>
      </div>

      {/* ✅ Modal */}
      {modalService && (
        <ServiceModal
          service={modalService}
          onClose={() => setModalService(null)}
        />
      )}
    </section>
  );
};

export default CategoryWiseServices;
