import React from 'react';
import { Plus, X } from 'lucide-react';

const AddButton = ({ label, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={isOpen}
      className=" text-white px-6 py-3 my-2 mb-4 rounded-lg flex items-center gap-2 font-bold shadow-lg bg-pink-600 hover:from-purple-600 hover:to-pink-600 active:scale-95 transition-all duration-200 w-full sm:w-auto"
    >
      {isOpen ? <X size={18} className="stroke-[2.5]" /> : <Plus size={18} className="stroke-[2.5]" />}
      {isOpen ? 'Cancel' : label}
    </button>
  );
};

export default AddButton;
