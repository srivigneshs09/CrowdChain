// src/components/Modal.jsx

import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold text-center mb-4">{message}</h2>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className=" text-[#ffde59] py-2 px-6 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
