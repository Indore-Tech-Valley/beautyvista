import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQs } from "../../redux/features/faqsSlice/faqsSlice";

const Faqs = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faqs);

  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 const visibleFaqs = showAll ? (faqs || []) : (faqs || []).slice(0, 5);


  return (
    <div className="w-full bg-white text-gray-800 lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-rose-900 mb-4 lg:text-center text-left">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl lg:mx-auto text-left lg:text-center">
            Here are some common questions our clients ask. If you need further assistance, feel free to contact us anytime.
          </p>
        </div>

        {loading && <p className="text-center text-gray-500">Loading FAQs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="max-w-3xl lg:mx-auto space-y-5">
              {visibleFaqs.map((faq, index) => (
                <div key={index} className="border border-rose-200 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center text-left px-6 py-2 text-lg hover:bg-rose-50 transition-all"
                  >
                    {faq.question}
                    <span>{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed text-md">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Toggle Button */}
            {faqs.length > 5 && (
              <div className="text-center mt-6 lg:mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="h-12 w-36 relative group inline-block bg-rose-700 hover:bg-rose-800 text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden transition-all duration-300"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    {showAll ? "Show Less" : "Show All"}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    {showAll ? "Show Less" : "Show All"}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Faqs;
