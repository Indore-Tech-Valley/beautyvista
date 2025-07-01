import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  updateFAQStatus,
} from '../../../redux/features/faqsSlice/faqsSlice';

const AdminFaqs = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faqs);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ question: '', answer: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', status: 'published' });

  useEffect(() => {
    dispatch(fetchAdminFAQs());
  }, [dispatch]);

  const handleEditClick = (faq) => {
    setEditId(faq.id);
    setEditData({ question: faq.question, answer: faq.answer });
  };

  const handleUpdate = () => {
    dispatch(updateFAQ({ id: editId, updates: editData })).then(() => setEditId(null));
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ question: '', answer: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      dispatch(deleteFAQ(id))
        .then(() => dispatch(fetchAdminFAQs()))
        .catch((err) => console.log(err));
    }
  };

const handleStatusToggle = (faq) => {
  const newStatus = !faq.is_active;
  dispatch(updateFAQStatus({ id: faq.id, status: newStatus }));
};

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewFaq((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      alert('Both question and answer are required.');
      return;
    }
    dispatch(addFAQ(newFaq)).then(() => {
      setNewFaq({ question: '', answer: '', status: 'published' });
      setShowAddForm(false);
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700 w-full sm:w-auto"
        >
          <Plus size={16} />
          {showAddForm ? 'Cancel' : 'Add FAQ'}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={newFaq.question}
            onChange={handleAddChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="answer"
            placeholder="Enter answer"
            value={newFaq.answer}
            onChange={handleAddChange}
            rows={3}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <select
              name="status"
              value={newFaq.status}
              onChange={handleAddChange}
              className="w-full sm:w-auto border px-3 py-2 rounded"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button
              onClick={handleAddFaq}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Save FAQ
            </button>
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && faqs?.length === 0 && <p>No FAQs found.</p>}

        {faqs.map((faq) => {
       const isPublished = faq.is_active === true;

          return (
            <div key={faq.id} className="bg-white rounded-lg border shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  {editId === faq.id ? (
                    <>
                      <input
                        type="text"
                        name="question"
                        value={editData.question}
                        onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                        className="w-full border rounded px-3 py-2 mb-2"
                      />
                      <textarea
                        name="answer"
                        value={editData.answer}
                        onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                        rows={3}
                        className="w-full border rounded px-3 py-2 mb-2"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{faq.question}</h3>
                      <p className="text-gray-700 mb-2">{faq.answer}</p>
                    </>
                  )}

                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {editId === faq.id ? (
                    <>
                      <button onClick={handleUpdate} className="text-green-600 hover:text-green-800" title="Update">
                        <Check size={18} />
                      </button>
                      <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700" title="Cancel">
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(faq)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                      <button
  onClick={() => handleStatusToggle(faq)}
  className={`px-3 py-1 rounded text-white text-sm transition-colors duration-200 ${
    isPublished ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
  }`}
>
  {isPublished ? 'Published' : 'Draft'}
</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFaqs;
