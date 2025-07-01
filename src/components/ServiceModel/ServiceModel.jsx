import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {
  FiDollarSign as DollarSign,
  FiClock as Clock,
  FiPhone as Phone,
  FiCalendar as Calendar,
  FiStar as Star,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceModal = ({ service, onClose, setMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const goToAppointment = (serviceId) => {
   const targetUrl = serviceId
  ? `/?serviceId=${serviceId}#appointment`
  : "/#appointment";


    if (isHomePage) {
      const appointmentElement = document.getElementById("appointment");

      if (appointmentElement) {
        // Dispatch service ID before scrolling
        if (serviceId) {
          window.dispatchEvent(new CustomEvent("select-service", { detail: serviceId }));
        }

        setTimeout(() => {
          appointmentElement.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    } else {
      // Navigate to home and let Appointment.jsx pick up the query param
      navigate(targetUrl);
    }

    // Optional: close menu or modal
    if (setMenuOpen) setMenuOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (service) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  if (!isOpen || !service) return null;

  const beforeAfter = service.before_after || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scroll shadow-2xl animate-in">
        {/* Header */}
        <div className="relative">
          <img
            src={service.images?.[0] || "/placeholder.jpg"}
            alt={service.name}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl" />

          {/* Close Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            className="group absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-200"
          >
            <MdClose className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:rotate-90" />
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
            <span className="bg-rose-500 px-3 py-1 rounded-full text-sm font-medium">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Price, Duration, Rating */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full">
              <DollarSign className="w-5 h-5 text-rose-600" />
              <span className="font-semibold text-rose-800">₹{service.price}</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-pink-600" />
              <span className="font-semibold text-pink-800">{service.duration} mins</span>
            </div>
            {service.rating && (
              <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-800">{service.rating}</span>
                <span className="text-gray-600">({service.reviews || 0} reviews)</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">About This Service</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          {/* Benefits & Includes */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
              <ul className="space-y-3">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Before & After */}
          {beforeAfter.length >= 2 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Before & After</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <img
                    src={beforeAfter[0]}
                    alt="Before treatment"
                    className="w-full h-64 object-cover rounded-lg mb-2"
                  />
                  <span className="text-sm text-gray-600">Before</span>
                </div>
                <div className="text-center">
                  <img
                    src={beforeAfter[1]}
                    alt="After treatment"
                    className="w-full h-64 object-cover rounded-lg mb-2"
                  />
                  <span className="text-sm text-gray-600">After</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => goToAppointment(service.id)}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </button>
            <button className="flex-1 border-2 border-rose-300 text-rose-600 py-4 px-6 rounded-xl hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call for Consultation
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-rose-50 rounded-xl text-center">
            <p className="text-rose-800 font-medium">Need help choosing the right service?</p>
            <p className="text-rose-600 text-sm mt-1">Call us at (555) 123-4567 for a free consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
