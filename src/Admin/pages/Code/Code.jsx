// import React, { useState } from 'react';
// import Auth from '../Auth/Auth';
// import {
//   Home,
//   Scissors,
//   Grid3X3,
//   Calendar,
//   HelpCircle,
//   MessageSquare,
//   Star,
//   Settings,
//   Plus,
//   Edit,
//   Trash2,
//   Search,
//   Filter,
//   Eye,
//   Check,
//   X,
//   User,
//   Clock,
//   Phone,
//   Mail,
//   LogOut,
//   ChevronDown,
//   Bell
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// // ...existing code...
// const Dashboard = () => {
  
//   const navigate = useNavigate();
//   // ...existing code...
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const currentUser = {
//     name: 'Admin User',
//     email: 'admin@beautyvista.com',
//     role: 'Super Admin',
//     avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=ec4899&color=fff'
//   };

//   const [services, setServices] = useState([
//     { id: 1, name: 'Hair Cut & Styling', category: 'Hair Care', price: 500, duration: '45 min', status: 'active' },
//     { id: 2, name: 'Facial Treatment', category: 'Skin Care', price: 800, duration: '60 min', status: 'active' },
//     { id: 3, name: 'Manicure & Pedicure', category: 'Nail Care', price: 600, duration: '90 min', status: 'active' },
//   ]);

//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Hair Care', services: 15, status: 'active' },
//     { id: 2, name: 'Skin Care', services: 8, status: 'active' },
//     { id: 3, name: 'Nail Care', services: 6, status: 'active' },
//   ]);

//   const [appointments, setAppointments] = useState([
//     { id: 1, customer: 'Priya Sharma', service: 'Hair Cut & Styling', date: '2024-06-25', time: '10:00 AM', status: 'confirmed', phone: '+91 98765 43210' },
//     { id: 2, customer: 'Anita Patel', service: 'Facial Treatment', date: '2024-06-25', time: '2:00 PM', status: 'pending', phone: '+91 98765 43211' },
//     { id: 3, customer: 'Sunita Gupta', service: 'Manicure & Pedicure', date: '2024-06-26', time: '11:00 AM', status: 'confirmed', phone: '+91 98765 43212' },
//   ]);

//   const [faqs, setFaqs] = useState([
//     { id: 1, question: 'What are your operating hours?', answer: 'We are open from 9:00 AM to 8:00 PM, Monday to Sunday.', status: 'published' },
//     { id: 2, question: 'Do you accept walk-in customers?', answer: 'We prefer appointments, but walk-ins are welcome based on availability.', status: 'published' },
//   ]);

//   const [testimonials, setTestimonials] = useState([
//     { id: 1, customer: 'Kavya Singh', rating: 5, comment: 'Amazing service! The staff is very professional and skilled.', status: 'approved', date: '2024-06-20' },
//     { id: 2, customer: 'Meera Jain', rating: 4, comment: 'Great experience overall. Will definitely come back!', status: 'pending', date: '2024-06-22' },
//   ]);

//   const [contacts, setContacts] = useState([
//     { id: 1, name: 'Riya Mehta', email: 'riya@email.com', subject: 'Booking Inquiry', message: 'I would like to book a bridal package...', date: '2024-06-24', status: 'new' },
//     { id: 2, name: 'Neha Agarwal', email: 'neha@email.com', subject: 'Service Question', message: 'Do you provide home services?', date: '2024-06-23', status: 'replied' },
//   ]);

//   const handleLogin = (authenticated) => {
//     setIsAuthenticated(authenticated);
//     if (authenticated) {
//       setActiveTab('dashboard');
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setActiveTab('dashboard');
//     setShowDropdown(false);
//   };

//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home },
//     { id: 'services', label: 'Services', icon: Scissors },
//     { id: 'categories', label: 'Categories', icon: Grid3X3 },
//     { id: 'appointments', label: 'Appointments', icon: Calendar },
//     { id: 'faqs', label: 'FAQs', icon: HelpCircle },
//     { id: 'contacts', label: 'Contact Forms', icon: MessageSquare },
//     { id: 'testimonials', label: 'Testimonials', icon: Star },
//     { id: 'config', label: 'Frontend Config', icon: Settings },
//   ];

//   const StatCard = ({ title, value, change, color }) => (
//     <div className="bg-white rounded-lg border-gray-200 shadow-sm p-6 border">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-600 mb-1">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//           <p className={`text-xs ${color}`}>{change}</p>
//         </div>
//       </div>
//     </div>
//   );

//   // Navigation Header Component
//   const NavigationHeader = () => (
//     <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 capitalize">
//             {activeTab === 'dashboard' ? 'Dashboard' : activeTab.replace(/([A-Z])/g, ' $1')}
//           </h2>
//         </div>
//         <div className="flex items-center gap-4">
//           {/* Notifications */}
//           <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
//             <Bell size={20} />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               3
//             </span>
//           </button>
//           {/* User Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg border-gray-200 transition-colors"
//             >
//               <img
//                 src={currentUser.avatar}
//                 alt={currentUser.name}
//                 className="w-8 h-8 rounded-full"
//               />
//               <div className="text-left hidden sm:block">
//                 <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
//                 <p className="text-xs text-gray-500">{currentUser.role}</p>
//               </div>
//               <ChevronDown className="text-gray-400" size={16} />
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border-gray-200 shadow-lg border py-2 z-50">
//                 <div className="px-4 py-2 border-b border-gray-200">
//                   <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
//                   <p className="text-xs text-gray-500">{currentUser.email}</p>
//                 </div>
//                <button
//   onClick={() => {
//     setShowDropdown(false);
//     navigate('/admin/adminProfile');
//   }}
//   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
// >
//   <User size={14} />
//   Profile Settings
// </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                 >
//                   <LogOut size={14} />
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <div className="text-sm text-gray-500">Welcome back, Admin!</div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Services" value="29" change="+3 this month" color="text-green-600" />
//         <StatCard title="Today's Appointments" value="12" change="+2 from yesterday" color="text-blue-600" />
//         <StatCard title="Pending Testimonials" value="5" change="2 new reviews" color="text-orange-600" />
//         <StatCard title="Contact Forms" value="8" change="3 unread" color="text-purple-600" />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">Recent Appointments</h3>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {appointments.slice(0, 3).map(appointment => (
//                 <div key={appointment.id} className="flex items-center justify-between py-2">
//                   <div>
//                     <p className="font-medium">{appointment.customer}</p>
//                     <p className="text-sm text-gray-600">{appointment.service}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium">{appointment.time}</p>
//                     <span className={`inline-block px-2 py-1 rounded-full text-xs ${
//                       appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {appointment.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">Popular Services</h3>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {services.slice(0, 3).map(service => (
//                 <div key={service.id} className="flex items-center justify-between py-2">
//                   <div>
//                     <p className="font-medium">{service.name}</p>
//                     <p className="text-sm text-gray-600">{service.category}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium">₹{service.price}</p>
//                     <p className="text-sm text-gray-600">{service.duration}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderServices = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
//         <button className="bg-pink-600 text-white px-4 py-2 rounded-lg border-gray-200 flex items-center gap-2 hover:bg-pink-700">
//           <Plus size={16} />
//           Add Service
//         </button>
//       </div>
//       <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//                 <input
//                   type="text"
//                   placeholder="Search services..."
//                   className="pl-10 pr-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                 <Filter size={16} />
//                 Filter
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {services.map(service => (
//                 <tr key={service.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{service.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-600">{service.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-900">₹{service.price}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-600">{service.duration}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                       {service.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Edit size={16} />
//                       </button>
//                       <button className="text-red-600 hover:text-red-800">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderCategories = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
//         <button className="bg-pink-600 text-white px-4 py-2 rounded-lg border-gray-200 flex items-center gap-2 hover:bg-pink-700">
//           <Plus size={16} />
//           Add Category
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map(category => (
//           <div key={category.id} className="bg-white rounded-lg border-gray-200 shadow-sm border p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
//               <div className="flex items-center gap-2">
//                 <button className="text-blue-600 hover:text-blue-800">
//                   <Edit size={16} />
//                 </button>
//                 <button className="text-red-600 hover:text-red-800">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600">{category.services} services</p>
//               <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                 {category.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderAppointments = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Appointments Management</h1>
//         <button className="bg-pink-600 text-white px-4 py-2 rounded-lg border-gray-200 flex items-center gap-2 hover:bg-pink-700">
//           <Plus size={16} />
//           New Appointment
//         </button>
//       </div>
//       <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search appointments..."
//                 className="pl-10 pr-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>
//             <select className="border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
//               <option>All Status</option>
//               <option>Confirmed</option>
//               <option>Pending</option>
//               <option>Completed</option>
//               <option>Cancelled</option>
//             </select>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {appointments.map(appointment => (
//                 <tr key={appointment.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <User className="text-gray-400 mr-2" size={16} />
//                       <span className="font-medium text-gray-900">{appointment.customer}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-600">{appointment.service}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center text-gray-600">
//                       <Clock className="mr-1" size={14} />
//                       {appointment.date} at {appointment.time}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="mr-1" size={14} />
//                       {appointment.phone}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-block px-2 py-1 rounded-full text-xs ${
//                       appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {appointment.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <button className="text-green-600 hover:text-green-800" title="Confirm">
//                         <Check size={16} />
//                       </button>
//                       <button className="text-blue-600 hover:text-blue-800" title="Edit">
//                         <Edit size={16} />
//                       </button>
//                       <button className="text-red-600 hover:text-red-800" title="Cancel">
//                         <X size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderFAQs = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
//         <button className="bg-pink-600 text-white px-4 py-2 rounded-lg border-gray-200 flex items-center gap-2 hover:bg-pink-700">
//           <Plus size={16} />
//           Add FAQ
//         </button>
//       </div>
//       <div className="space-y-4">
//         {faqs.map(faq => (
//           <div key={faq.id} className="bg-white rounded-lg border-gray-200 shadow-sm border">
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
//                   <p className="text-gray-600 mb-4">{faq.answer}</p>
//                   <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                     {faq.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 ml-4">
//                   <button className="text-blue-600 hover:text-blue-800">
//                     <Edit size={16} />
//                   </button>
//                   <button className="text-red-600 hover:text-red-800">
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderContacts = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Contact Form Messages</h1>
//         <div className="flex items-center gap-2">
//           <select className="border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
//             <option>All Messages</option>
//             <option>New</option>
//             <option>Replied</option>
//           </select>
//         </div>
//       </div>
//       <div className="space-y-4">
//         {contacts.map(contact => (
//           <div key={contact.id} className="bg-white rounded-lg border-gray-200 shadow-sm border">
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
//                     <span className={`inline-block px-2 py-1 rounded-full text-xs ${
//                       contact.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {contact.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
//                     <div className="flex items-center">
//                       <Mail className="mr-1" size={14} />
//                       {contact.email}
//                     </div>
//                     <span>{contact.date}</span>
//                   </div>
//                   <h4 className="font-medium text-gray-800 mb-2">Subject: {contact.subject}</h4>
//                   <p className="text-gray-600">{contact.message}</p>
//                 </div>
//                 <div className="flex items-center gap-2 ml-4">
//                   <button className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-b border-gray-200lue-600 rounded text-sm">
//                     Reply
//                   </button>
//                   <button className="text-red-600 hover:text-red-800">
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderTestimonials = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
//         <div className="flex items-center gap-2">
//           <select className="border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
//             <option>All Testimonials</option>
//             <option>Approved</option>
//             <option>Pending</option>
//           </select>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {testimonials.map(testimonial => (
//           <div key={testimonial.id} className="bg-white rounded-lg border-gray-200 shadow-sm border">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h3 className="font-medium text-gray-900">{testimonial.customer}</h3>
//                     <div className="flex items-center">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="text-yellow-400 fill-current" size={16} />
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-3">{testimonial.comment}</p>
//                   <div className="flex items-center gap-3">
//                     <span className="text-sm text-gray-500">{testimonial.date}</span>
//                     <span className={`inline-block px-2 py-1 rounded-full text-xs ${
//                       testimonial.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {testimonial.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 {testimonial.status === 'pending' && (
//                   <button className="text-green-600 hover:text-green-800 px-3 py-1 border border-green-600 rounded text-sm">
//                     Approve
//                   </button>
//                 )}
//                 <button className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded text-sm">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderConfig = () => (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-900">Frontend Configuration</h1>
      
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">Site Settings</h3>
//           </div>
//           <div className="p-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
//                 <input 
//                   type="text" 
//                   defaultValue="BeautyVista" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Tagline</label>
//                 <input 
//                   type="text" 
//                   defaultValue="Your Beauty, Our Passion" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input 
//                   type="text" 
//                   defaultValue="+91 98765 43210" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input 
//                   type="email" 
//                   defaultValue="info@beautyvista.com" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//               <textarea 
//                 rows="3" 
//                 defaultValue="123 Beauty Street, Fashion District, Mumbai - 400001"
//                 className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">Business Hours</h3>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
//                 <input 
//                   type="time" 
//                   defaultValue="09:00" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
//                 <input 
//                   type="time" 
//                   defaultValue="20:00" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">Social Media Links</h3>
//           </div>
//           <div className="p-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
//                 <input 
//                   type="url" 
//                   placeholder="https://facebook.com/beautyvista" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
//                 <input 
//                   type="url" 
//                   placeholder="https://instagram.com/beautyvista" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
//                 <input 
//                   type="url" 
//                   placeholder="https://twitter.com/beautyvista" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
//                 <input 
//                   type="url" 
//                   placeholder="https://youtube.com/beautyvista" 
//                   className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold">SEO Settings</h3>
//           </div>
//           <div className="p-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//               <input 
//                 type="text" 
//                 defaultValue="BeautyVista - Premium Beauty Parlour Services" 
//                 className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//               <textarea 
//                 rows="3" 
//                 defaultValue="Transform your beauty with our premium beauty parlour services. Expert stylists, quality treatments, and personalized care for all your beauty needs."
//                 className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
//               <input 
//                 type="text" 
//                 defaultValue="beauty parlour, hair styling, facial treatment, makeup, nail care, spa" 
//                 className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button className="bg-pink-600 text-white px-6 py-2 rounded-lg border-gray-200 hover:bg-pink-700">
//             Save Configuration
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'dashboard': return renderDashboard();
//       case 'services': return renderServices();
//       case 'categories': return renderCategories();
//       case 'appointments': return renderAppointments();
//       case 'faqs': return renderFAQs();
//       case 'contacts': return renderContacts();
//       case 'testimonials': return renderTestimonials();
//       case 'config': return renderConfig();
//       default: return renderDashboard();
//     }
//   };

//   // Show login form if not authenticated
//   if (!isAuthenticated) {
//     return <Auth onLogin={handleLogin} />;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg overflow-y-auto custom-scroll">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-pink-600">BeautyVista</h2>
//           <p className="text-sm text-gray-600">Admin Panel</p>
//         </div>
//         <nav className="mt-6">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
//                   activeTab === item.id 
//                     ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600' 
//                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                 }`}
//               >
//                 <Icon className="mr-3" size={18} />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>
//       </div>
//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <NavigationHeader />
//         <div className="p-8">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Plus, Edit, Trash2, Check, X } from "lucide-react";
// import {
//   adminFetchServices,
//   addService,
//   updateService,
//   deleteService,
//   updateServiceStatus,
// } from "../../../redux/features/servicesSlice/servicesSlice";
// import AddButton from "../../components/AddButton/AddButton";

// const initialState = {
//   name: "",
//   category: "",
//   price: 0,
//   duration: 0,
//   description: "",
//   benefits: "",
//   includes: "",
//   beforeImage: null,
//   afterImage: null,
//   images: [],
// };

// const Services = () => {
//   const dispatch = useDispatch();
//   const {
//     services = [],
//     loading,
//     error,
//   } = useSelector((state) => state.services || {});

  
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [newService, setNewService] = useState(initialState);
//   const [editData, setEditData] = useState(initialState);

//   useEffect(() => {
//     if(services.length<=0){
//     dispatch(adminFetchServices());
//     }
//   }, [dispatch]);

//   const toFormData = (payload) => {
//     const fd = new FormData();
//     fd.append("name", payload.name.trim());
//     fd.append("category", payload.category.trim());
//     fd.append("price", payload.price);
//     fd.append("duration", payload.duration);
//     fd.append("description", payload.description.trim());
//     fd.append("benefits", payload.benefits);
//     fd.append("includes", payload.includes);

//     if (payload.beforeImage) fd.append("before_image", payload.beforeImage);
//     if (payload.afterImage) fd.append("after_image", payload.afterImage);
//     payload.images.forEach((file) => fd.append("images", file));

//     return fd;
//   };

//   const handleAddService = () => {
//     const fd = toFormData(newService);
//     dispatch(addService(fd)).then(() => {
//       setNewService(initialState);
//       setShowAddForm(false);
//     });
//   };

//   const handleEditClick = (service) => {
//     setEditId(service.id);
//     setEditData({
//       ...initialState,
//       name: service.name,
//       category: service.category,
//       price: service.price,
//       duration: service.duration,
//       description: service.description || "",
//       benefits: (service.benefits || []).join(", "),
//       includes: (service.includes || []).join(", "),
//     });
//   };

//   const handleUpdate = () => {
//     const fd = toFormData(editData);
//     dispatch(updateService({ id: editId, updates: fd })).then(() =>
//       setEditId(null)
//     );
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       dispatch(deleteService(id));
//     }
//   };

//   const handleToggleServiceStatus = (id, currentStatus) => {
//  dispatch(updateServiceStatus({ id, status: !currentStatus }))


//     .unwrap()
//     .then(() => {
//       // Optionally update UI or show toast here
//     })
//     .catch((err) => {
//       console.error("Failed to update status", err);
//     });
// };


//   return (
//     <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-4">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//           All Services
//         </h1>
//         <AddButton
//           label="Add Service"
//           isOpen={showAddForm}
//           onClick={() => setShowAddForm(!showAddForm)}
//         />
//       </div>

//       {showAddForm && (
//         <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Service Name"
//               value={newService.name}
//               onChange={(e) =>
//                 setNewService({ ...newService, name: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={newService.category}
//               onChange={(e) =>
//                 setNewService({ ...newService, category: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newService.price}
//               onChange={(e) =>
//                 setNewService({ ...newService, price: Number(e.target.value) })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <input
//               type="number"
//               placeholder="Duration (min)"
//               value={newService.duration}
//               onChange={(e) =>
//                 setNewService({
//                   ...newService,
//                   duration: Number(e.target.value),
//                 })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <textarea
//               placeholder="Description"
//               value={newService.description}
//               onChange={(e) =>
//                 setNewService({ ...newService, description: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
//             />
//             <input
//               type="text"
//               placeholder="Benefits (comma separated)"
//               value={newService.benefits}
//               onChange={(e) =>
//                 setNewService({ ...newService, benefits: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
//             />
//             <input
//               type="text"
//               placeholder="Includes (comma separated)"
//               value={newService.includes}
//               onChange={(e) =>
//                 setNewService({ ...newService, includes: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setNewService({ ...newService, beforeImage: e.target.files[0] })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setNewService({ ...newService, afterImage: e.target.files[0] })
//               }
//               className="border rounded px-3 py-2 w-full"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) =>
//                 setNewService({
//                   ...newService,
//                   images: Array.from(e.target.files),
//                 })
//               }
//               className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
//             />
//           </div>

//           <button
//             onClick={handleAddService}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Save Service
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-lg p-4 border shadow-sm space-y-2"
//             >
//             <div>Id : <span>{service.id}</span></div>
//             <div>Updated_at: <span>{service.updated_at}</span></div>
//             <div>Created_at: <span>{service.created_at}</span></div>

//               <img
//                 src={service.images?.[0] || "/placeholder.jpg"}
//                 alt={service.name}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <h2 className="text-lg font-semibold">{service.name}</h2>
//               <p className="text-sm text-gray-600">{service.category}</p>
//               <p className="text-sm font-medium">₹{service.price}</p>
//               <p className="text-sm text-gray-500">{service.duration} min</p>

//               {service.before_image && (
//                 <img
//                   src={service.before_image}
//                   alt="Before"
//                   className="w-full h-24 object-cover rounded"
//                 />
//               )}
//               {service.after_image && (
//                 <img
//                   src={service.after_image}
//                   alt="After"
//                   className="w-full h-24 object-cover rounded"
//                 />
//               )}

//               <div className="flex flex-wrap gap-2">
//                 {service.images?.slice(1).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`Gallery ${idx + 1}`}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 ))}
//               </div>

//               <div className="flex items-center gap-2 mt-2">
//                 <button
//                   onClick={() => handleEditClick(service)}
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <Edit size={16} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(service.id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//              <button
//   onClick={() => handleToggleServiceStatus(service.id, service.is_active)}
//   className={`px-3 py-1 rounded text-white text-sm ${
//     service.is_active ? "bg-green-600 hover:bg-green-700"
//                       : "bg-red-500 hover:bg-red-600"
//   }`}
// >
//   {service.is_active ? "Active" : "Inactive"}
// </button>

//               </div>

//               {editId === service.id && (
//                 <div className="mt-4 space-y-2">
//                   <input
//                     type="text"
//                     value={editData.name}
//                     onChange={(e) =>
//                       setEditData({ ...editData, name: e.target.value })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
//                   <input
//                     type="text"
//                     value={editData.category}
//                     onChange={(e) =>
//                       setEditData({ ...editData, category: e.target.value })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
//                   <input
//                     type="number"
//                     value={editData.price}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         price: Number(e.target.value),
//                       })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
//                   <input
//                     type="number"
//                     value={editData.duration}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         duration: Number(e.target.value),
//                       })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
//                   <input
//                     type="text"
//                     value={editData.benefits}
//                     onChange={(e) =>
//                       setEditData({ ...editData, benefits: e.target.value })
//                     }
//                     placeholder="Benefits (comma separated)"
//                     className="w-full border rounded px-2 py-1"
//                   />

//                   <input
//                     type="text"
//                     value={editData.includes}
//                     onChange={(e) =>
//                       setEditData({ ...editData, includes: e.target.value })
//                     }
//                     placeholder="Includes (comma separated)"
//                     className="w-full border rounded px-2 py-1"
//                   />
// <div>before</div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         beforeImage: e.target.files[0],
//                       })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
// <div>after</div>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         afterImage: e.target.files[0],
//                       })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
// <div>main</div>

//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         images: Array.from(e.target.files),
//                       })
//                     }
//                     className="w-full border rounded px-2 py-1"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleUpdate}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <Check size={16} />
//                     </button>
//                     <button
//                       onClick={() => setEditId(null)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;