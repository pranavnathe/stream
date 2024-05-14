import { Button, Container, Input, Textarea, Uploader } from '../components/'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import videoService from '../services/video'
import { useNavigate } from 'react-router-dom'

function UploadVideo() {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [videoFile, setVideoFile] = useState(null)
    const maxTextLength = 500;
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      const toastId = toast.loading("uploading..." , {className:"border-2 border-black dark:border-slate-500"})

      // Construct form data object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnailFile);

      try {
          await videoService.uploadVideo(formData)
          .then((videoData) => {
              if (videoData) {
                  toast.update(toastId, { render: `${videoData.message}`, type: "success", isLoading: false, autoClose: 2000 })
              }
              navigate(-1)
          })
      } catch (error) {
          console.error("Upload failed:", error);
          toast.update(toastId, { render: `${error}`, type: "error", isLoading: false, autoClose: 5000 },)
      }
  };
  
  return (
    <Container className="flex justify-center items-center">
      <form action="" className="grid m-4 md:grid-cols-2 md:gap-3 md:max-w-4xl max-w-[480px] text-textBlack dark:text-white dark:bg-black">
          <div className="w-full p-5 gap-3 flex flex-col justify-center items-center sm:justify-start sm:gap-6 sm:px-10" >
              <h2 className="font-bold text-2xl p-3">Upload New Video</h2>
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
          </div>
          <div className=" w-full p-5 flex flex-col justify-center items-center gap-3 sm:px-10" >
              <Uploader 
              value={thumbnailFile} 
              onChange={(file) => {
                  setThumbnailFile(file);
              }} 
              name="Upload thumbnail"
              />
              <Uploader 
              value={videoFile} 
              onChange={(file) => {
                  setVideoFile(file);
              }} 
              fileFormat = "video/*"
              name="Upload video file"
              />
              <Button 
              onClick={handleSubmit} // Handle form submission
              className="w-full h-12 rounded-lg bg-loginBlue text-white dark:bg-loginBlueDark dark:text-white hover:text-base hover:font-bold ease-in-out"
              >Upload</Button>
          </div>
      </form>
    </Container>
  )
}

export default UploadVideo