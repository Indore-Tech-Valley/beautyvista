import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, Trash2, Plus } from "lucide-react";
import {
  adminFetchContacts,
  adminDeleteContact,
  adminAddContact,
} from "../../../redux/features/contactFormSlice/contactFormSlice";
import AddButton from "../../components/AddButton/AddButton";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useLayoutEffect } from "react";



const ContactForms = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contactForm?.contacts || []);
  const loading = useSelector((state) => state.contactForm?.loading);
  const error = useSelector((state) => state.contactForm?.error);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { id: contactIdFromURL } = useParams();
const contactRefs = useRef({});

useLayoutEffect(() => {
  if (contactIdFromURL && contactRefs.current[contactIdFromURL]) {
    // Wait for DOM to fully render before scrolling
    setTimeout(() => {
      contactRefs.current[contactIdFromURL]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }
}, [contactIdFromURL, contacts]);

useEffect(() => {
  dispatch(adminFetchContacts());
}, [dispatch]);

useLayoutEffect(() => {
  if (contactIdFromURL && contactRefs.current[contactIdFromURL]) {
    // Wait for DOM to fully render before scrolling
    setTimeout(() => {
      contactRefs.current[contactIdFromURL]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }
}, [contactIdFromURL, contacts]);



  useEffect(() => {
    dispatch(adminFetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(adminDeleteContact(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminAddContact(formData)).then(() => {
      dispatch(adminFetchContacts());
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowForm(false);
    });
  };

  return (
    <div className="space-y-8 p-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Contact Form Messages</h1>
       <AddButton
  label="Add Contact"
  isOpen={showForm}
  onClick={() => setShowForm(!showForm)}
/>

      </div>

      {/* Add Contact Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow border space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Name"
              className="border p-2 rounded w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="Phone"
              className="border p-2 rounded w-full"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="Message"
              className="border p-2 rounded w-full md:col-span-2"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-md font-medium w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
      )}

      {/* Contact List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
           <div
  key={contact.id}
  ref={(el) => (contactRefs.current[contact.id] = el)}
  className={`bg-white rounded-lg border shadow-sm transition ${
    contact.id === contactIdFromURL
      ? 'border-rose-600 ring-2 ring-rose-400'
      : 'border-gray-200'
  }`}
>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {contact.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Mail className="mr-1" size={14} />
                        {contact.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-1" size={14} />
                        {contact.phone}
                      </div>
                    </div>
                    <p className="text-gray-700">{contact.message}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-500 hover:text-red-700 transition self-start"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactForms;
