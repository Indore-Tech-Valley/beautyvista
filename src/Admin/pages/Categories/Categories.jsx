  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
  import {
    adminFetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    updateCategoryStatus,
  } from '../../../redux/features/categoriesSlice/categoriesSlice';
  import AddButton from '../../components/AddButton/AddButton';

  const Categories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.categories);

    const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    icon: '',
    category_image: null,
    existingImage: '',
  });

    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: '', category_image: '' });

    useEffect(() => {
      dispatch(adminFetchCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
      if (!newCategory.name || !newCategory.description || !newCategory.category_image) {
        alert('Name, Description, and Image are required');
        return;
      }

      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('description', newCategory.description);
      formData.append('category_image', newCategory.category_image);
      formData.append('icon', newCategory.icon || '');

      dispatch(addCategory(formData)).then(() => {
        setNewCategory({ name: '', description: '', icon: '', category_image: '' });
        setShowAddForm(false);
      });
    };

  const handleEditClick = (category) => {
    setEditId(category.id);
    setEditData({
      name: category.name,
      description: category.description,
      icon: category.icon || '',
      category_image: null, // reset to null for file input
      existingImage: category.category_image || '', // to preview
    });
  };


    const handleUpdate = () => {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('description', editData.description);
    if (editData.category_image instanceof File) {
    formData.append('category_image', editData.category_image);
    
  }

      formData.append('icon', editData.icon || '');

      dispatch(updateCategory({ id: editId, updates: formData })).then(() => setEditId(null))
      .then(() => {
    setEditId(null);
    setEditData({
      name: '',
      description: '',
      icon: '',
      category_image: null,
      existingImage: '',
    });
  });
  ;
    };

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this category?')) {
        dispatch(deleteCategory(id));
      }
    };

    const handleToggleStatus = (id, currentStatus) => {
      dispatch(updateCategoryStatus({ id, status: !currentStatus }));
    };

    return (
      <div className="space-y-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
        <AddButton
    label="Add Category"
    isOpen={showAddForm}
    onClick={() => setShowAddForm(!showAddForm)}
  />

        </div>

        {showAddForm && (
          <div className="space-y-4 border p-4 rounded-lg bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Icon (URL or class)"
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <textarea
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="border px-3 py-2 rounded w-full md:col-span-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewCategory({ ...newCategory, category_image: e.target.files[0] })}
                className="border px-3 py-2 rounded w-full md:col-span-2"
              />
            </div>

            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Category
            </button>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && categories?.length === 0 && <p>No categories found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg border shadow-sm p-4 space-y-2">
              <div className="text-xs text-gray-500">ID: {category.id}</div>
              <div className="text-xs text-gray-500">updated at: {category.updated_at}</div>
              <div className="text-xs text-gray-500">created at: {category.created_at}</div>
               {/* <div>Id : <span>{category.id}</span></div>
            <div>Updated_at: <span>{category.updated_at}</span></div>
            <div>Created_at: <span>{category.created_at}</span></div> */}

              {editId === category.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full border px-2 py-1 rounded"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={editData.icon}
                    onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Icon"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditData({ ...editData, category_image: e.target.files[0] })}
                    className="w-full border px-2 py-1 rounded"
                  />
                  {!editData.category_image && category.category_image && (
                    <img src={category.category_image} alt="Current" className="w-full h-24 object-cover rounded" />
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              )}

              {category.category_image && (
                <img
                  src={category.category_image}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded border"
                />
              )}
              {category.icon && (
                <img src={category.icon} alt="Icon" className="w-10 h-10 mt-2 object-contain" />
              )}

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  {editId === category.id ? (
                    <>
                      <button onClick={handleUpdate} className="text-green-600 hover:text-green-800">
                        <Check size={18} />
                      </button>
                      <button onClick={() => setEditId(null)} className="text-gray-500 hover:text-gray-700">
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleToggleStatus(category.id, category.is_active)}
                  className={`text-sm px-2 py-1 rounded font-medium ${
                    category.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {category.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Categories;