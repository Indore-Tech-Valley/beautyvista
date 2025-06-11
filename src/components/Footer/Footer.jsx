import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiLeaf } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-white text-[#333] py-10 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12">
        {/* Logo & About */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-5">
            <BiLeaf className="text-[#8d6e63] text-4xl" />
            <h2 className="text-3xl font-semibold tracking-wide">BeautyVista</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            BeautyVista is your trusted beauty destination offering premium services for makeup, skincare, hair styling, and total body wellness. We bring elegance and care together.
          </p>
          <div className="flex gap-4 mt-6 text-xl text-gray-500">
            <FaFacebookF className="hover:text-[#8d6e63] cursor-pointer" />
            <FaInstagram className="hover:text-[#8d6e63] cursor-pointer" />
            <FaTwitter className="hover:text-[#8d6e63] cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link to="/" className="hover:text-[#8d6e63]">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#8d6e63]">Services</Link></li>
              <li><Link to="/faq" className="hover:text-[#8d6e63]">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-[#8d6e63]">Contact Us</Link></li>
              <li><Link to="/articles" className="hover:text-[#8d6e63]">Articles</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>Makeup</li>
              <li>Hair Styling</li>
              <li>Pedicure</li>
              <li>Manicure</li>
              <li>Facial</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-5 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#8d6e63] mt-1" />
                <span>Al-yoest St, Al Ain - UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#8d6e63] mt-1" />
                <span>beautyvista@email.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#8d6e63] mt-1" />
                <span>+971 254 4567</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t mt-14 pt-6 text-center text-sm text-gray-500 px-6">
        BeautyVista © 2025 - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
