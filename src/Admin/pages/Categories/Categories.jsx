// This is a new Categories component using the same modern UI and modal structure
// as your Services component

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Edit,
  Trash2,
  CheckCircle,
  Image,
  Type,
  Clock,
  Eye,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import {
  adminFetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
} from "../../../redux/features/categoriesSlice/categoriesSlice";
import AddButton from "../../components/AddButton/AddButton";
import MessageModal from "../../../components/MessageModal/MessageModal";
import DeleteModal from "../../components/DeleteModal/deleteModal";
const initialState = {
  name: "",
  description: "",
  icon: "",
  category_image: null,
};

// const [showViewModal, setShowViewModal] = useState(false);

const Categories = () => {
  const dispatch = useDispatch();
  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.categories || {});
  const [editError, setEditError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const formatDate = (date) => new Date(date).toLocaleString();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (categories.length <= 0) dispatch(adminFetchCategories());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditError("")
    setEditId(null);
    setIsEditMode(false);
    setCategoryData(initialState);
    setShowCategoryModal(true);
  };

  const handleEditClick = (cat) => {
    setEditError("")
    setEditId(cat.id);
    setIsEditMode(true);
    setCategoryData({
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      category_image: null,
    });
    setShowCategoryModal(true);
  };

  const toFormData = (payload) => {
    const fd = new FormData();
    fd.append("name", payload.name);
    fd.append("description", payload.description);
    fd.append("icon", payload.icon);
    if (payload.category_image)
      fd.append("category_image", payload.category_image);
    return fd;
  };

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

  const handleSaveCategory = async () => {
    const { name, description, icon, category_image } = categoryData;

    if (
      !name.trim() ||
      !description.trim() ||
      !icon.trim() 
      // !category_image
    ) {
      setEditError("All fields including category image are required.");
      return;
    }

    const fd = toFormData(categoryData);

    try {
       setEditError("");
      let message = "";

      if (isEditMode) {
        message = await dispatch(
          updateCategory({ id: editId, updates: fd })
        ).unwrap();
      } else {
        message = await dispatch(addCategory(fd)).unwrap();
      }
      setShowCategoryModal(false);
      openModal("success", message || "Category updated successfully");

      setEditId(null);
      dispatch(adminFetchCategories());
    } catch (err) {
      // setEditError(err)
      setShowCategoryModal(false);
      openModal("error", err || "Something went wrong");
    }
  };

  const confirmDeleteCategory = async () => {
    try {
      const res = await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      openModal("success", res?.message || "Category deleted successfully");
      dispatch(adminFetchCategories());
    } catch (err) {
      openModal("error", err?.message || "Failed to delete category");
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleDelete = (cat) => {
    setCategoryToDelete(cat);
    setShowDeleteModal(true);
  };

  const handleToggleStatus = (id, status) => {
    dispatch(updateCategoryStatus({ id, status: !status }));
    openModal("success", "Category status updated successfully");
  };

  return (
    <div className=" px-4 lg:px-8 py-4">
      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && categoryToDelete && (
        <DeleteModal
          message={`Are you sure you want to delete "${categoryToDelete.name}"?`}
          onConfirm={confirmDeleteCategory}
          onCancel={() => {
            setShowDeleteModal(false);
            setCategoryToDelete(null);
          }}
        />
      )}

      <div
        className={showCategoryModal ? "blur-sm transition duration-300" : ""}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-2xl font-bold text-gray-900">All Categories</h1>
          <AddButton
            label="Add Category"
            isOpen={showCategoryModal}
            onClick={handleAddClick}
          />
        </div>

        {loading && !categories.length ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className=" min-h-screen ">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowViewModal(true);
                    }}
                    key={category.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col min-h-[420px]"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-100">
                      {category.category_image && (
                        <img
                          src={category.category_image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                          {category.type || "Category"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                      {/* Header + Description */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
                          {category.description || "No description provided."}
                        </p>
                      </div>

                      {/* Actions - Stuck to Bottom */}
                      <div className="flex justify-between items-center pt-6 mt-auto">
                        {/* Toggle Status */}
                        <div className="flex items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(
                                category.id,
                                category.is_active
                              );
                            }}
                            disabled={loading}
                            className={`p-2 rounded-md transition-colors ${
                              category.is_active
                                ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            } disabled:opacity-50`}
                            title={
                              category.is_active
                                ? "Active - Click to deactivate"
                                : "Inactive - Click to activate"
                            }
                          >
                            {category.is_active ? (
                              <ToggleRight size={20} />
                            ) : (
                              <ToggleLeft size={20} />
                            )}
                          </button>
                          <span
                            className={`text-sm font-medium ${
                              category.is_active
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {category.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>

                        {/* Edit + Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(category);
                            }}
                            className="text-blue-600 hover:text-blue-800 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50 flex items-center gap-1"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(category);
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
          </div>
        )}
      </div>

      {showViewModal && selectedCategory && (
        <div className="p-4 fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center ">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {selectedCategory.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-purple-100 text-sm sm:text-base">
                    <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                      Icon: {selectedCategory.icon}
                    </span>
                  <span
  className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-md text-sm font-semibold text-gray-600"
>
  Status:{" "}
  <span className={selectedCategory.is_active ? "text-green-600" : "text-red-500"}>
    {selectedCategory.is_active ? "Active" : "Inactive"}
  </span>
</span>

                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 text-sm sm:text-base">
              {/* Image */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Category Image
                </h2>
                <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedCategory.category_image}
                    alt="Category"
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedCategory.description}
                </p>
              </section>

              {/* Metadata */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Metadata
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-700">Category ID</p>
                    <p className="font-mono break-words">
                      {selectedCategory.id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Created At</p>
                    <p>{formatDate(selectedCategory.created_at)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Updated At</p>
                    <p>{formatDate(selectedCategory.updated_at)}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-xl shadow-lg overflow-y-auto border p-6 space-y-6 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Name", key: "name" },
                { label: "Description", key: "description" },
                { label: "Icon (URL)", key: "icon" },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={categoryData[key]}
                    onChange={(e) =>
                      setCategoryData({
                        ...categoryData,
                        [key]: e.target.value,
                      })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              ))}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCategoryData({
                      ...categoryData,
                      category_image: e.target.files[0],
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            {editError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
                <span className="font-medium">⚠️ {editError}</span>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                {loading
                  ? isEditMode
                    ? "Saving..."
                    : "Adding..."
                  : isEditMode
                  ? "Save Changes"
                  : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
