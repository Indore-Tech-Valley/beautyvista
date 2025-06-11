import React from 'react'
import { motion } from "framer-motion";

const CategoryCard = ({item}) => {
  return (
        <motion.div
              key={item.id}
              className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-[#8d6e63] p-3 rounded-full">
                  {item.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-[#0a1d42] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-5">{item.description}</p>
                <button className="text-[#8d6e63] font-medium hover:underline">
                  View Details →
                </button>
              </div>
            </motion.div>
  )
}

export default CategoryCard
