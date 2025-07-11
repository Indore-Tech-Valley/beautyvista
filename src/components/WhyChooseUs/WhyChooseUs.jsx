import React from "react";
import { motion } from "framer-motion";
import { PiScissorsLight } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { PiFlowerLotusThin } from "react-icons/pi";

const images = [
  "https://5.imimg.com/data5/GLADMIN/Default/2022/6/SD/BO/IV/85062/women-hair-cut-services-250x250.jpg",
  "https://media.istockphoto.com/id/516981844/photo/hairdresser-washing-hair.jpg?s=612x612&w=0&k=20&c=U4DecDt3Vplgu7BVXMCeSC0cprGexeePIFMR2iZtxjo=",
  "https://cdn.shopify.com/s/files/1/0285/1004/files/shutterstock_391326496_large.jpg?v=1530168257"
];

const features = [
  {
    id: 1,
    icon: PiFlowerLotusThin,
    title: "Luxury Spa Treatments",
    description: "Relax your body and mind with our rejuvenating spa services.",
  },
  {
    id: 2,
    icon: PiScissorsLight,
    title: "Professional Hair Styling",
    description: "Trendy haircuts and stunning hairstyles by our experts.",
  },
  {
    id: 3,
    icon: HiOutlinePaintBrush,
    title: "Creative Makeup Artistry",
    description: "Makeup for every occasion to enhance your natural beauty.",
  },
  {
    id: 4,
    icon: GoPeople,
    title: "Friendly Atmosphere",
    description: "Warm and inviting space where every client feels special.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white lg:py-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h4 className="text-rose-900 font-semibold text-lg mb-2">Why Choose Us</h4>
            <motion.h2
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-700 leading-tight"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Unmatched Beauty Experience
            </motion.h2>
            <motion.p
              className="text-gray-700 text-lg sm:text-xl leading-relaxed"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              At BeautyVista, we blend expertise, creativity, and comfort to deliver top-notch beauty services. Your satisfaction and glow are our top priorities.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map(({ id, icon: Icon, title, description }) => (
              <div key={id}>
                <div className="flex items-center mb-4">
                  <Icon className="text-rose-900 text-4xl" />
                </div>
                <h5 className="font-semibold text-xl text-rose-900">{title}</h5>
                <p className="text-base text-gray-600 leading-relaxed mt-1">{description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Images Section */}
        <motion.div
          className="w-full lg:w-1/2 h-full flex items-stretch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
            <div className="flex flex-col gap-4 h-full">
              <motion.img
                src={images[0]}
                alt="Beauty service 1"
                className="rounded-lg shadow-md object-cover w-full lg:w-2/3 h-full lg:h-3/7 ml-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.img
                src={images[1]}
                alt="Beauty service 2"
                className="rounded-lg shadow-md object-cover w-full h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              />
            </div>
            <motion.div
              className="sm:h-5/6 h-auto sm:my-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <img
                src={images[2]}
                alt="Beauty service 3"
                className="rounded-lg shadow-md object-cover w-full h-full sm:h-full h-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
