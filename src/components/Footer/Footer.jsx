import logo from "../../assets/Logo.png";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  DollarSign,
  Calendar,
  Phone,
  MapPin,
  User,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Shield,
  Heart,
  Sparkles,
  Camera,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from "lucide-react";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {

   const dispatch = useDispatch();
  const { services = [] } = useSelector((state) => state.services || {});
 const [uniqueCategories, setUniqueCategories] = useState([]);


useEffect(() => {
  dispatch(fetchServices());
}, [dispatch]);

useEffect(() => {
  const categories = services.map((s) => s.category).filter(Boolean);
  const unique = [...new Set(categories)];
  setUniqueCategories(unique);
}, [services]);


  
  return (
    <footer className="bg-gray-900 text-white py-6 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12">
        {/* Logo & About */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-5">
            <img src={logo} alt="BeautyVista Logo" className="h-9 w-auto" />
          </div>
          <p className="text-sm text-white leading-relaxed tracking-wider">
            BeautyVista is your trusted beauty destination offering premium
            services for makeup, skincare, hair styling, and total body
            wellness.
          </p>
         <div className="flex gap-4 mt-4">
  {[Instagram, Facebook, Twitter].map((Icon, idx) => (
    <div
      key={idx}
      className="relative group w-9 h-9 bg-rose-600 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Top Layer */}
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
        <Icon className="w-5 h-5 text-white" />
      </span>
      {/* Bottom Layer */}
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
        <Icon className="w-5 h-5 text-white" />
      </span>
    </div>
  ))}
</div>

        </div>

        {/* Links Section */}
        <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white-900 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-rose-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rose-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-rose-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400">
                  Contact Us
                </Link>
              </li>
              {/* <li><Link to="/privacy" className="hover:text-rose-400">Privacy Policy</Link></li>
              <li><Link to="/termsConditions" className="hover:text-rose-400">Terms & Conditions</Link></li> */}
            </ul>
          </div>

          {/* Services */}
      {/* Categories instead of Services */}
<div>
  <h4 className="text-lg font-semibold mb-5">Categories</h4>
 <ul className="space-y-3 text-sm text-gray-300">
  {uniqueCategories.slice(0, 6).map((cat) => (
    <li key={cat}>
      <Link
        to={`/services?category=${encodeURIComponent(cat)}`}
        className="hover:text-rose-400 cursor-pointer"
      >
        {cat}
      </Link>
    </li>
  ))}
</ul>

</div>


          {/* Contact Us */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-5">
              Contact Us
            </h4>
            <ul className="space-y-5 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-rose-600 mt-1" />
                <span className="hover:text-rose-400 cursor-pointer">Al-yoest St, Al Ain - UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-rose-600 mt-1" />
                <span className="hover:text-rose-400 cursor-pointer">beautyvista@email.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-rose-600 mt-1" />
                <span className="hover:text-rose-400 cursor-pointer">+971 254 4567</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-8 pt-6 px-6 text-sm text-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            BeautyVista © 2025 - All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-rose-400">
              Privacy Policy
            </Link>
            <Link to="/termsConditions" className="hover:text-rose-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
