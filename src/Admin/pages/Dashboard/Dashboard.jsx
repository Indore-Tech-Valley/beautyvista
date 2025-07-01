import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminFetchAppointments } from '../../../redux/features/appointmentSlice/appointmentSlice';
import { adminFetchCategories } from '../../../redux/features/categoriesSlice/categoriesSlice';
import { adminFetchServices } from '../../../redux/features/servicesSlice/servicesSlice';
import { adminFetchContacts } from '../../../redux/features/contactFormSlice/contactFormSlice';
import { fetchAdminFAQs } from '../../../redux/features/faqsSlice/faqsSlice';


const StatCard = ({ title, value, change, color }) => (
  <div className="bg-white rounded-lg border-gray-200 shadow-sm p-4 sm:p-6 border w-full">
    <div>
      <p className="text-sm text-gray-600 mb-1 truncate">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && <p className={`text-xs ${color}`}>{change}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { services, loading: servicesLoading } = useSelector((state) => state.services);
  const { appointments, loading: appointmentsLoading } = useSelector((state) => state.appointments);
 const contactForms = useSelector((state) => state.contactForm?.contacts || []);
const contactFormsLoading = useSelector((state) => state.contactForm?.loading);

  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const { faqs, loading: faqsLoading } = useSelector((state) => state.faqs);

  const testimonials = [
    { id: 1, customer: 'Riya Sharma', review: 'Amazing service!' },
    { id: 2, customer: 'Deepa Singh', review: 'Loved the facial!' },
    { id: 3, customer: 'Kavita Verma', review: 'Great experience!' },
    { id: 4, customer: 'Pooja Jain', review: 'Highly recommend!' },
    { id: 5, customer: 'Simran Joshi', review: 'Will come again!' }
  ];

  useEffect(() => {
    dispatch(adminFetchServices());
    dispatch(adminFetchAppointments());
    dispatch(adminFetchContacts());
    dispatch(adminFetchCategories());
    dispatch(fetchAdminFAQs());
  }, [dispatch]);

useEffect(() => {
  dispatch(adminFetchContacts());
}, [dispatch]);

  // useEffect(() => {
  //   if (contactForms.length > 0) {
  //     console.log("Fetched Contact Forms:", contactForms);
  //   }
  // }, [contactForms]);

  const isLoading = servicesLoading || appointmentsLoading || contactFormsLoading || categoriesLoading || faqsLoading;
  if (isLoading) return <div className="p-6">Loading Dashboard...</div>;

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin!</div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Services" value={services.length} change="+3 this month" color="text-green-600" />
        <StatCard title="Appointments" value={appointments.length} change="+2 today" color="text-blue-600" />
        <StatCard title="Pending Testimonials" value={testimonials.length} change="2 new reviews" color="text-orange-600" />
        <StatCard title="Contact Forms" value={contactForms?.length || 0} change="3 unread" color="text-purple-600" />
      </div>

      {/* Main Grid: Appointments & Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold">Recent Appointments</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {appointments.slice(0, 5).map((a) => (
                <div key={a.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-gray-600">{a.email} • {a.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {a.appointment_date} at {a.appointment_time?.slice(0, 5)}
                    </p>
                    <span className="inline-block mt-1 sm:mt-0 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      upcoming
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold">Popular Services</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {services.slice(0, 5).map((service) => (
                <div key={service.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{service.price}</p>
                    <p className="text-sm text-gray-600">{service.duration} min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold">Latest FAQs</h3>
        </div>
        <div className="p-4 sm:p-6 space-y-4">
          {faqs.slice(0, 3).map((faq) => (
            <div key={faq.id}>
              <p className="font-medium">{faq.question}</p>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
 <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
  <div className="p-4 sm:p-6 border-b border-gray-200">
    <h3 className="text-base sm:text-lg font-semibold">Top Categories</h3>
  </div>

  <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {categories.slice(0, 6).map((category) => (
      <div key={category.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={category.category_image || '/placeholder.jpg'}
          alt={category.name}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 break-words">{category.name}</p>
          <p className="text-sm text-gray-500 break-words line-clamp-2">{category.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
