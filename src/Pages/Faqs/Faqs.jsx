import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";

const faqData = [
  {
    question: "How do I book an appointment?",
    answer: "You can book appointments online through our website or call us directly to schedule your preferred time slot.",
  },
  {
    question: "What services do you offer?",
    answer: "We offer a wide range of services including facials, hair treatments, bridal makeup, waxing, manicures, and more.",
  },
  {
    question: "Are walk-ins accepted?",
    answer: "Yes, walk-ins are welcome, but we recommend booking in advance to ensure availability.",
  },
  {
    question: "Do you offer bridal makeup packages?",
    answer: "Absolutely! We have customizable bridal packages. Contact us for detailed pricing and trial sessions.",
  },
  {
    question: "What are your operating hours?",
    answer: "We are open from 10:00 AM to 8:00 PM every day, including weekends.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white text-gray-800 lg:py-8 py-6">
      {/* Breadcrumb */}
      {/* <BreadcrumbBanner 
        title="Frequently Asked Questions" 
        path="Home" 
        image="https://d2dfxqxblmblx4.cloudfront.net/images/hero/homepage.jpg" 
      /> */}

      <div className="max-w-7xl mx-auto px-6 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-rose-900 mb-4 lg:text-center text-left">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-left lg:text-center">
            Here are some common questions our clients ask. If you need further assistance, feel free to contact us anytime.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-rose-200 rounded-lg shadow-sm">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left px-6 py-2  text-lg hover:bg-rose-50 transition-all"
              >
                {faq.question}
                <span className=" text-left">{openIndex === index ? <FaMinus/> : <FaPlus/>}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 leading-relaxed text-md">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
