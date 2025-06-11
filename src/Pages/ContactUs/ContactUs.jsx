import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaPaperPlane } from "react-icons/fa";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";

const ContactUs = () => {
  return (
    <div className="w-full px-4 py-12 bg-white text-gray-800">
        <div>
            <BreadcrumbBanner title="Contact Us" path="Home" image={`https://www.priyankabeautyspa.com/images/slider/herbal-facial-beauty-salon-chennai.jpg`} />
        </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 py-8 gap-10">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600 mb-6">Any question? We would be happy to help you!</p>
          <div className="space-y-4">
            <div className="flex items-center p-3 border rounded-md">
              <FaPhoneAlt className="text-gray-600 mr-3" />
              <span>+0123456789</span>
            </div>
            <div className="flex items-center p-3 bg-gray-900 text-white rounded-md">
              <FaEnvelope className="mr-3" />
              <span>example@email.com</span>
            </div>
         <div className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition">
  <FaMapMarkerAlt className="text-gray-600 mr-3" />
  <a
    href="https://www.google.com/maps/search/?api=1&query=Indore+tech+Valley,indore"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-800"
  >
    Indore tech Valley, Indore
  </a>
</div>
<span className="text-xs text-red-500">Note : Click on location for get route of our beauty parlour</span>

          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="bg-gray-900 text-white p-2 rounded-full">
              <FaFacebookF />
            </div>
            <div className="bg-gray-900 text-white p-2 rounded-full">
              <FaTwitter />
            </div>
            <div className="bg-gray-900 text-white p-2 rounded-full">
              <FaInstagram />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your first name"
              className="border p-3 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Your last name"
              className="border p-3 rounded-md w-full"
            />
          </div>
          <input
            type="email"
            placeholder="youremail@email.com"
            className="border p-3 rounded-md w-full"
          />
          <input
            type="tel"
            placeholder="+9876543210"
            className="border p-3 rounded-md w-full"
          />
          <textarea
            rows={4}
            placeholder="Type your message here..."
            className="border p-3 rounded-md w-full"
          ></textarea>
          <button className="bg-gray-900 hover:bg-gray-800 text-white w-full py-3 rounded-md flex items-center justify-center gap-2">
            Send Message <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
