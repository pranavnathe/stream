import React from 'react';

const ErrorModel = ({ isOpen, message, onClose, time }) => {

    const handleButtonClick = (event) => {
        event.preventDefault();
        // window.location.reload() // Reload the page
        onClose();
    };

    return (
        <div
        className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        >
            <div className="absolute inset-0 opacity-50"></div>
            <div className="z-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-96 text-white">
                <p className="flex flex-col justify-center items-center mb-4 text-gray-950 dark:text-red-500 text-xl font-bold">
                    {
                    message 
                    ? 
                    <>
                        <p>{message}</p>
                        <span className='text-base font-light text-green-500 dark:text-green-500'>{`Reloading in ${ time / 1000 }sec`}</span>
                    </>
                    : 
                    <>
                        <span className='text-xl font-semibold'>⚠️ Warning</span>
                        <p>Error Occured</p>
                    </>
                    }
                    </p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded dark:text-white focus:outline-none"
                        onClick={handleButtonClick}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModel;