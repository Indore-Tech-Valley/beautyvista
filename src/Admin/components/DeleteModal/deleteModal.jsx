import React, { useEffect, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const DeleteModal = ({ message = "Are you sure you want to delete this?", onConfirm, onCancel }) => {
  const modalRef = useRef();

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 h-full z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-full max-w-sm rounded-xl shadow-xl px-6 py-5 relative"
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <Trash2 size={36} className="text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-center text-red-600">
          Confirm Deletion
        </h3>

        {/* Message */}
        <p className="text-center text-sm text-gray-800 mt-2">{message}</p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="w-1/2 bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 bg-red-500 text-white hover:bg-red-600 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteModal;
