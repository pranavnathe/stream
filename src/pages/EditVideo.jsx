import { Button, ConfirmModel, Container, Input, Select, Spinner, Textarea, Uploader } from '../components/'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import videoService from '../services/video'
import { useSelector } from 'react-redux'

function EditVideo() {
    const { videoId } = useParams()
    const userData = useSelector((state) => state.auth.userData)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thuumbnailUrl, setThumbnailUrl] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [publishValue, setPublishValue] = useState(true)
    const maxTextLength = 500
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      event.preventDefault()
      const toastId = toast.loading("uploading..." , {className:"border-2"})

      // Construct form data object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnailFile);

      try {
          videoService.updateVideo({formData, videoId})
          .then((videoData) => {
              if (videoData) {
                  toast.update(toastId, { render: `${videoData.message}`, type: "success", isLoading: false, autoClose: 2000 })
              }
              navigate(-1)
          })
      } catch (error) {
          console.error("Update failed:", error);
          toast.update(toastId, { render: `${error}`, type: "error", isLoading: false, autoClose: 5000 })
      }
  };

  const togglePublishValue = (event) => {
    event.preventDefault()
    const toastId = toast.loading("toggling..." , {className:"border-2 border-red-500"})
    try {
      videoService.togglePublishStatus(videoId)
      .then((response) => {
        if (response) {
          setPublishValue(response.data.isPublished)
          toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
        }
      })
    } catch (error) {
      toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 })
    }
  }

  const handleDelete = () => {
    const toastId = toast.loading("deleting..." , {className:"border-2 border-red-500"})
    videoService.deleteVideo(videoId)
    .then((response) => {
      if (response) {
        toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
      }
    })
    .then(() => navigate("/home"))
    .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
    setShowModal(false);
  }

  useEffect(() => {
    videoService.getVideoById(videoId)
    .then((videoData) => {
      const video = videoData.data
      if (video.owner._id === userData._id) {
        setTitle(video.title)
        setDescription(video.description)
        setThumbnailUrl(video.thumbnail)
        setPublishValue(video.isPublished)
      } else {
        navigate('/home')
        toast.error("invalid request")
      }
    })
    .catch((error) => {
      navigate('/home')
      toast.error(error)
    })
    .finally(() => setLoading(false))
  }, [videoId])
  
  return (
    <>
    {
      loading ?
      <Spinner fullScreen/>
      :
      <Container className="flex justify-center items-center">
        <form 
        // action="" 
        onSubmit={handleSubmit}
        className="grid m-4 max-w-[480px] text-textBlack dark:text-white dark:bg-black"
        >
            <div className="w-full p-5 gap-3 flex flex-col justify-center items-center sm:justify-start sm:gap-6 sm:px-10" >
                <h2 className="font-bold text-2xl p-3">Edit Video</h2>
                <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                label="Title" 
                required="true"
                placeholder="Enter video Title"
                />
                <Textarea
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                label="Description" 
                required="true"
                rows={10} 
                cols={50} 
                maxTextLength={maxTextLength}
                placeholder="Enter your description here..."
                />
                <Uploader 
                    value={thumbnailFile}
                    imageUrl={thuumbnailUrl}
                    className='dark:bg-opacity-90'
                    onChange={(file) => {
                        setThumbnailFile(file);
                    }}
                    name="Upload thumbnail"
                />
                <div className='w-full gap-2 flex flex-col justify-center items-center'>
                  <span className='text-sm'>Click to change publish status</span>
                  <Button
                  onClick={togglePublishValue}
                  className="w-full rounded-lg font-semibold border-none"
                  >
                    {
                      publishValue ? "Public" : "Private"
                    }
                  </Button>
                </div>
                <Button 
                    onClick={handleSubmit} // Handle form submission
                    className="w-full h-12 rounded-lg bg-loginBlue text-white dark:bg-loginBlueDark dark:text-white hover:text-base hover:font-bold ease-in-out"
                >
                  Update Video
                </Button>
                <Button 
                    onClick={() => setShowModal(true)}
                    type="button" // Add this line to prevent form submission
                    className="w-full h-12 rounded-lg bg-red-600 text-white dark:bg-red-700 dark:text-white hover:text-base hover:font-bold ease-in-out dark:hover:text-red-500 hover:border-red-500 dark:hover:border-red-500"
                >
                  Delete Video
                </Button>
                <ConfirmModel 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDelete={handleDelete}
                />
            </div>
        </form>
      </Container>
    }
    </>
  )
}

export default EditVideo