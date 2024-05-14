import React, { useEffect, useState } from 'react';
import playlistService from '../services/playlist';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const AddToPlaylistModel = ({ isOpen, onClose, videoId, userId }) => {
    
    const [playlistsData, setPlaylistsData] = useState([])
    const navigate = useNavigate()

    const handleClick = (playlistId) => {
        const toastId = toast.loading("Adding..." , {className:"border-2"})
        playlistService.addVideoToPlaylist({playlistId, videoId})
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
                }
            })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        onClose()
    };

    const handleCancel = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onClose();
    };

    useEffect(() => {
        playlistService.getPlaylistbyUserId(userId)
        .then((response) => {
            setPlaylistsData(response.data)
        })
        .catch((error) => toast.error(error))
    }, [videoId, userId])

    return (
        <div
        className={`fixed inset-0 flex items-center justify-center z-20 shadow-2xl backdrop-blur-sm ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        >
        <div className="z-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-96 text-white">
            <p className='p-2 text-xl font-bold'>Your Playlists</p>
            <p className='mx-2 text-base opacity-60'>Click to add in playlist</p>
            {
            playlistsData?.length > 0 ?
            <div className='flex flex-col items-center justify-center my-4'>
                {playlistsData.map((playlist) => (
                    <div
                    key={playlist._id}
                    onClick={() => handleClick(playlist._id)}
                    className='w-full flex justify-start items-center dark:bg-gray-800 p-2 m-2 gap-3 cursor-pointer'
                    >
                        <p className='text-base'>
                            🔹 {playlist.name}
                        </p>
                    </div>
                ))}
            </div>
            :
            <div className='flex flex-col justify-center items-center text-2xl my-6 gap-2'>
                No playlist to show!
                <Button 
                onClick={() => navigate("/playlist")}
                size='large'>Go to Playlist</Button>
            </div>
            }
            <div className="flex justify-center space-x-4">
            <button
                className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded dark:text-white focus:outline-none"
                onClick={handleCancel}
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    );
};

export default AddToPlaylistModel;