import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryModal = ({ category, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [category]);

  if (!category) return null;

  // Mapping from API field names
  const image = category.category_image || category.image;
  const title = category.name || category.title;
  const description = category.description;
  const icon = category.icon; // like "face-smile"
  const defaultServiceId = category.defaultServiceId;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in">
        {/* Header with Image and Close Button */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl" />

          {/* Close Button */}
          <button
  onClick={onClose}
  className="group absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full  transition-all duration-200"
>
  <MdClose className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:rotate-90" />
</button>


          {/* Title & Icon */}
          <div className="absolute bottom-4 left-6 text-white">
            <div className="flex flex-col items-start gap-2 mb-2">
              {/* Dynamic Font Awesome icon via CDN */}
              {icon && (
                <div className="bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm text-xl">
                  <i className={`fa-solid fa-${icon}`}></i>
                </div>
              )}
              <span className="bg-rose-500 px-3 py-2 rounded-full text-sm font-medium">
                {title}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Category Details</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                onClose();
                navigate(
                  `/services?category=${encodeURIComponent(title)}${
                    defaultServiceId ? `&serviceId=${defaultServiceId}` : ''
                  }`
                );
              }}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Browse Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;




// http://192.168.1.121:3000/beautyvista/services?category=string    
