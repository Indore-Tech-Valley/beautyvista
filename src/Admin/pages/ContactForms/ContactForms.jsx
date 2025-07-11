import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, Trash2, Plus } from "lucide-react";
import {
  adminFetchContacts,
  adminDeleteContact,
  adminAddContact,
} from "../../../redux/features/contactFormSlice/contactFormSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MessageModal from "../../../components/MessageModal/MessageModal";
import AddButton from "../../components/AddButton/AddButton";
import DeleteModal from "../../components/DeleteModal/deleteModal";


const ContactForms = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactForm?.contacts || []);
  const loading = useSelector((state) => state.contactForm?.loading);
  const error = useSelector((state) => state.contactForm?.error);

  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [contactToDelete, setContactToDelete] = useState(null);


  const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",       // Jan, Feb, etc.
    day: "2-digit",       // 15
    year: "numeric",      // 2024
    hour: "2-digit",      // 04
    minute: "2-digit",    // 00
    hour12: true,         // PM/AM format
  });


  const [modal, setModal] = useState({ show: false, type: "success", message: "" });
  const openModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => setModal({ ...modal, show: false });

  const { id: contactIdFromURL } = useParams();
  const contactRefs = useRef({});

  const navigate = useNavigate();
  const [highlightedId, setHighlightedId] = useState(null);


useLayoutEffect(() => {
  if (contactIdFromURL && contactRefs.current[contactIdFromURL]) {
    setTimeout(() => {
      const target = contactRefs.current[contactIdFromURL];
    if (target) {
  setHighlightedId(contactIdFromURL);
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    setHighlightedId(null); // remove highlight
    navigate("/admin/contactForms", { replace: true });
  }, 2000); // keep highlight for 2s
}

    }, 100); // delay ensures DOM is ready
  }
}, [contactIdFromURL, contacts]);


  useEffect(() => {
    if (contacts.length <= 0) {
      dispatch(adminFetchContacts());
    }
  }, [dispatch]);

const handleDelete = async (id) => {
  try {
    await dispatch(adminDeleteContact(id)).unwrap();
    openModal("success", "Contact deleted successfully.");
    dispatch(adminFetchContacts());
  } catch (err) {
    openModal("error", err?.message || "Failed to delete contact");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = await dispatch(adminAddContact(formData)).unwrap();
      openModal("success", msg || "Contact added successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowFormModal(false);
      dispatch(adminFetchContacts());
    } catch (err) {
      setShowFormModal(false);
      openModal("error", err || "Failed to add contact");
    }
  };

  return (
    <div className="px-4 lg:px-8 py-4">
      {/* Feedback Modal */}
      {modal.show && (
        <MessageModal type={modal.type} message={modal.message} onClose={closeModal} />
      )}
      

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:mb-8 mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-sm text-gray-500">View and manage contact form submissions</p>
        </div>
        <AddButton
  label="Add Contact"
  isOpen={showFormModal}
  onClick={() => {
    setShowFormModal((prev) => !prev);
  }}
/>

      </div>

      {/* Contact List */}
     {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No contact messages found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...contacts].reverse().map((contact) => (
            <div
  key={contact.id}
  ref={(el) => (contactRefs.current[contact.id] = el)}
  className={`bg-white rounded-lg border shadow-sm p-5 transition-shadow ${
    highlightedId === contact.id ? "ring-2 ring-purple-500" : "border-gray-200 hover:shadow-md"
  }`}
>

              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900">{contact.name}</h3>
                    {/* <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {contact.is_read? "Read" : "Unread"}
                    </span> */}
                  </div>

                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
  <a
    href={`mailto:${contact.email}`}
    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
  >
    <Mail className="mr-2" size={14} />
    {contact.email}
  </a>

  {contact.phone && (
    <a
      href={`tel:${contact.phone}`}
      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
    >
      <Phone className="mr-2" size={14} />
      {contact.phone}
    </a>
  )}
</div>


                  {contact.message && (
                    <p className="text-gray-700 text-sm">{contact.message}</p>
                  )}
                  <p className="text-xs text-gray-500">{formatDate(contact.created_at)}</p>
                </div>

                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

           {/* {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    contact.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                    contact.status === 'read' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {contact.status}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-2" size={14} />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-2" size={14} />
                    {contact.phone}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">{contact.message}</p>
                <p className="text-xs text-gray-500">{formatDate(contact.created_at)}</p>
              </div>
              
             <button
  onClick={() => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  }}
  className="text-red-500 hover:text-red-700 transition-colors p-1"
>
  <Trash2 size={18} />
</button>

            </div>
          </div>
        ))} */}
          
        </div>
      )}
      {/* Add Contact Modal */}
    {showFormModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
    <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-xl shadow-lg overflow-y-auto border p-6 space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Add Contact</h2>
        <button
          onClick={() => setShowFormModal(false)}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {[
          { label: "Name", key: "name", type: "text" },
          { label: "Email", key: "email", type: "email" },
          { label: "Phone", key: "phone", type: "text" },
          { label: "Message", key: "message", type: "text" },
        ].map(({ label, key, type }) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              value={formData[key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [key]: e.target.value,
                })
              }
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setShowFormModal(false)}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ContactForms;