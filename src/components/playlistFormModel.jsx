import React, { useEffect, useState } from 'react';
import {Input, Textarea} from "./"
import { toast } from 'react-toastify';

const PlaylistFormModel = ({ isOpen, message, onClose, onCreate, Data }) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    
    useEffect(() => {
        if (Data) {
            setName(Data.name || "");
            setDescription(Data.description || "");
        }
    }, [Data]);

    const handelSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!Data) {
            if (!name) return toast.error("Playlist name is required")
            if (!description) return toast.error("description is required")
        }
        onCreate({name, description});
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
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-40 bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-96 text-white">
            <p className="mb-4 text-neutral-950 dark:text-white text-base">
                {
                message &&
                <>
                    <span className='font-semibold'>{message}</span>
                </>
                }
            </p>
            <div className='flex flex-col justify-center items-center gap-6 my-4'>
                <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                placeholder="Enter playlist name"
                />
                <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxTextLength={200}
                label="Description"
                placeholder="Enter playlist description"
                />
            </div>
            <div className="flex justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded dark:text-white focus:outline-none"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white focus:outline-none"
                    onClick={handelSubmit}
                >
                    {Data ? "Update" : "Create"}
                </button>
            </div>
        </div>
        </div>
    );
};

export default PlaylistFormModel;