import React, { useEffect, useState } from 'react'
import { Button, ConfirmModel, Container, PlaylistFormModel} from '../components'
import playlistService from '../services/playlist'
import { useDispatch, useSelector } from 'react-redux'
import { addPlaylist, deletePlaylist } from '../slices/playlistSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Playlist() {

  const userData = useSelector((state) => state.auth.userData)
  const playlistData = useSelector((state) => state.playlist.playlists)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(deletePlaylist())
    playlistService.getPlaylistbyUserId(userData._id)
    .then((response) => {
      if (response) {
        const playlistData = response.data
        dispatch(addPlaylist({playlistData}))
      } else {
        dispatch(deletePlaylist())
      }
    })
    .catch((error) => {
      toast.error(error)
      dispatch(deletePlaylist())
    })
  }, [userData, refresh])

  const handleClick = (id) => {
    navigate(`/playlist/view/${id}`)
  }

  const handleDelete = (id) => {
    const toastId = toast.loading("deleting..." , {className:"border-2"})
    playlistService.deletePlaylist(id)
    .then((res) => {
      toast.update(toastId, { render: `${res.message}`, type: "success", isLoading: false, autoClose: 2000 })
    })
    .then(() => setRefresh(!refresh))
    .catch((err) => toast.update(toastId, { render: err, type: "error", isLoading: false, autoClose: 2000 }))
    setShowConfirmModal(false)
  }

  const handelCreateNewPlaylist = ({name, description}) => {
    const toastId = toast.loading("creating..." , {className:"border-2"})
    playlistService.createPlaylist({name, description})
    .then((res) => {
      if (res) {
        toast.update(toastId, { render: `${res.message}`, type: "success", isLoading: false, autoClose: 2000 })
      }
    })
    .then(() => setRefresh(!refresh))
    .catch((err) => toast.update(toastId, { render: err, type: "error", isLoading: false, autoClose: 2000 }))
    setShowCreatePlaylistModal(false)
  }

  return (
    <div className='dark:text-white my-4'>
      <Container>
      <h2 className='flex justify-center items-center text-xl font-bold mt-6'>Playlists</h2>
        <div className='w-full flex justify-between items-center p-2'>
          <Button
          onClick={() => setShowCreatePlaylistModal(true)}
          >
            Create
          </Button>
          <Button
          onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          <PlaylistFormModel
          isOpen={showCreatePlaylistModal}
          onClose={() => setShowCreatePlaylistModal(false)}
          message="Create New Playlist"
          onCreate={handelCreateNewPlaylist}
          />
        </div>
        {
        playlistData.length > 0 ?
        <div className='w-full my-4 grid sm:grid-cols-2 lg:grid-cols-3 justify-center items-center'>
            {playlistData.map((playlist) => (
              <div 
              key={playlist._id} 
              className='my-6 mx-4 flex flex-col justify-center items-center max-w-80'
              >
                <div className='relative flex justify-center items-center w-full  '>
                  {
                  playlist.videos ?
                  <img 
                  onClick={() => handleClick(playlist._id)}
                  className='h-48 object-cover rounded-lg z-[1] shadow-2xl cursor-pointer'
                  src={playlist.videos.thumbnail} 
                  alt={playlist.name} 
                  />
                  :
                  <div 
                  onClick={() => handleClick(playlist._id)}
                  className='min-w-full flex justify-center items-center h-48 object-cover rounded-lg z-[1] bg-neutral-100 dark:bg-neutral-700 bg shadow-2xl cursor-pointer'>
                    <div className='rounded-full flex justify-center items-center font-bold text-4xl w-20 h-20 bg-neutral-200 dark:bg-neutral-800'>
                      !
                    </div>
                  </div>
                  }
                  { editMode &&
                  <div className='absolute p-2 flex justify-end items-center top-0 w-full z-10'>
                      <Button
                      onClick={() => setShowConfirmModal(true)}
                      className="rounded-xl shadow-2xl border-red-500 text-red-500 hover:border-red-700 dark:border-red-500 dark:text-red-500 dark:hover:border-red-700"
                      >
                        Delete
                      </Button>
                      <ConfirmModel 
                      isOpen={showConfirmModal}
                      onClose={() => setShowConfirmModal(false)}
                      message={"Are you sure you want to permanently delete the playlist?"}
                      onDelete={() => handleDelete(playlist._id)}
                      />
                  </div>}
                  <div className='absolute -top-2.5 w-full max-w-[310px] h-44 bg-neutral-200 dark:bg-neutral-800 z-0 rounded-lg shadow-2xl'></div>
                  <div className='absolute -top-5 w-full max-w-72 h-44 bg-neutral-300 dark:bg-neutral-900 -z-[1] rounded-lg shadow-2xl'></div>
                </div>
                <p className='text-lg max-h-12 font-bold overflow-hidden mt-4'>{playlist.name}</p>
                <span 
                onClick={() => handleClick(playlist._id)}
                className='text-sm mt-1 cursor-pointer'
                >view full playlist</span>
              </div>
            ))}
          </div>
          : 
          <div className='w-full min-h-[30vh] flex justify-center items-center text-2xl font-bold mx-3 my-3'>
          You have not created any Playlist yet!
          </div>
          }
      </Container>
    </div>
  )
}

export default Playlist