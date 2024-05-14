import React, { useEffect, useState } from 'react'
import { Container, Spinner, VideoCard } from '../components'
import { toast } from 'react-toastify'
import userService from '../services/user'

function WatchHistory() {

  const [loading, setLoading] = useState(true)
  const [watchHistoryVideos, setWatchHistoryVideos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetchWatchHistory();
  }, []); // Run once when the component mounts

  const fetchWatchHistory = () => {
    userService
      .getWatchHistory()
      .then((response) => {
        if (response) {
          setWatchHistoryVideos(response.data);
        }
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };
  
  const removeFromWatchHistory = (videoId) => {
    userService
      .removeFromWatchHistory(videoId)
      .then((response) => {
        if (response) {
          toast.success("removed from watch history");
          setWatchHistoryVideos((prevHistory) =>
            prevHistory.filter((video) => video._id !== videoId)
          )
        }
      })
      .catch((error) => toast.error(error));
  }
  
  return (
    <div className='dark:text-white'>
      {
      loading ?
      <Spinner fullScreen/>
      :
      <Container>
        <h2 className='flex justify-center items-center text-xl font-bold mt-6'>Watch History</h2>
        {
        watchHistoryVideos.length > 0 ?
        <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
          {watchHistoryVideos.map((video) => (
            <div 
            key={video._id} 
            className='flex justify-center items-center'
            >
              <div className='relative'>
                <VideoCard 
                  loading={false}
                  videoId={video._id}
                  ownerId={video.owner._id}
                  thumbnailUrl={video.thumbnail}
                  title={video.title}
                  avatarUrl={video.owner.avatar}
                  username={video.owner.username}
                  viewCount={video.views}
                  duration={video.duration}
                />
                <div
                onClick={() => removeFromWatchHistory(video._id)}
                className='absolute bottom-2 right-2 text-xl cursor-pointer group'>
                  <span className='flex flex-col gap-2 justify-center items-end'>
                    ❌
                    <p className='text-base px-3 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-red-950'>remove from watch history</p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        :
        <div className='w-full min-h-[30vh] flex justify-center items-center text-2xl font-bold mx-3 my-3'>
          No Watch History!
        </div>
        }
      </Container>
      }
    </div>
  )
}

export default WatchHistory