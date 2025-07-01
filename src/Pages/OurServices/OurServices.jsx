import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import CategoryWiseServices from "../../components/CategoryWiseServices/CategoryWiseServices";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";
import CategoryWiseServices from "../../components/CategoryWiseServices/CategoryWiseServices";

const OurServices = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const scrollToCategory = searchParams.get("category");

  const { services = [], loading, error } = useSelector(
    (state) => state.services || {}
  );

  const categoryRefs = useRef({});
  const normalizeKey = (str) => decodeURIComponent(str).toLowerCase().trim();


  // ✅ Fetch services on mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // ✅ Scroll to top + to category section if URL has query
useEffect(() => {
  if (!services.length || !scrollToCategory) return;

  const key = normalizeKey(scrollToCategory);

  // Delay scroll until DOM renders the target ref
  const timeout = setTimeout(() => {
    const section = categoryRefs.current[key];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 100); // 100ms is usually enough

  return () => clearTimeout(timeout);
}, [scrollToCategory, services]);
  


  // ✅ Extract unique categories from API response
  const uniqueCategories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="bg-white text-gray-800 md:pt-0 pt-12 mb-8 min-h-screen">
      <BreadcrumbBanner
        title="Services"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      {loading && <p className="text-center py-8 text-gray-500">Loading services...</p>}
      {error && <p className="text-center text-red-500 py-8">{error}</p>}
      {!loading && !error && uniqueCategories.length === 0 && (
        <p className="text-center py-8 text-gray-500">No services found.</p>
      )}

      {/* Render category-wise sections */}
     {uniqueCategories.map((category) => {
  const key = normalizeKey(category);
  return (
    <div key={category} ref={(el) => (categoryRefs.current[key] = el)}>
      <CategoryWiseServices category={category} />
    </div>
  );
})}

    </div>
  );
};

export default OurServices;
