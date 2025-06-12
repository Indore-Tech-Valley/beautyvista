import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaPaperPlane } from "react-icons/fa";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";

const ContactUs = () => {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Breadcrumb */}
      <BreadcrumbBanner 
        title="Contact Us" 
        path="Home" 
        image="https://www.priyankabeautyspa.com/images/slider/herbal-facial-beauty-salon-chennai.jpg" 
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        
        {/* Left Column */}
        <div>
          <h2 className="text-4xl font-bold text-rose-900 mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">Have any questions? We're always here to assist you and make your experience smooth and comfortable!</p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <FaPhoneAlt className="text-rose-700 text-xl" />
              <span className="text-lg">+0123456789</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-rose-700 text-white rounded-lg">
              <FaEnvelope className="text-xl" />
              <span className="text-lg">example@email.com</span>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-rose-50 transition cursor-pointer">
              <FaMapMarkerAlt className="text-rose-700 text-xl" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Indore+tech+Valley,indore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-800"
              >
                Indore Tech Valley, Indore
              </a>
            </div>
            <span className="text-sm text-rose-500">Note: Click on location to get directions to our beauty studio.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-10">
            <div className="bg-rose-700 text-white p-3 rounded-full hover:bg-rose-800 transition">
              <FaFacebookF className="text-lg" />
            </div>
            <div className="bg-rose-700 text-white p-3 rounded-full hover:bg-rose-800 transition">
              <FaTwitter className="text-lg" />
            </div>
            <div className="bg-rose-700 text-white p-3 rounded-full hover:bg-rose-800 transition">
              <FaInstagram className="text-lg" />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="border p-4 rounded-md w-full" />
            <input type="text" placeholder="Last Name" className="border p-4 rounded-md w-full" />
          </div>
          <input type="email" placeholder="Email Address" className="border p-4 rounded-md w-full" />
          <input type="tel" placeholder="Phone Number" className="border p-4 rounded-md w-full" />
          <textarea rows={5} placeholder="Type your message here..." className="border p-4 rounded-md w-full"></textarea>

          <button className="bg-rose-700 hover:bg-rose-800 text-white w-full py-4 rounded-md flex items-center justify-center gap-3 text-lg font-medium">
            Send Message <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
