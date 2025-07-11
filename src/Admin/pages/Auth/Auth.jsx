import React, { useEffect, useState } from 'react';
import { Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../../redux/features/authSlice/authSlice';
import { adminFetchAppointments } from '../../../redux/features/appointmentSlice/appointmentSlice';
const Auth = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(loginData))
      .unwrap()
      .then((res) => {
        console.log(res);
       navigate("/admin/dashboard", { replace: true });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
  if (error) {
    // Clear error when loginData changes
    setLoginData((prev) => ({ ...prev })); // triggers rerender
  }
}, [loginData.username, loginData.password]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-4">
              <Scissors className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BeautyVista</h1>
            <p className="text-gray-600 mt-2">Admin Panel Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
             <input
  type="text"
  id="username"

  name="username"
  value={loginData.username}
  onChange={handleInputChange}
  autoComplete="username" // ✅ added
  required
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
  placeholder="Enter your username"
/>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
             <input
  type="password"
  id="password"
  name="password"
  value={loginData.password}
  onChange={handleInputChange}
  autoComplete="current-password" // ✅ added
  required
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
  placeholder="Enter your password"
/>
            </div>

            {error && (
  <div
    className={`px-4 py-3 rounded-lg text-sm ${
      error.status === 429
        ? 'bg-yellow-100 border border-yellow-400 text-yellow-800'
        : 'bg-red-100 border border-red-400 text-red-800'
    }`}
  >
    {error.message}
  </div>
)}


            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
