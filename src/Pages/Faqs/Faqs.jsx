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
    <div className="py-12 px-4 bg-white">
        <div>
            <BreadcrumbBanner title="Frequently Asked Questions" path="Home" image={`https://d2dfxqxblmblx4.cloudfront.net/images/hero/homepage.jpg`} />
        </div>
      <div className="max-w-4xl mx-auto text-center mb-10 py-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-500">
          The rise of mobile devices transforms the way we consume information entirely and the world's most relevant channels such as Facebook.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 mb-3 rounded-md overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 font-semibold text-left text-gray-900 hover:bg-gray-200 transition"
            >
              {faq.question}
              <span>{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
