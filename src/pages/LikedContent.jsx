import React, { useEffect, useState } from 'react'
import { Container, Pagination, Spinner, VideoCard } from '../components'
import likeService from '../services/like'
import { addLikedVideos, deleteLikedVideos } from '../slices/videoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function LikedContent() {

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const dispatch = useDispatch()
  const likedVideoDataFromStore = useSelector((state) => state.videos.likedVideos)

  const queryParams = {
    page: page,
    limit: limit
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    likeService.getAllLikedVideos(queryParams)
    .then((response) => {
      if (response) {
        const videosData = response.data.likedVideos
        dispatch(addLikedVideos({videosData}))
        setTotalPage(response.data.totalPages)
      } else {
        dispatch(deleteLikedVideos())
      }
    })
    .catch((error) => toast.error(error))
    .finally(() => setLoading(false))
  }, [page])
  
  return (
    <div className='dark:text-white'>
      {
      loading ?
      <Spinner fullScreen/>
      :
      <Container>
        <h2 className='flex justify-center items-center text-xl font-bold mt-6'>Liked Videos</h2>
        {
        likedVideoDataFromStore.length > 0 ?
        <>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
            {likedVideoDataFromStore.map((likedVideo) => (
              <div 
              key={likedVideo.video._id} 
              className='flex justify-center items-center'
              >
                <VideoCard 
                  loading={false}
                  videoId={likedVideo.video._id}
                  ownerId={likedVideo.video.owner._id}
                  thumbnailUrl={likedVideo.video.thumbnail}
                  title={likedVideo.video.title}
                  avatarUrl={likedVideo.video.owner.avatar}
                  username={likedVideo.video.owner.username}
                  viewCount={likedVideo.video.views}
                  // createdAt={likedVideo.video.createdAt}
                  duration={likedVideo.video.duration}
                  likedOnDate={likedVideo.createdAt}
                />
              </div>
            ))}
          </div>
          <div className="py-5">
            <Pagination totalPages={totalPage} onPageChange={(page) => setPage(page)}/>
          </div>
        </>
        :
        <div className='w-full min-h-[30vh] flex justify-center items-center text-2xl font-bold mx-3 my-3'>
          No Liked Videos!
        </div>
        }
      </Container>
      }
    </div>
  )
}

export default LikedContent