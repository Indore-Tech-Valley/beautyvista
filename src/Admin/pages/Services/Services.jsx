import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import {
  adminFetchServices,
  addService,
  updateService,
  deleteService,
  updateServiceStatus,
} from "../../../redux/features/servicesSlice/servicesSlice";
import AddButton from "../../components/AddButton/AddButton";

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
  const dispatch = useDispatch();
  const {
    services = [],
    loading,
    error,
  } = useSelector((state) => state.services || {});

  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newService, setNewService] = useState(initialState);
  const [editData, setEditData] = useState(initialState);

  useEffect(() => {
    dispatch(adminFetchServices());
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

  const handleAddService = () => {
    const fd = toFormData(newService);
    dispatch(addService(fd)).then(() => {
      setNewService(initialState);
      setShowAddForm(false);
    });
  };

  const handleEditClick = (service) => {
    setEditId(service.id);
    setEditData({
      ...initialState,
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      description: service.description || "",
      benefits: (service.benefits || []).join(", "),
      includes: (service.includes || []).join(", "),
    });
  };

  const handleUpdate = () => {
    const fd = toFormData(editData);
    dispatch(updateService({ id: editId, updates: fd })).then(() =>
      setEditId(null)
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  const handleToggleServiceStatus = (id, currentStatus) => {
 dispatch(updateServiceStatus({ id, status: !currentStatus }))


    .unwrap()
    .then(() => {
      // Optionally update UI or show toast here
    })
    .catch((err) => {
      console.error("Failed to update status", err);
    });
};


  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Services
        </h1>
        <AddButton
          label="Add Service"
          isOpen={showAddForm}
          onClick={() => setShowAddForm(!showAddForm)}
        />
      </div>

      {showAddForm && (
        <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={newService.category}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: Number(e.target.value) })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={newService.duration}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  duration: Number(e.target.value),
                })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
            />
            <input
              type="text"
              placeholder="Benefits (comma separated)"
              value={newService.benefits}
              onChange={(e) =>
                setNewService({ ...newService, benefits: e.target.value })
              }
              className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
            />
            <input
              type="text"
              placeholder="Includes (comma separated)"
              value={newService.includes}
              onChange={(e) =>
                setNewService({ ...newService, includes: e.target.value })
              }
              className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewService({ ...newService, beforeImage: e.target.files[0] })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewService({ ...newService, afterImage: e.target.files[0] })
              }
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setNewService({
                  ...newService,
                  images: Array.from(e.target.files),
                })
              }
              className="border rounded px-3 py-2 w-full sm:col-span-2 md:col-span-3"
            />
          </div>

          <button
            onClick={handleAddService}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Service
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-4 border shadow-sm space-y-2"
            >
            <div>Id : <span>{service.id}</span></div>
            <div>Updated_at: <span>{service.updated_at}</span></div>
            <div>Created_at: <span>{service.created_at}</span></div>

              <img
                src={service.images?.[0] || "/placeholder.jpg"}
                alt={service.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <p className="text-sm text-gray-600">{service.category}</p>
              <p className="text-sm font-medium">₹{service.price}</p>
              <p className="text-sm text-gray-500">{service.duration} min</p>

              {service.before_image && (
                <img
                  src={service.before_image}
                  alt="Before"
                  className="w-full h-24 object-cover rounded"
                />
              )}
              {service.after_image && (
                <img
                  src={service.after_image}
                  alt="After"
                  className="w-full h-24 object-cover rounded"
                />
              )}

              <div className="flex flex-wrap gap-2">
                {service.images?.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(service)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
             <button
  onClick={() => handleToggleServiceStatus(service.id, service.is_active)}
  className={`px-3 py-1 rounded text-white text-sm ${
    service.is_active ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-600"
  }`}
>
  {service.is_active ? "Active" : "Inactive"}
</button>

              </div>

              {editId === service.id && (
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        duration: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={editData.benefits}
                    onChange={(e) =>
                      setEditData({ ...editData, benefits: e.target.value })
                    }
                    placeholder="Benefits (comma separated)"
                    className="w-full border rounded px-2 py-1"
                  />

                  <input
                    type="text"
                    value={editData.includes}
                    onChange={(e) =>
                      setEditData({ ...editData, includes: e.target.value })
                    }
                    placeholder="Includes (comma separated)"
                    className="w-full border rounded px-2 py-1"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        beforeImage: e.target.files[0],
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        afterImage: e.target.files[0],
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        images: Array.from(e.target.files),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;