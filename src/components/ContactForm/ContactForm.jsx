import React, { useEffect, useState } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/features/contactFormSlice/contactFormSlice";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
  const dispatch = useDispatch();
const loading = useSelector((state) => state.contacts?.loading);
const error = useSelector((state) => state.contacts?.error);


  // Local state for form data, errors, and success
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (formSuccess) {
      const timeout = setTimeout(() => setFormSuccess(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [formSuccess]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation logic
  const validate = () => {
    const { firstName, lastName, email, phone, message } = formData;

    if (!firstName.trim() || firstName.length < 2) {
      setFormError("First name must be at least 2 characters.");
      return false;
    }

    if (!lastName.trim() || lastName.length < 2) {
      setFormError("Last name must be at least 2 characters.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setFormError("Phone number must be 10 to 15 digits.");
      return false;
    }

    if (!message.trim() || message.length < 10) {
      setFormError("Message must be at least 10 characters.");
      return false;
    }

    setFormError(""); // Clear previous errors
    return true;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await dispatch(
        addContact({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        })
      ).unwrap();

      setFormSuccess(res.message || "Message sent successfully!");
      toast.success(res.message || "Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(err || "Failed to send message");
    }
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 lg:py-8 py-6">
        <div className="flex flex-col lg:flex-row lg:gap-20 gap-8 items-start">

          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-rose-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                Have any questions? We're always here to assist you and make your experience smooth and comfortable!
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-5 border rounded-2xl shadow-sm bg-white">
                <FaPhoneAlt className="text-rose-700 text-2xl" />
                <span className="text-lg">+0123456789</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-rose-700 text-white rounded-2xl shadow-sm">
                <FaEnvelope className="text-2xl" />
                <span className="text-lg">example@email.com</span>
              </div>
              <div className="flex items-center gap-4 p-5 border rounded-2xl shadow-sm hover:bg-rose-50 transition cursor-pointer">
                <FaMapMarkerAlt className="text-rose-700 text-2xl" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Indore+tech+Valley,indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-800"
                >
                  Indore Tech Valley, Indore
                </a>
              </div>
              <span className="text-sm text-rose-500 block">
                Note: Click on location to get directions to our beauty studio.
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                <div
                  key={idx}
                  className="relative w-12 h-12 bg-rose-700 text-white rounded-full overflow-hidden group transition"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    <Icon className="text-lg" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    <Icon className="text-lg" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 bg-white shadow-lg lg:p-8 p-2 rounded-2xl space-y-6"
            noValidate
          >
            {/* Input Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={50}
                className="border p-4 rounded-md w-full focus:outline-rose-700"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={50}
                className="border p-4 rounded-md w-full focus:outline-rose-700"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-4 rounded-md w-full focus:outline-rose-700"
            />

            <input
              type="tel"
              name="phone"
              inputMode="numeric"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              title="Phone number should be 10-15 digits"
              className="border p-4 rounded-md w-full focus:outline-rose-700"
            />

            <textarea
              rows={5}
              name="message"
              placeholder="Type your message here... *"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1000}
              className="border p-4 rounded-md w-full focus:outline-rose-700"
            ></textarea>

            {/* Error Message */}
            {formError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
                <span className="font-medium">⚠️ {formError}</span>
              </div>
            )}

            {/* Success Message */}
            {formSuccess && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md border border-green-300">
                <span className="font-medium">✅ {formSuccess}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="lg:w-full relative group block w-full text-center bg-rose-700 hover:bg-rose-800 text-white px-6 py-4 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[50px] transition-colors duration-300 ease-in-out"
            >
              {/* Top Layer */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane className="ml-2" />
                  </>
                )}
              </span>

              {/* Bottom Layer */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane className="ml-2" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
