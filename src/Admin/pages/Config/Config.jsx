import React from 'react';

const Config = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Frontend Configuration</h1>
      <div className="space-y-6">
        {/* Site Settings */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Site Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                <input
                  type="text"
                  defaultValue="BeautyVista"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Tagline</label>
                <input
                  type="text"
                  defaultValue="Your Beauty, Our Passion"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="info@beautyvista.com"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                rows="3"
                defaultValue="123 Beauty Street, Fashion District, Mumbai - 400001"
                className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>
        {/* Business Hours */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Business Hours</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                <input
                  type="time"
                  defaultValue="20:00"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Social Media Links</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/beautyvista"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/beautyvista"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input
                  type="url"
                  placeholder="https://twitter.com/beautyvista"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/beautyvista"
                  className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* SEO Settings */}
        <div className="bg-white rounded-lg border-gray-200 shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">SEO Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                defaultValue="BeautyVista - Premium Beauty Parlour Services"
                className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                rows="3"
                defaultValue="Transform your beauty with our premium beauty parlour services. Expert stylists, quality treatments, and personalized care for all your beauty needs."
                className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input
                type="text"
                defaultValue="beauty parlour, hair styling, facial treatment, makeup, nail care, spa"
                className="w-full border rounded-lg border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg border-gray-200 hover:bg-pink-700">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Config;