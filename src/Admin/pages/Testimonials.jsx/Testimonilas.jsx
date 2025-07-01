import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      customer: 'Kavya Singh',
      rating: 5,
      comment: 'Amazing service! The staff is very professional and skilled.',
      status: 'approved',
      date: '2024-06-20',
    },
    {
      id: 2,
      customer: 'Meera Jain',
      rating: 4,
      comment: 'Great experience overall. Will definitely come back!',
      status: 'pending',
      date: '2024-06-22',
    },
  ]);

  return (
    <div className="space-y-6 p-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
        <div className="w-full sm:w-auto">
          <select className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option>All Testimonials</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  {/* Customer & Rating */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900">{testimonial.customer}</h3>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={16} />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600">{testimonial.comment}</p>

                  {/* Date & Status */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-sm text-gray-500">{testimonial.date}</span>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        testimonial.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {testimonial.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {testimonial.status === 'pending' && (
                  <button className="text-green-600 hover:text-green-800 px-3 py-1 border border-green-600 rounded text-sm">
                    Approve
                  </button>
                )}
                <button className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
