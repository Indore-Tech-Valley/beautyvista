import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import {
  Tag,
  Clock,
  DollarSign,
  FileText,
  Package,
  Eye,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import {
  adminFetchServices,
  addService,
  updateService,
  deleteService,
  updateServiceStatus,
} from "../../../redux/features/servicesSlice/servicesSlice";
import AddButton from "../../components/AddButton/AddButton";
import MessageModal from "../../../components/MessageModal/MessageModal";
import DeleteModal from "../../components/DeleteModal/deleteModal";

const initialState = {
  name: "",
  category: "",
  price: 0,
  duration: 0,
  description: "",
  benefits: "",
  includes: "",
  beforeImage: null,
  afterImage: null,
  images: [],
};

const Services = () => {
  const [isToggling, setIsToggling] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  const dispatch = useDispatch();
  const {
    services = [],
    loading,
    error,
  } = useSelector((state) => state.services || {});

  const [editError, setEditError] = useState("");

  const [selectedService, setSelectedService] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceData, setServiceData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (services.length <= 0) {
      dispatch(adminFetchServices());
    }
  }, [dispatch]);

  const toFormData = (payload) => {
    const fd = new FormData();
    fd.append("name", payload.name.trim());
    fd.append("category", payload.category.trim());
    fd.append("price", payload.price);
    fd.append("duration", payload.duration);
    fd.append("description", payload.description.trim());
    fd.append("benefits", payload.benefits);
    fd.append("includes", payload.includes);
    if (payload.beforeImage) fd.append("before_image", payload.beforeImage);
    if (payload.afterImage) fd.append("after_image", payload.afterImage);
    payload.images.forEach((file) => fd.append("images", file));
    return fd;
  };

  const handleEditClick = (service) => {
    setEditError("");
    setEditId(service.id);
    setIsEditMode(true);
    setServiceData({
      ...initialState,
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      description: service.description || "",
      benefits: (service.benefits || []).join(", "),
      includes: (service.includes || []).join(", "),
    });
    setShowServiceModal(true);
  };

  const handleAddClick = () => {
    setEditError("");
    setEditId(null);
    setIsEditMode(false);
    setServiceData(initialState);
    setShowServiceModal(true);
  };

  const handleSaveService = async () => {
    const {
      name,
      category,
      price,
      duration,
      description,
      benefits,
      includes,
      beforeImage,
      afterImage,
      images,
    } = serviceData;

    if (
      !name.trim() ||
      !category.trim() ||
      !price ||
      !duration ||
      !description.trim() ||
      !benefits.trim() ||
      !includes.trim()
    ) {
      setEditError("Please fill in all required fields.");
      return;
    }

    const fd = toFormData(serviceData);

    try {
      let message = "";

      if (isEditMode) {
        message = await dispatch(
          updateService({ id: editId, updates: fd })
        ).unwrap();
      } else {
        message = await dispatch(addService(fd)).unwrap();
      }
      setShowServiceModal(false);
      openModal("success", message || "Service saved successfully");
      setEditId(null);
      dispatch(adminFetchServices());
    } catch (err) {
      // updatingService(false)
      setShowServiceModal(false);
      openModal("error", err || "Something went wrong");
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this service?")) {
  //     try {
  //       const message = await dispatch(deleteService(id)).unwrap();
  //       openModal("success", message);
  //       dispatch(adminFetchServices()); // if needed to refresh the list
  //     } catch (err) {
  //       console.log(err);
  //       openModal("error", err || "Failed to delete service");
  //     }
  //   }
  // };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;
    try {
      const message = await dispatch(
        deleteService(serviceToDelete.id)
      ).unwrap();
      openModal("success", message || "Service deleted successfully");
      dispatch(adminFetchServices());
    } catch (err) {
      openModal("error", err?.message || "Failed to delete service");
    } finally {
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleToggleServiceStatus = (id, currentStatus) => {
    dispatch(updateServiceStatus({ id, status: !currentStatus }))
      .unwrap()
      .then(() => {
        openModal("success", "Service status updated successfully");
        // Optionally mutate UI state here if needed
      })
      .catch((err) => {
        openModal("error", err.message || "Failed to update");
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const time = date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const day = date.getDate();
    const month = date.toLocaleString("en-IN", { month: "long" });
    return `${time} at ${day} ${month}`;
  };

  return (
    <div className="space-y-6 px-4 lg:px-8 py-4">
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          message={`Are you sure you want to delete "${serviceToDelete?.name}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDeleteModal(false);
            setServiceToDelete(null);
          }}
        />
      )}

      <div
        className={showServiceModal ? "blur-sm transition duration-300" : ""}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-2xl font-bold text-gray-900">All Services</h1>
          <AddButton
            label="Add Service"
            isOpen={showServiceModal}
            onClick={handleAddClick}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className=" min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col min-h-[500px]"
                  onClick={() => {
                    setSelectedService(service);
                    setShowViewModal(true);
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100">
                    {service.images?.[0] && (
                      <img
                        src={service.images[0]}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                        ₹{service.price}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                        {service.category || "Service"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-500 mt-4">
                      <Clock size={16} />
                      <span className="text-sm">
                        {service.duration} minutes
                      </span>
                    </div>

                    {/* Benefits */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Benefits:
                      </h4>
                      <div className="space-y-1">
                        {service.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle
                              size={14}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <span className="text-sm text-gray-600">
                              {benefit}
                            </span>
                          </div>
                        ))}
                        {service.benefits.length > 2 && (
                          <div className="text-sm text-gray-700 font-medium">
                            +{service.benefits.length - 2} more benefits
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - pinned to bottom */}
                    <div className="flex justify-between items-center mt-auto pt-6">
                      {/* Toggle Status */}
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleServiceStatus(
                              service.id,
                              service.is_active
                            );
                          }}
                          disabled={loading}
                          className={`p-2 rounded-md transition-colors ${
                            service.is_active
                              ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          } disabled:opacity-50`}
                          title={
                            service.is_active
                              ? "Active - Click to deactivate"
                              : "Inactive - Click to activate"
                          }
                        >
                          {service.is_active ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </button>
                        <span
                          className={`text-sm font-medium ${
                            service.is_active
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {service.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Edit / Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(service);
                          }}
                          className="text-blue-600 hover:text-blue-800 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50 flex items-center gap-1"
                        >
                          <Edit size={20} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(service); // open delete modal with the selected service
                          }}
                          className="text-red-600 hover:text-red-800 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showServiceModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center px-4 items-center ">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-lg overflow-y-auto border border-gray-200 p-6 space-y-6 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit Service" : "Add Service"}
              </h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["name", "category", "price", "duration"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "price" || field === "duration"
                        ? "number"
                        : "text"
                    }
                    value={serviceData[field]}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={serviceData.description}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[80px] resize-y"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["benefits", "includes"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)} (comma
                    separated)
                  </label>
                  <input
                    type="text"
                    value={serviceData[field]}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Before Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      beforeImage: e.target.files[0],
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  After Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      afterImage: e.target.files[0],
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gallery Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    images: Array.from(e.target.files),
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            {editError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
                <span className="font-medium">⚠️ {editError}</span>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowServiceModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveService}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                {loading
                  ? isEditMode
                    ? "Saving..."
                    : "Adding..."
                  : isEditMode
                  ? "Save Changes"
                  : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedService && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex  sm:flex-row items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {selectedService.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-purple-100 text-sm sm:text-base">
                    <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                      <Tag size={16} />
                      {selectedService.category}
                    </span>
                    <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                      <Clock size={16} />
                      {selectedService.duration} mins
                    </span>
                    <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                       ₹{selectedService.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition-colors self-end sm:self-auto"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 text-sm sm:text-base">
              {/* Images */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Package className="text-purple-600" />
                  Service Images
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(selectedService.images || []).map((image, idx) => (
                    <div
                      key={idx}
                      className="relative h-48 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Service ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="text-purple-600" />
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg">
                  {selectedService.description}
                </p>
              </section>

              {/* Benefits */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedService.benefits || []).map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-gray-100 p-3 rounded-lg"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-600 mt-0.5"
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Includes */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="text-blue-600" />
                  What's Included
                </h2>
                <div className="space-y-2">
                  {(selectedService.includes || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-gray-100 p-3 rounded-lg"
                    >
                      <Package size={18} className="text-blue-600 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Before & After Images */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Before & After
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-center">
                      Before
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={
                          selectedService.before_image ||
                          selectedService.before_after?.before_image
                        }
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-center">
                      After
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={
                          selectedService.after_image ||
                          selectedService.before_after?.after_image
                        }
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Metadata */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Service Metadata
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-700">Service ID</p>
                    <p className="font-mono break-words">
                      {selectedService.id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Created At</p>
                    <p>{formatDate(selectedService.created_at)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Updated At</p>
                    <p>{formatDate(selectedService.updated_at)}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
