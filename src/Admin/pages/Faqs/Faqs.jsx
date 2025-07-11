import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  updateFAQStatus,
} from "../../../redux/features/faqsSlice/faqsSlice";
import MessageModal from "../../../components/MessageModal/MessageModal";
import AddButton from "../../components/AddButton/AddButton";
import DeleteModal from "../../components/DeleteModal/deleteModal";

const AdminFaqs = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faqs);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [faqFormData, setFaqFormData] = useState({
    question: "",
    answer: "",
  });

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [statusTogglingId, setStatusTogglingId] = useState(null);

  useEffect(() => {
    if (faqs.length <= 0) dispatch(fetchAdminFAQs());
  }, [dispatch]);

  const openModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => setModal({ ...modal, show: false });

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleAddClick = () => {
  //   setIsEditMode(false);
  //   setEditId(null);
  //   setFaqFormData({ question: "", answer: "" });
  //   setFaqModalOpen(true);
  // };

  const handleEditClick = (faq) => {
    setIsEditMode(true);
    setEditId(faq.id);
    setFaqFormData({ question: faq.question, answer: faq.answer });
    setFaqModalOpen(true);
  };

  const handleFaqChange = (e) => {
    const { name, value } = e.target;
    setFaqFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAddFaq = async () => {
  if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
    setFaqModalOpen(false)
    return openModal("error", "Both question and answer are required."); // ✅ keep modal open
  }

  try {
    await dispatch(addFAQ(faqFormData)).unwrap();
    setFaqModalOpen(false);
    openModal("success", "FAQ added successfully");
    dispatch(fetchAdminFAQs());
  } catch (err) {
    setFaqModalOpen(false);
    openModal("error", err?.message || "Failed to add FAQ");
  }
};


  const handleUpdateFaq = async () => {
    if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
      setFaqModalOpen(false);
      return openModal("error", "Both question and answer are required.");
    }

    try {
      await dispatch(updateFAQ({ id: editId, updates: faqFormData })).unwrap();
      openModal("success", "FAQ updated successfully");
      setFaqModalOpen(false);
      setEditId(null);
      dispatch(fetchAdminFAQs());
    } catch (err) {
      openModal("error", err?.message || "Failed to update FAQ");
    }
  };

  const handleDelete = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!faqToDelete) return;

    try {
      await dispatch(deleteFAQ(faqToDelete.id)).unwrap();
      openModal("success", "FAQ deleted successfully");
      dispatch(fetchAdminFAQs());
    } catch (err) {
      openModal("error", err?.message || "Failed to delete FAQ");
    } finally {
      setShowDeleteModal(false);
      setFaqToDelete(null);
    }
  };

  const handleStatusToggle = async (faq) => {
    const newStatus = !faq.is_active;
    setStatusTogglingId(faq.id);
    try {
      const res = await dispatch(
        updateFAQStatus({ id: faq.id, status: newStatus })
      );
      if (res.type.includes("fulfilled")) {
        openModal("success", "Status updated successfully");
        // dispatch(fetchAdminFAQs());
      } else {
        openModal("error", res.payload || "Failed to update status");
      }
    } catch (err) {
      openModal("error", err?.message || "Something went wrong");
    } finally {
      setStatusTogglingId(null);
    }
  };

  return (
    <div className="px-4 lg:px-8 py-4">
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && faqToDelete && (
        <DeleteModal
          message={`Are you sure you want to delete the FAQ titled "${faqToDelete.question}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDeleteModal(false);
            setFaqToDelete(null);
          }}
        />
      )}

      {/* Header */}
      <div className="space-y-4">
        {/* Title & Button in a Row on md+ screens */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>

          {/* Add Button - full width on small, auto on md+ */}
          <div className="w-full md:w-auto">
            <AddButton
              label="Add FAQ"
              isOpen={faqModalOpen}
              onClick={() => {
                if (faqModalOpen) {
                  setFaqModalOpen(false);
                } else {
                  setIsEditMode(false);
                  setEditId(null);
                  setFaqFormData({ question: "", answer: "" });
                  setFaqModalOpen(true);
                }
              }}
            />
          </div>
        </div>

        {/* Search Input always full width */}
        <div className="relative w-full mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modal */}
      {faqModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4 ">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-xl shadow-lg overflow-y-auto border p-6 space-y-6 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit FAQ" : "Add FAQ"}
              </h2>
              <button
                onClick={() => setFaqModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={faqFormData.question}
                  onChange={handleFaqChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={faqFormData.answer}
                  onChange={handleFaqChange}
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setFaqModalOpen(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={isEditMode ? handleUpdateFaq : handleAddFaq}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                disabled={loading}
              >
                {loading
                  ? isEditMode
                    ? "Saving..."
                    : "Adding..."
                  : isEditMode
                  ? "Save Changes"
                  : "Add FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ List */}
      {/* FAQ List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs</h2>
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>
        </div> */}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No matching FAQs found" : "No FAQs added yet"}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div
                  className="py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                  onClick={() =>
                    setExpandedFaq((prev) => (prev === faq.id ? null : faq.id))
                  }
                >
                  <div className="flex items-center gap-3">
                    {faq.is_active ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <h3 className="font-medium text-gray-800">
                      {faq.question}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusToggle(faq);
                      }}
                      disabled={statusTogglingId === faq.id}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        faq.is_active
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${
                        statusTogglingId === faq.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {faq.is_active ? "Published" : "Draft"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(faq);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(faq); // ✅ pass the full FAQ object
                      }}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                    {expandedFaq === faq.id ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </div>

                {expandedFaq === faq.id && (
                  <div className="pb-4 pl-5">
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFaqs;
