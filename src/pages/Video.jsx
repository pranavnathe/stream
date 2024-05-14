import React, { useEffect, useState } from 'react'
import { likeButtonConfetti, subcribeButtonConfetti } from '../conf/confetti'
import likeService from '../services/like'
import videoService from '../services/video'
import subscriptionService from '../services/subscription'
import LikeIcon from '../assets/hand-thumbs-up.svg';
import LikedIcon from '../assets/hand-thumbs-up-fill.svg';
import ThreeDotsIcon from '../assets/three-dots-vertical.svg';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddToPlaylistModel, Button, ConfirmModel, Container, Description, Spinner } from '../components'
import { timeAgo } from '../conf/timestampsConverter'
import { formatViewCount } from "../conf/formatViewCount"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Video() {

  const { videoId } = useParams()
  const decodedVideoId = decodeURIComponent(videoId)
  const userData = useSelector((state) => state.auth.userData)
  const [video, setVideo] = useState({})
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [owner, setOwner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPlaylistModel, setShowPlaylistModal] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const navigate = useNavigate()

  const subscribeButtonHandeler = () => {
    subscriptionService.toggleSubscription(video.owner._id)
    .then((response) => {
      if (response) {
        setIsSubscribed(response.data.isSubsribed)
        if (response.data.isSubsribed) {
          subcribeButtonConfetti()
        }
      }
    })
  }

  const likeButtonHandeler = () => {
    likeService.toggleVideoLike(video._id)
    .then((response) => {
      if (response) {
        setIsLiked(response.data.liked)
        if (response.data.liked) {
          likeButtonConfetti()
        }
      }
    })
    .catch((error) => {
      console.error('Error in toggle like handeler:', error)
    })
  }

  const handleDelete = () => {
    const toastId = toast.loading("deleting..." , {className:"border-2 border-red-500"})
    videoService.deleteVideo(videoId)
    .then((response) => {
      if (response) {
        toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
      } else {
        toast.update(toastId, { render: `Error while deleting the video`, type: "error", isLoading: false, autoClose: 2000 })
      }
    })
    .then(() => navigate("/home"))
    setShowModal(false);
  }

  useEffect(() => {
    videoService.getVideoById(decodedVideoId)
    .then((response) => {
      const videoData = response.data
      // console.log(videoData)
      if (isFirstLoad) {
        // Call updateVideoViewCount only on first load
        videoService.updateVideoViewCount(videoData._id)
        .then((response) => {
          if (response) {
            setIsFirstLoad(false); // Update isFirstLoad after first load
          }
        })
        .catch((error) => {
          console.error("Error while updating view :: ",error)
          setIsFirstLoad(true)
        })
      }
      
      likeService.isLikedVideo(videoId)
      .then((response) => {
        if (response) setIsLiked(response.data.isLiked)
      })
      .catch((error) => toast.error(error));

      if (videoData.owner._id === userData._id) {
        setOwner(true)
      } else {
        setOwner(false)
      }
      setVideo(videoData)
      setIsSubscribed(video.owner.isSubscribed)
    })
    .then(() => setLoading(false))
    .catch((error) => {
      console.error('Error fetching video:', error)
    })
    .finally(() => setLoading(false))
  }, [decodedVideoId, isSubscribed, isLiked, owner, videoId])

  return (
    <div className='dark:bg-backgroundDark'>
      {
      loading ?
      <Spinner fullScreen/>
      :
      <>
        <Container className="pb-8 text-textBlack dark:text-white">
          {
            owner &&
            <div className='mt-4 gap-5 flex justify-between items-center'>
              <Button 
              onClick={() => navigate(`/edit-video/${video._id}`)}
              className="w-full h-12 rounded-lg text-black dark:text-white hover:text-base hover:font-bold ease-in-out"
              >
                Edit Video
              </Button>
              <Button 
              onClick={() => setShowModal(true)}
              className="w-full h-12 rounded-lg text-red-500 hover:text-base hover:font-bold ease-in-out dark:hover:text-red-500 hover:border-red-500 dark:hover:border-red-500"
              >
                Delete Video
              </Button>
              <ConfirmModel
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDelete={handleDelete}
              />
            </div>
          }
          <div className='w-full pt-4 '>
            <video src={video.videoFile} controls="true" className='w-full h-full'></video>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <h2 className='text-2xl font-bold'>{video.title}</h2>
              <Button
              onClick={() => setShowPlaylistModal(true)}
              className="dark:bg-neutral-700 border-none bg-opacity-60 dark:bg-opacity-40"
              >
                <img 
                className='dark:invert'
                src={ThreeDotsIcon} 
                alt="Edit button" 
                />
              </Button>
              <AddToPlaylistModel
              isOpen={showPlaylistModel}
              onClose={() => setShowPlaylistModal(false)}
              videoId={videoId}
              userId={userData._id}
              />
          </div>
          <div className='w-full flex justify-between items-center'>
            <div className='flex justify-center items-center gap-4 py-2'>
              <Link to={`/channel/${video.owner.username}`}>
                <img src={video.owner.avatar} alt="avatar" className='h-10 w-10 rounded-full'/>
              </Link>
              <div className='flex flex-col'>
                <span className='text-base font-bold'>{video.owner.username}</span>
                <span className='text-xs opacity-60'>{formatViewCount(video.owner.subscribersCount)} subscribers</span>
              </div>
              <div onClick={subscribeButtonHandeler}>
                {
                  video.owner.isSubscribed ?
                  <Button className='hover:text-red1 hover:border-red1 hover:dark:border-red1 hover:dark:text-red1'>
                    Subscribed
                  </Button>
                  :
                  <Button className='hover:bg-grey1 hover:text-white dark:bg-white dark:text-textBlack hover:dark:bg-white hover:dark:opacity-90 hover:dark:text-red1'>
                    Subscribe
                  </Button>
                }
              </div>
            </div>
            <div
            onClick={likeButtonHandeler} 
            className='px-6 py-2 rounded-3xl flex justify-center items-center bg-grey dark:bg-grey1'
            >
              {
                isLiked ?
                <img src={LikedIcon} alt="like button" className='dark:invert w-6 h-5 cursor-pointer'/>
                :
                <img src={LikeIcon} alt="like button" className='dark:invert w-6 h-5 cursor-pointer'/>
              }
            </div>
          </div>
          <div className='text-base bg-grey dark:bg-grey1 p-5 rounded-xl bg-opacity-50'>
            <p className='font-bold pb-2'>{video.views} views {timeAgo(video.createdAt)}</p>
            <Description text={video.description} maxWords={30}/>
          </div>
        </Container>
      </>
      }
    </div>
  )
}

export default Video