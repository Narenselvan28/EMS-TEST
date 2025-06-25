// components/ConfirmModel.jsx
import React from 'react';

const ConfirmModel = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{title}</h3>
                <p className="text-gray-600 mb-6 text-center">{message}</p>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModel;
