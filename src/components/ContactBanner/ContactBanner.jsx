import React from 'react';
import { Phone, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const contactItems = [
  {
    id: 1,
    icon: Phone,
    title: "Need Beauty Services?",
    info: "Call: +91 9876543210",
    isLink: false,
  },
  {
    id: 2,
    icon: Clock,
    title: "Opening Hours",
    info: "Mon - Sun: 10:00 AM - 8:00 PM",
    isLink: false,
  },
  {
    id: 3,
    icon: MapPin,
    title: "Visit Our Studio",
    info: "Indore Tech Valley, Indore",
    isLink: true,
    href: "https://www.google.com/maps/search/?api=1&query=Indore+Tech+Valley,indore",
  },
];

const ContactBanner = () => {
  return (
    <div className="w-full bg-rose-50 text-rose-900 lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6  flex flex-col md:flex-col lg:flex-row justify-around">
        {contactItems.map(({ id, icon: Icon, title, info, isLink, href }, index) => (
          <React.Fragment key={id}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-center space-x-5"
            >
              <div className="bg-white text-rose-700 p-4 rounded-full shadow-lg">
                <Icon className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xl font-semibold mb-1">{title}</p>
                {isLink ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-700 hover:underline transition"
                  >
                    {info}
                  </a>
                ) : (
                  <p className="text-gray-600">{info}</p>
                )}
              </div>
            </motion.div>

            {/* Divider except after the last item */}
            {index !== contactItems.length - 1 && (
              <div className="w-px h-16 bg-rose-300 opacity-40 my-2 lg:my-0"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ContactBanner;
