import React, { useEffect, useState } from 'react'
import { Button, ConfirmModel, Container, Input, Textarea, VideoCard } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import playlistService from '../services/playlist'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function SinglePlaylist() {
    const { playlistId } = useParams()
    const userData = useSelector((state) => state.auth.userData)
    const [PlaylistData, setPlaylistData] = useState({})
    const [name, setName] = useState("")
    const [owner, setOwner] = useState(false)
    const [description, setDescription] = useState("")
    const [readOnly, setReadOnly] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPlaylistData("")
        playlistService.getPlaylistbyPlaylistId(playlistId)
        .then((response) => {
            if (response) {
                setPlaylistData(response.data)
                setName(response.data.name)
                setDescription(response.data.description)
                if (response.data.owner._id === userData._id) {
                    setOwner(true)
                } else {
                    setOwner(false)
                }
            }
        })
        .catch((error) => toast.error(error))
    }, [playlistId, refresh])

    const handelDelete = () => {
        const toastId = toast.loading("deleting..." , {className:"border-2"})
        playlistService.deletePlaylist(playlistId)
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => setShowConfirmModal(false))
        navigate(-1)
    }

    const handelUpdateButton = () => {
        const toastId = toast.loading("updating..." , {className:"border-2"})
        playlistService.updatePlaylist({name, description, playlistId})
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .then(() => setRefresh(!refresh))
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => setReadOnly(false))
    }

    const removeVideoFomPlaylist = (id) => {
        const toastId = toast.loading("removing..." , {className:"border-2"})
        playlistService.removeFromPlaylist({playlistId, videoId: id})
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .then(() => setRefresh(!refresh))
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
    }

    return (
        <div className='dark:text-white my-4'>
            <Container>
                <div className='w-full my-4 grid grid-cols-1 lg:grid-cols-3 justify-items-center items-center gap-4'>
                    <div className={`w-full  flex flex-col items-center`}>
                        {
                        PlaylistData.videos?.length > 0 ?
                        <div className='relative w-full flex flex-col justify-start items-center'>
                            <div className='w-full bg-gradient-to-t from-transparent to-neutral-400 opacity-50'>
                                <img
                                className='object-cover w-full h-64 blur-lg'
                                src={PlaylistData.videos[0].thumbnail} 
                                alt={PlaylistData.name} 
                                />
                            </div>
                            <img 
                            onClick={() => handleClick(PlaylistData._id)}
                            className='absolute max-w-80 top-4 h-48 object-cover rounded-lg z-[1] shadow-2xl cursor-pointer'
                            src={PlaylistData.videos[0].thumbnail} 
                            alt={PlaylistData.name} 
                            />
                        </div>
                        :
                        <div className='relative w-full flex flex-col justify-start items-center'>
                            <div className='w-full bg-gradient-to-t from-transparent to-neutral-400 opacity-50'>
                                <div className='bg-neutral-700 w-full h-64 blur-lg'></div>
                            </div>
                            <div className='absolute w-full top-4 max-w-80 flex justify-center items-center h-48 object-cover rounded-lg z-[1] bg-neutral-100 dark:bg-neutral-700 bg shadow-2xl cursor-pointer'>
                                <div className='rounded-full flex justify-center items-center font-bold text-4xl w-20 h-20 bg-neutral-200 dark:bg-neutral-800'>
                                !
                                </div>
                            </div>
                        </div>
                        }
                        <div className='w-full flex justify-between items-center gap-4 -mt-6 mb-4 z-10'>
                            <Button 
                            onClick={() => setShowConfirmModal(true)}
                            className="w-full hover:text-red-700 hover:border-red-700 text-red-400 border-red-500 dark:hover:text-red-700 dark:hover:border-red-700 dark:text-red-400 dark:border-red-500"
                            >
                                Delete
                            </Button>
                            <Button 
                            onClick={() => setReadOnly(!readOnly)}
                            className="w-full"
                            >
                                {readOnly ? "Cancel" : "Edit"}
                            </Button>
                            <ConfirmModel 
                            isOpen={showConfirmModal}
                            onClose={() => setShowConfirmModal(false)}
                            onDelete={handelDelete}
                            message="Are you sure you want to permanently delete the playlist?"
                            />
                        </div>
                        {
                        readOnly ?
                        <div className='w-full flex flex-col items-center gap-4'>
                            <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxTextLength={200}
                            />
                            <Button
                            onClick={handelUpdateButton}
                            className="w-full"
                            >
                                Update
                            </Button>
                        </div>
                        :
                        <div className='w-full flex flex-col items-start gap-2'>
                            <h3 className='text-2xl'>{PlaylistData.name}</h3>
                            <p className='text-base opacity-65 break-words w-full '>{PlaylistData.description}</p>
                        </div>
                        }
                    </div>
                    <div className='w-full lg:col-span-2 justify-items-center items-center'>
                        {
                        PlaylistData.videos?.length > 0 ?
                        <div className='grid sm:grid-cols-2 gap-4'>
                            {PlaylistData.videos.map((video) => (
                                <div 
                                key={video._id} 
                                className='flex justify-center items-center'
                                >
                                    <div className='relative'>
                                        {readOnly && 
                                        <Button 
                                        onClick={() => removeVideoFomPlaylist(video._id)}
                                        className="absolute z-10 top-6 right-6"
                                        >
                                            ❌
                                        </Button>}
                                        <VideoCard 
                                            loading={false}
                                            videoId={video._id}
                                            ownerId={video.owner._id}
                                            thumbnailUrl={video.thumbnail}
                                            title={video.title}
                                            avatarUrl={video.owner.avatar}
                                            username={video.owner.username}
                                            viewCount={video.views}
                                            createdAt={video.createdAt}
                                            duration={video.duration}
                                        />  
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div>No video added to this playlist</div>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SinglePlaylist