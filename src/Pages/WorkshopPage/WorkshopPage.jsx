import React, { useState } from 'react';
import { Calendar, Clock, Users, Award, Star, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

export default function WorkshopPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const workshops = [
  {
    id: 1,
    title: "Quick Makeup Fixes for Busy Women",
    category: "makeup",
    duration: "30 Minutes",
    price: "Free",
    level: "All Levels",
    organizer: "GlowUp Studio",
    instructor: "Sarah Johnson",
    timing: "11:00 AM - 11:30 AM",
    image: "https://i.ytimg.com/vi/xA-8d9EzFIY/maxresdefault.jpg",
    description: "Learn time-saving makeup tricks to look your best even on your busiest days. Perfect for working women or moms on-the-go.",
    purpose: "Marketing & Client Engagement",
    highlights: ["Live Demo", "Free Samples", "Q&A Session", "Discount Coupons"]
  },
  {
    id: 2,
    title: "Scalp Care 101",
    category: "hair",
    duration: "45 Minutes",
    price: "₹499",
    level: "Beginner",
    organizer: "GlowUp Studio",
    instructor: "Michael Chen",
    timing: "1:00 PM - 1:45 PM",
    image: "https://www.aurelderma.com/wp-content/uploads/2024/12/Scalp.jpg",
    description: "An interactive talk + demo on how to maintain a healthy scalp and prevent hair fall naturally.",
    purpose: "Lead Generation for Hair Treatments",
    highlights: ["Scalp Scan Demo", "Mini Consultation", "Product Trial", "Special Offers"]
  },
  {
    id: 3,
    title: "Hand Massage & Nail Care Basics",
    category: "nails",
    duration: "20 Minutes",
    price: "Free",
    level: "All Levels",
    organizer: "GlowUp Studio",
    instructor: "Jessica Liu",
    timing: "3:00 PM - 3:20 PM",
    image: "https://framerusercontent.com/images/ysqm9es81odhWJvCYEKI6kkTVso.jpg",
    description: "Relax and learn quick nail and hand care practices you can do at home. Includes a short free hand massage.",
    purpose: "Client Engagement",
    highlights: ["Relaxation Session", "Tips & Tricks", "Mini Product Kit", "Free Trial Appointment"]
  }
];


  const categories = [
    { id: 'all', label: 'All Workshops', count: workshops.length },
    { id: 'makeup', label: 'Makeup', count: workshops.filter(w => w.category === 'makeup').length },
    { id: 'hair', label: 'Hair Styling', count: workshops.filter(w => w.category === 'hair').length },
    { id: 'skincare', label: 'Skincare', count: workshops.filter(w => w.category === 'skincare').length },
    { id: 'nails', label: 'Nail Art', count: workshops.filter(w => w.category === 'nails').length },
    { id: 'bridal', label: 'Bridal', count: workshops.filter(w => w.category === 'bridal').length },
    { id: 'spa', label: 'Spa Therapy', count: workshops.filter(w => w.category === 'spa').length }
  ];

  const filteredWorkshops = activeTab === 'all' 
    ? workshops 
    : workshops.filter(workshop => workshop.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Header */}
      {/* <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-600 to-rose-700 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                Glamour Academy
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-rose-700 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-rose-700 transition-colors font-medium">About</a>
              <a href="#" className="text-rose-700 font-semibold">Workshops</a>
              <a href="#" className="text-gray-700 hover:text-rose-700 transition-colors font-medium">Gallery</a>
              <a href="#" className="text-gray-700 hover:text-rose-700 transition-colors font-medium">Contact</a>
            </div>
            <button className="bg-rose-700 text-white px-6 py-2 rounded-full hover:bg-rose-800 transition-colors font-medium">
              Enroll Now
            </button>
          </nav>
        </div>
      </header> */}
      <BreadcrumbBanner
        title="WorkShops"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Beauty <span className="bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">Workshops</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your passion into profession with our comprehensive beauty training programs. 
              Learn from industry experts and master the latest techniques in makeup, hair, skincare, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-700 text-white px-8 py-4 rounded-full hover:bg-rose-800 transition-all transform hover:scale-105 shadow-lg font-medium">
                Explore Workshops
              </button>
              <button className="border-2 border-rose-700 text-rose-700 px-8 py-4 rounded-full hover:bg-rose-700 hover:text-white transition-all font-medium">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-300 rounded-full opacity-40 animate-bounce"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/80 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Students Trained", icon: Users },
              { number: "15+", label: "Expert Instructors", icon: Award },
              { number: "25+", label: "Workshop Programs", icon: Calendar },
              { number: "98%", label: "Success Rate", icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-rose-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-rose-700">Specialization</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our comprehensive range of beauty workshops designed for all skill levels
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === category.id
                    ? 'bg-rose-700 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-700'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Workshop Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-rose-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {workshop.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{workshop.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-rose-700" />
                        <span className="text-sm text-gray-600">{workshop.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-rose-700" />
                        <span className="text-sm text-gray-600">{workshop.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{workshop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-rose-700">{workshop.price}</div>
                      <div className="text-sm text-gray-500">by {workshop.instructor}</div>
                    </div>
                    <button 
                      onClick={() => setSelectedWorkshop(workshop)}
                      className="bg-rose-700 text-white px-6 py-2 rounded-full hover:bg-rose-800 transition-colors flex items-center space-x-2"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Detail Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedWorkshop.image}
                alt={selectedWorkshop.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedWorkshop.title}</h2>
              <p className="text-gray-600 mb-6">{selectedWorkshop.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Workshop Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-rose-700" />
                      <span><strong>Duration:</strong> {selectedWorkshop.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-rose-700" />
                      <span><strong>Level:</strong> {selectedWorkshop.level}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-rose-700" />
                      <span><strong>Students:</strong> {selectedWorkshop.students} enrolled</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-rose-700" />
                      <span><strong>Rating:</strong> {selectedWorkshop.rating}/5.0</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedWorkshop.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-700 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-rose-700 text-white px-8 py-4 rounded-full hover:bg-rose-800 transition-colors font-medium">
                  Enroll Now - {selectedWorkshop.price}
                </button>
                <button className="border-2 border-rose-700 text-rose-700 px-8 py-4 rounded-full hover:bg-rose-700 hover:text-white transition-colors font-medium">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-rose-700 to-rose-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Beauty Journey?</h2>
          <p className="text-xl text-rose-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful beauty professionals who started their careers with us
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <div className="flex items-center space-x-3 text-white">
              <MapPin className="w-6 h-6" />
              <span>123 Beauty Street, Fashion District</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Phone className="w-6 h-6" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Mail className="w-6 h-6" />
              <span>info@glamouracademy.com</span>
            </div>
          </div>
          
          <button className="bg-white text-rose-700 px-8 py-4 rounded-full hover:bg-rose-50 transition-colors font-medium text-lg">
            Schedule a Free Consultation
          </button>
        </div>
      </section>

      {/* Organizer Form Section */}
<section className="bg-white py-20">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
      Conduct a Workshop at Glamour Academy
    </h2>
    <form className="space-y-6 p-8 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="organizerName">
            Organizer Name
          </label>
          <input
            type="text"
            id="organizerName"
            name="organizerName"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="workshop">
            Select Workshop to Conduct
          </label>
          <select
            id="workshop"
            name="workshop"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          >
            <option value="">-- Choose a Workshop --</option>
            {workshops.map((w) => (
              <option key={w.id} value={w.title}>
                {w.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
          Additional Notes / Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-rose-700 text-white px-8 py-3 rounded-full hover:bg-rose-800 transition-colors font-medium"
        >
          Submit Workshop Request
        </button>
      </div>
    </form>
  </div>
</section>

     
    </div>
  );
}