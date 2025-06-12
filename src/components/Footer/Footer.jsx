import logo from '../../assets/Logo.png';
import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12">

        {/* Logo & About */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-5">
            <img src={logo} alt="BeautyVista Logo" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            BeautyVista is your trusted beauty destination offering premium services for makeup, skincare, hair styling, and total body wellness. We bring elegance and care together.
          </p>
          <div className="flex gap-4 mt-6 text-xl text-gray-500">
            <FaFacebookF className="hover:text-rose-700 cursor-pointer" />
            <FaInstagram className="hover:text-rose-700 cursor-pointer" />
            <FaTwitter className="hover:text-rose-700 cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-rose-900 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-rose-700">Home</Link></li>
              <li><Link to="/services" className="hover:text-rose-700">Services</Link></li>
              <li><Link to="/categories" className="hover:text-rose-700">Categories</Link></li>
              <li><Link to="/about" className="hover:text-rose-700">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-rose-900 mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Makeup</li>
              <li>Hair Styling</li>
              <li>Pedicure</li>
              <li>Manicure</li>
              <li>Facial</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold text-rose-900 mb-5">Contact Us</h4>
            <ul className="space-y-5 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-rose-700 mt-1" />
                <span>Al-yoest St, Al Ain - UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-rose-700 mt-1" />
                <span>beautyvista@email.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-rose-700 mt-1" />
                <span>+971 254 4567</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-14 pt-6 text-center text-sm text-gray-500 px-6">
        BeautyVista © 2025 - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
