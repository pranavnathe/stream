import React, { useState } from "react"
import { Button, Uploader } from "./index"

const UploaderModel = ({ isOpen, onClose, onUpdate, name, maxImageSize }) => {

    const [selectedFile, setSelectedFile] = useState(null)

    const handleUpdate = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onUpdate({selectedFile});
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
            <div className="flex flex-col justify-center items-center gap-4 rounded-xl p-6 bg-slate-300 dark:bg-gray-800 border-2">
                    <Uploader 
                        name={`Edit ${name}`}
                        onChange={(file) => {
                            setSelectedFile(file);
                        }}
                        maxImageSize={maxImageSize}
                    />
                <div className="flex justify-between items-center gap-5 w-full pt-2">
                    <Button 
                    onClick={handleCancel} 
                    className="w-full rounded-xl text-red-500 border-red-500 hover:bg-slate-200 dark:hover:border-red-400 dark:border-red-500 dark:text-red-500"
                    >
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleUpdate}
                    className="w-full rounded-xl"
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UploaderModel