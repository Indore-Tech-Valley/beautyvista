import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfig,
  updateConfig,
  uploadSiteLogo,
} from "../../../redux/features/Configs/configs";
import MessageModal from "../../../components/MessageModal/MessageModal";

const TABS = ["Site Settings", "Links", "SEO Settings", "Page Details"];

const Config = () => {
  const dispatch = useDispatch();
  const configData = useSelector((state) => state.config?.config || {});
  const loading = useSelector((state) => state.config.loading);

  const [modal, setModal] = useState({ show: false, type: "success", message: "" });
  const openModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => setModal({ ...modal, show: false });

  const [activeTab, setActiveTab] = useState("Site Settings");
  const [isFading, setIsFading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    website_name: "",
    site_title: "",
    website_description: "",
    copyright_description: "",
    contact_number: "",
    contact_email: "",
    contact_address: "",
    social_link_facebook: "",
    social_link_instagram: "",
    social_link_twitter: "",
    social_link_youtube: "",
    opening_hour: "",
    meta_description: "",
    meta_keywords: "",
    booking_appointment_title: "",
    booking_appointment_description: "",
    contact_page_title: "",
    contact_page_description: "",
    website_url: "",
    site_logo: "",
  });

  useEffect(() => {
    if (Object.keys(configData).length === 0) {
      dispatch(fetchConfig());
    }
  }, [dispatch, configData]);

  useEffect(() => {
    if (configData?.site_title) {
      setFormData((prev) => ({ ...prev, ...configData }));
      if (configData.site_logo) {
        setImagePreview(configData.site_logo);
      }
    }
  }, [configData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (configData[key] !== value && value?.trim() !== "") {
        payload[key] = value;
      }
    });

    try {
      if (imageFile) {
        const uploaded = await dispatch(uploadSiteLogo(imageFile)).unwrap();
        if (uploaded?.site_logo) {
          payload.site_logo = uploaded.site_logo;
          setImagePreview(uploaded.site_logo);
        }
      }

      const msg = await dispatch(updateConfig(payload)).unwrap();
      openModal("success", msg || "Configuration updated successfully.");
      setFormData((prev) => ({ ...prev, ...payload }));
      setImageFile(null);
    } catch (err) {
      console.error("Update failed:", err);
      openModal("error", err?.message || "Failed to save configuration.");
    }
  };

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setIsFading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setIsFading(false);
      }, 250);
    }
  };

  const fadeClass = isFading
    ? "opacity-0 translate-y-2 pointer-events-none"
    : "opacity-100 translate-y-0";

  const renderInput = (name, label = "") => (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label || name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={label || name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        value={formData[name]}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );

  return (
    <div className=" px-4 lg:px-8 py-4 ">

      {modal.show && (
        <MessageModal type={modal.type} message={modal.message} onClose={closeModal} />
      )}

      <h1 className="text-2xl font-bold text-gray-900 py-4">Frontend Configuration</h1>

     <div className="overflow-x-auto pb- isolate hide-scrollbar">
  <div className="flex gap-4 border-b border-gray-300 w-max">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => handleTabClick(tab)}
        className={`py-2 px-4 border-b-2 whitespace-nowrap transition-all duration-300 ${
          activeTab === tab && !isFading
            ? "border-pink-600 text-pink-600 font-semibold"
            : "border-transparent text-gray-600 hover:text-pink-500"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>



      <div
        className={`bg-white rounded-lg border border-gray-300 p-4 sm:p-6 space-y-4 transition-all duration-300 ease-in-out ${fadeClass}`}
      >
        {activeTab === "Site Settings" && (
          <>
            <h3 className="text-lg font-semibold">Site Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("website_name")}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 h-24 rounded-md border object-contain"
                />
              )}
            </div>
          </>
        )}

        {activeTab === "Links" && (
          <>
            <h3 className="text-lg font-semibold">Contact + Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "contact_number",
                "contact_email",
                "website_url",
                "social_link_facebook",
                "social_link_instagram",
                "social_link_twitter",
                "social_link_youtube",
                "opening_hour",
              ].map((field) => renderInput(field))}
            </div>
          </>
        )}

        {activeTab === "SEO Settings" && (
          <>
            <h3 className="text-lg font-semibold">SEO Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("site_title", "Meta Title")}
              {renderInput("meta_keywords", "Meta Keywords")}
            </div>
             <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              Meta Description
      </label>
            <textarea
              name="meta_description"
              placeholder="Meta Description"
              rows="3"
              value={formData.meta_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </>
        )}

        {activeTab === "Page Details" && (
          <>
            <h3 className="text-xl font-bold text-gray-800">Page Details</h3>

            <h4 className="text-lg font-semibold text-pink-600">Appointment Page</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("booking_appointment_title", "Title")}
            </div>
             <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              Description
        </label>
            <textarea
              name="booking_appointment_description"
              placeholder="Description"
              rows="3"
              value={formData.booking_appointment_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <h4 className="text-lg font-semibold text-pink-600 mt-6">Contact Page</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("contact_page_title", "Title")}
            </div>
             <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              Contact Page Description
      </label>
            <textarea
              name="contact_page_description"
              placeholder="Description"
              rows="3"
              value={formData.contact_page_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <h4 className="text-lg font-semibold text-pink-600 mt-6">Footer Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("website_description")}
              {renderInput("copyright_description")}
            </div>
          </>
        )}

        <div className="pt-4 text-right">
          {/* <button
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button> */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full text-bold sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 a text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Config;
