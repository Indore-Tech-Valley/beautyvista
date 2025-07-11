import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAdminPassword,
  clearAdminProfileMessages,
} from '../../../redux/features/adminProfileSlice/adminProfileSlice';
import MessageModal from '../../../components/MessageModal/MessageModal';

const SecurityTab = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.adminProfile);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const openModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => setModal({ ...modal, show: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { currentPassword, newPassword, confirmPassword } = formData;

  // Field-level validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    openModal("error", "All fields are required.");
    return;
  }

  if (newPassword.length < 6) {
    openModal("error", "New password must be at least 6 characters long.");
    return;
  }

  if (newPassword !== confirmPassword) {
    openModal("error", "New password and confirmation do not match.");
    return;
  }

  const res = await dispatch(
    updateAdminPassword({
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    })
  );

  if (res.meta.requestStatus === "fulfilled") {
    openModal("success", res.payload || "Password updated successfully.");
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  } else {
    openModal("error", res.payload || "Failed to update password.");
  }
};


  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearAdminProfileMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Info box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">Security Tip</h3>
          <p className="text-sm text-yellow-700">
            Use strong passwords with uppercase, lowercase, numbers, and symbols.
          </p>
        </div>

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Confirm new password"
          />
        </div>

        {/* 2FA Placeholder */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account by enabling 2FA.
          </p>
          <button
            type="button"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Enable 2FA
          </button>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={18} /> Updating...
              </span>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </form>

      {/* 🔔 Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default SecurityTab;
