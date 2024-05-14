import React from 'react';

const ConfirmModel = ({ isOpen, message, onClose, onDelete }) => {
    const handleDelete = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onDelete();
    };

    const handleCancel = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onClose();
    };

    return (
        <div
        className={`fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        >
        <div className="absolute inset-0 opacity-50"></div>
        <div className="z-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-96 text-white">
            <p className="mb-4 text-gray-950 dark:text-red-500 text-base">
                {
                message 
                ? 
                <>
                    <span className='text-xl font-semibold'>⚠️ Warning</span>
                    <p>{message}</p>
                </>
                : 
                <>
                    <span className='text-xl font-semibold'>⚠️ Warning</span>
                    <p>Are you sure you want to permanently delete the video?</p>
                </>
                }
                </p>
            <div className="flex justify-center space-x-4">
            <button
                className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded dark:text-white focus:outline-none"
                onClick={handleCancel}
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white focus:outline-none"
                onClick={handleDelete}
            >
                Delete
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmModel;
