import React from 'react';
import { Plus } from 'lucide-react';

const AddButton = ({ label, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-pink-600 text-white px-4 lg:py-2 py-4  rounded-lg flex items-center gap-2 hover:bg-pink-700 transition w-full sm:w-auto"
    >
      <Plus size={16} />
      {isOpen ? 'Cancel' : label}
    </button>
  );
};

export default AddButton;
