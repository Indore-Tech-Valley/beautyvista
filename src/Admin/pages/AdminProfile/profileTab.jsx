import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Camera,
  LoaderCircle,
  CheckCircle,
  AlertTriangle,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProfile,
  updateAdminProfile,
  updateProfileImage,
  clearAdminProfileMessages,
} from "../../../redux/features/adminProfileSlice/adminProfileSlice";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const {
    data: currentUser,
    loading,
    error,
    success,
    isUpdating,
  } = useSelector((state) => state.adminProfile);

  const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    profile_image: "",
    last_login: "",
    created_at: "",
    updated_at: "",
    avatarPreview: null,
  });

useEffect(() => {
  if (!currentUser) {
    dispatch(fetchAdminProfile());
  }
}, [currentUser, dispatch]);


  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        role: currentUser.role || "",
        profile_image: currentUser.profile_image || "",
        last_login: currentUser.last_login || "",
        created_at: currentUser.created_at || "",
        updated_at: currentUser.updated_at || "",
        avatarPreview: currentUser.profile_image || null,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    if (!isValidEmail(profileData.email)) {
    alert("Please enter a valid email address.");
    return;
  }
  // const { isUpdating } = useSelector((state) => state.adminProfile);


    const res = await dispatch(
      updateAdminProfile({
        name: profileData.name,
        email: profileData.email,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchAdminProfile());
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData((prev) => ({
          ...prev,
          avatarPreview: event.target.result,
        }));
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      const res = await dispatch(updateProfileImage(formData));

      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchAdminProfile());
      }
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
    <div className="space-y-6">
      {loading && (
        <div className="flex items-center text-pink-600">
          <LoaderCircle className="animate-spin mr-2" size={20} /> Loading...
        </div>
      )}
      {isUpdating && (
  <div className="flex items-center text-pink-600">
    <LoaderCircle className="animate-spin mr-2" size={20} />
    Saving changes...
  </div>
)}

      {success && (
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2" size={20} />
          {success}
        </div>
      )}
      {error && (
        <div className="flex items-center text-red-600">
          <AlertTriangle className="mr-2" size={20} />
          {error}
        </div>
      )}

      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden">
            {profileData.avatarPreview ? (
              <img
                src={profileData.avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-pink-600" size={32} />
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute -bottom-2 -right-2 bg-pink-600 text-white p-2 rounded-full cursor-pointer hover:bg-pink-700"
          >
            <Camera size={16} />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {profileData.name}
          </h3>
          <p className="text-gray-600">{profileData.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={profileData.role}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="inline mr-2" size={16} />
          Email
        </label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
           
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="inline mr-2" size={16} />
          Last Login
        </label>
        <input
          type="text"
          value={new Date(profileData.last_login).toLocaleString()}
          readOnly
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Joined At
          </label>
          <input
            type="text"
            value={new Date(profileData.created_at).toLocaleString()}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Updated
          </label>
          <input
            type="text"
            value={new Date(profileData.updated_at).toLocaleString()}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium flex items-center"
        >
          <Save className="mr-2" size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
