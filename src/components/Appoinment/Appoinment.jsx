import React from "react";
import { Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Appointment = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:py-24 py-12">
      <div className="md:flex md:items-start md:gap-8">
        {/* Left: Form */}
        <div className="md:w-1/2 bg-white rounded-2xl p-6 shadow min-h-[480px] flex flex-col justify-between lg:h-[740px] md:h-[758px]  sm:h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
                Book Your Appointment
              </h2>
            </div>
            <p className="mb-8 max-w-md text-gray-500 text-base sm:text-lg">
              Schedule your beauty session today at BeautyVista. From hair styling to skincare, we offer personalized services to help you look and feel your best. Book now and glow with confidence!
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="service" className="block mb-1 text-gray-700 font-medium">
                  Select Service
                </label>
                <select id="service" className="w-full border border-gray-300 rounded-md px-4 py-3">
                  <option>Select Service</option>
                  <option>Hair Styling</option>
                  <option>Facial</option>
                  <option>Makeup</option>
                  <option>Manicure & Pedicure</option>
                  <option>Body Spa</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="date" className="block mb-1 text-gray-700 font-medium">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-4 py-3"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="time" className="block mb-1 text-gray-700 font-medium">
                    Time
                  </label>
                  <select id="time" className="w-full border border-gray-300 rounded-md px-2 py-3">
                    <option>Select Time</option>
                    <option>10:00 AM</option>
                    <option>12:30 PM</option>
                    <option>3:00 PM</option>
                    <option>5:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-md px-2 py-3"
                ></textarea>
              </div>

              <Link
                to="/"
                className="relative group block w-full sm:w-auto text-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
              >
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                  Book Appointment
                </span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  Book Appointment
                </span>
              </Link>

            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative rounded-2xl overflow-hidden shadow lg:h-[740px] md:h-[758px] sm:h-full">
          <img
            src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
            alt="BeautyVista Parlor"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 text-white rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-sm shadow-lg">
            <Clock className="w-6 h-6 text-white" />
            <div>
              <p className="font-semibold text-white">Opening Hours</p>
              <p className="text-sm text-white/80">Mon to Sun 09:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
