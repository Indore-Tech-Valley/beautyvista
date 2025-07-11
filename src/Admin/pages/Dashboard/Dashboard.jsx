import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchAppointments } from "../../../redux/features/appointmentSlice/appointmentSlice";
import { adminFetchCategories } from "../../../redux/features/categoriesSlice/categoriesSlice";
import { adminFetchServices } from "../../../redux/features/servicesSlice/servicesSlice";
import { fetchAdminFAQs } from "../../../redux/features/faqsSlice/faqsSlice";
import { adminFetchContacts } from "../../../redux/features/contactFormSlice/contactFormSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dayjs from "dayjs";
import {
  Layers,
  Calendar,
  MessageSquare,
  Inbox,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";

// Stat Card component
const StatCard2 = ({ title, value, change, color, icon: Icon }) => (
  <div className="bg-white border-l-4 border-gray-200 hover:border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-xs mt-2 ${color} flex items-center`}>
          <span className="mr-1">↗</span>
          {change}
        </p>
      </div>
      <div className="p-3 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
        <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
      </div>
    </div>
  </div>
);

// Missing Function Added Here
const getServiceWiseAppointmentData = (appointments, services) => {
  const serviceMap = {};
  services.forEach((s) => {
    serviceMap[s.id] = s.name;
  });

  const data = {};
  appointments.forEach((a) => {
    const serviceName = serviceMap[a.service_id] || "Unknown";
    if (!data[serviceName]) data[serviceName] = 0;
    data[serviceName]++;
  });

  return Object.entries(data).map(([name, value]) => ({ name, value }));
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { services, loading: servicesLoading } = useSelector(
    (state) => state.services
  );
  const { appointments, loading: appointmentsLoading } = useSelector(
    (state) => state.appointments
  );
  const contactForms = useSelector(
    (state) => state.contactForm?.contacts || []
  );
  const contactFormsLoading = useSelector(
    (state) => state.contactForm?.loading
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { faqs, loading: faqsLoading } = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(adminFetchServices());
    dispatch(adminFetchAppointments());
    dispatch(adminFetchContacts());
    dispatch(adminFetchCategories());
    dispatch(fetchAdminFAQs());
  }, [dispatch]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getMonthlyAppointmentCounts = (appointments) => {
    const counts = {};
    appointments.forEach(({ appointment_date }) => {
      const month = dayjs(appointment_date).format("YYYY-MM");
      if (!counts[month]) counts[month] = 0;
      counts[month]++;
    });
    return Object.entries(counts)
      .map(([month, count]) => ({
        month: dayjs(month).format("MMM YYYY"),
        count,
      }))
      .sort((a, b) => (dayjs(a.month).isAfter(dayjs(b.month)) ? 1 : -1));
  };

  const getMonthlyCounts = (contacts) => {
    const monthlyCount = {};
    contacts.forEach((contact) => {
      const date = parseISO(contact.created_at);
      const month = format(date, "yyyy-MM");
      if (!monthlyCount[month]) {
        monthlyCount[month] = 0;
      }
      monthlyCount[month]++;
    });
    return Object.entries(monthlyCount).map(([month, count]) => ({
      month: format(parseISO(`${month}-01`), "MMM yyyy"),
      count,
    }));
  };

  const monthlyAppointmentData = getMonthlyAppointmentCounts(appointments);
  const monthlyData = getMonthlyCounts(contactForms);
  const serviceWiseData = getServiceWiseAppointmentData(appointments, services);

  const testimonials = [
    { id: 1, customer: "Riya Sharma", review: "Amazing service!" },
    { id: 2, customer: "Deepa Singh", review: "Loved the facial!" },
    { id: 3, customer: "Kavita Verma", review: "Great experience!" },
    { id: 4, customer: "Pooja Jain", review: "Highly recommend!" },
    { id: 5, customer: "Simran Joshi", review: "Will come again!" },
  ];

  const COLORS = [
    "#3b82f6",
    "#f97316",
    "#10b981",
    "#f43f5e",
    "#8b5cf6",
    "#ec4899",
    "#22d3ee",
    "#eab308",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, payload: entry } = payload[0];
      return (
        <div className="bg-white border border-gray-300 shadow-md rounded px-3 py-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            ></span>
            <span className="text-sm text-gray-800 font-medium">
              {name}: {value}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const isLoading =
    servicesLoading ||
    appointmentsLoading ||
    contactFormsLoading ||
    categoriesLoading ||
    faqsLoading;

  if (isLoading) return <div className="p-6">Loading Dashboard...</div>;

  return (
    <div className="space-y-6 px-4 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin!</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link to="/admin/services">
          <StatCard2
            title="Total Services"
            value={services.length}
            change="+3 this month"
            color="text-green-600"
            icon={Layers}
          />
        </Link>

        <Link to="/admin/appointments">
          <StatCard2
            title="Appointments"
            value={appointments.length}
            change="+2 today"
            color="text-blue-600"
            icon={Calendar}
          />
        </Link>

        <Link to="/admin">
          <StatCard2
            title="Pending Testimonials"
            value={testimonials.length}
            change="2 new reviews"
            color="text-orange-600"
            icon={MessageSquare}
          />
        </Link>

        <Link to="/admin/contactForms">
          <StatCard2
            title="Contact Forms"
            value={contactForms?.length || 0}
            change="3 unread"
            color="text-purple-600"
            icon={Inbox}
          />
        </Link>
      </div>

      
      <div className="w-full flex flex-col lg:flex-row gap-6  ">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mt-4 lg:w-1/2 w-full">
          <h3 className="text-lg font-semibold mb-4">
            Appointments by Service
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceWiseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceWiseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mt-4 lg:w-1/2 w-full">
          <h3 className="text-lg font-semibold mb-4">Queries by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mt-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Appointments</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyAppointmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Main Grid: Appointments & Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Appointments
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Latest scheduled appointments
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {appointments.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">
                        {a.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-500">{a.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(a.appointment_date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {a.appointment_time?.slice(0, 5)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Services */}
        {/* Recent Contact Queries */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Contact Queries
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Latest messages from customers
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {contactForms.slice(0,4).map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Mail size={14} className="text-gray-500" />
                      {contact.email}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(contact.created_at)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone size={14} className="text-gray-500" />
                    {contact.phone}
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MessageCircle size={14} className="text-gray-500 mt-0.5" />
                    <p className="flex-1 line-clamp-2">"{contact.message}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      {/* <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
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
      </div> */}

      {/* Top Categories */}
      {/* <div className="bg-white rounded-lg border-gray-200 shadow-sm border overflow-hidden">
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
</div> */}
    </div>
  );
};

export default Dashboard;
