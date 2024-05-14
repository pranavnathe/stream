import React, { useEffect, useState } from 'react'
import { Button, Container, Input, Pagination, Select, Spinner, VideoCard } from '../components'
import { useDispatch, useSelector } from "react-redux"
import { addVids, deleteVids } from '../slices/videoSlice'
import videoService from '../services/video'

function Home() {

  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [loading, setLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(0)
  const [search, setSearch] = useState("")
  const [isFilterOpen, setisFilterOpen] = useState(false)
  
// console.log(allVideos);

  const handleSelectChange = (selectedValue) => {
    // Handle the selected value in the parent component
    if (selectedValue == "Ascending") {
      setSortBy("asc")
    } else if (selectedValue == "Descending") {
      setSortBy("des")
    } else {
      setSortBy("")
    }
    // console.log("Selected value:", selectedValue);
  };

  const DEBOUNCE_DELAY = 300
  const dispatch = useDispatch()
  const videoDataStore = useSelector((state) => state.videos.videos)
  // console.log(videoDataStore);

  const queryParams = {
    page: page,
    limit: 12,
    query: searchText,
    sortBy: sortBy
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    videoService.getAllVideos(queryParams)
    .then((response) => {
      if (response) {
        const videosData = response.data.videoData
        dispatch(addVids({videosData}))
        setTotalPage(response.data.totalPages)
      } else {
        dispatch(deleteVids())
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, [page, searchText, sortBy])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchText(search);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(debounceTimer);
  }, [search])

  return (
    <>
      {
      loading ?
      <Spinner fullScreen/>
      :
      <div className='w-full bg-white text-textBlack dark:bg-backgroundDark dark:text-white'>
        <Container>
          <div className='w-full py-3 flex justify-between'>
            <div className="w-96 px-3">
              <Input 
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
            onClick={() => setisFilterOpen(!isFilterOpen)}
            className="rounded-lg"
            >Filters</Button>
          </div>
          <div className={`${isFilterOpen ? "block" : "hidden"}`}>
            <Select 
            className="max-w-40"
            options={["None", "Ascending", "Descending"]} 
            label="Duration"
            onChange={handleSelectChange}
            />
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
            {videoDataStore.map((video) => (
              <div 
              key={video._id} 
              className='flex justify-center items-center'
              >
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
            ))}
          </div>
          <div className="py-5">
            <Pagination totalPages={totalPage} onPageChange={(page) => setPage(page)}/>
          </div>
        </Container>
      </div>
      }
    </>
  )
}

export default Home