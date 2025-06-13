// ContactUs.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPaperPlane
} from "react-icons/fa";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";

const ContactUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#ContactUs') {
      const element = document.getElementById('ContactUs');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay ensures element is mounted
      }
    }
  }, [location]);

  return (
    <div id="ContactUs" className="w-full bg-white text-gray-800 md:pt-0 pt-12 mb-8">
      {/* Breadcrumb */}
      <BreadcrumbBanner 
        title="Contact Us" 
        path="Home" 
        image="https://www.priyankabeautyspa.com/images/slider/herbal-facial-beauty-salon-chennai.jpg" 
      />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 lg:py-8 py-6">
        <div className="flex flex-col lg:flex-row lg:gap-20 gap-8 items-start">
          
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-rose-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                Have any questions? We're always here to assist you and make your experience smooth and comfortable!
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-5 border rounded-2xl shadow-sm bg-white">
                <FaPhoneAlt className="text-rose-700 text-2xl" />
                <span className="text-lg">+0123456789</span>
              </div>

              <div className="flex items-center gap-4 p-5 bg-rose-700 text-white rounded-2xl shadow-sm">
                <FaEnvelope className="text-2xl" />
                <span className="text-lg">example@email.com</span>
              </div>

              <div className="flex items-center gap-4 p-5 border rounded-2xl shadow-sm hover:bg-rose-50 transition cursor-pointer">
                <FaMapMarkerAlt className="text-rose-700 text-2xl" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Indore+tech+Valley,indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-800"
                >
                  Indore Tech Valley, Indore
                </a>
              </div>

              <span className="text-sm text-rose-500 block">
                Note: Click on location to get directions to our beauty studio.
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
               <div
  key={idx}
  className="relative w-12 h-12 bg-rose-700 text-white rounded-full overflow-hidden group transition"
>
  {/* Top layer (initial icon) */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
    <Icon className="text-lg" />
  </span>

  {/* Bottom layer (icon sliding in) */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
    <Icon className="text-lg" />
  </span>
</div>

              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg lg:p-8 p-2 rounded-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="border p-4 rounded-md w-full focus:outline-rose-700" />
              <input type="text" placeholder="Last Name" className="border p-4 rounded-md w-full focus:outline-rose-700" />
            </div>

            <input type="email" placeholder="Email Address" className="border p-4 rounded-md w-full focus:outline-rose-700" />
            <input type="tel" placeholder="Phone Number" className="border p-4 rounded-md w-full focus:outline-rose-700" />
            <textarea rows={5} placeholder="Type your message here..." className="border p-4 rounded-md w-full focus:outline-rose-700"></textarea>

            <button className="lg:w-full relative group block w-full sm:w-auto text-center bg-rose-700 hover:bg-rose-700 text-white px-6 py-4 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[50px] transition-colors duration-300 ease-in-out">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                Send Message <FaPaperPlane className="ml-2" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                Send Message <FaPaperPlane className="ml-2" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
