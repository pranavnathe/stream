import React, { useEffect, useState } from 'react'
import { Button, ConfirmModel, Container, Input, Pagination, Select, VideoCard } from '../components'
import { toast } from 'react-toastify'
import dashboardService from '../services/dashboard'
import videoService from '../services/video'
import { addVids, deleteVids } from '../slices/videoSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatViewCount } from '../conf/formatViewCount'

function Dashboard() {

    const videoDataStore = useSelector((state) => state.videos.videos)
    const [isSelected, setIsSlected] = useState(true)
    const [dashboardData, setDasboardData] = useState({totalChannelsViews: 0, totalSubscribersCount: 0, totalVideoCount: 0})
    const [searchText, setSearchText] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [videoRef, setVideoRef] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [search, setSearch] = useState("")
    const [isFilterOpen, setisFilterOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [videoId, setVideoId] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const DEBOUNCE_DELAY = 300

    const handleSelectChange = (selectedValue) => {
        // Handle the selected value in the parent component
        if (selectedValue == "Ascending") {
            setSortBy("asc")
        } else if (selectedValue == "Descending") {
            setSortBy("des")
        } else {
            setSortBy("")
        }
    };

    const queryParams = {
        page,
        sortBy,
        limit: 12,
        query: searchText,
    }

    const handleDelete = () => {
        const toastId = toast.loading("deleting..." , {className:"border-2 border-red-500"})
        videoService.deleteVideo(videoId)
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .then(() => setVideoRef(!videoRef))
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        setVideoId("")
        setShowModal(false)
    }

    const fetchVideos = () => {
        dashboardService.allChannelVideos(queryParams)
        .then((response) => {
            if (response) {
                const videosData = response.data.videosData
                // console.log( "videodata", videosData);
                dispatch(addVids({videosData}))
                setTotalPages(response.data.totalPages)
            }
        })
        .catch((error) => toast.error(error))
    }

    const fetchDashboardData = () => {
        dashboardService.channelStats()
        .then((response) => {
            setDasboardData({
                totalChannelsViews: response.data.totalChannelsViews,
                totalSubscribersCount: response.data.totalSubscribersCount,
                totalVideoCount: response.data.totalVideoCount
            })
        })
        .catch((error) => toast.error(error))
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        fetchVideos()
        fetchDashboardData()
    }, [page, searchText, sortBy, videoRef])

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
        setSearchText(search);
        }, DEBOUNCE_DELAY);
        return () => clearTimeout(debounceTimer);
    }, [search])

    return (
        <div className='dark:text-white my-4'>
            <Container className="flex flex-col justify-center items-center dark:bg-backgroundDark">
                <div className='w-full m-2 gap-3 flex justify-between items-center'>
                    <Button 
                    onClick={() => setIsSlected(true)}
                    className={`w-full rounded-lg ${isSelected ? "border-2" : "border-none"}`}
                    >
                        Dashboard
                    </Button>
                    <Button 
                    onClick={() => setIsSlected(false)}
                    className={`w-full rounded-lg ${!isSelected ? "border-2" : "border-none"}`}
                    >
                        All Videos
                    </Button>
                </div>
                {
                isSelected && 
                <div className='w-full m-2 grid grid-cols-2 gap-3 sm:grid-cols-3'>
                    <div className='h-40 flex flex-col justify-center items-center rounded-xl bg-neutral-800'>
                        <span className='text-2xl font-bold'>{formatViewCount(dashboardData.totalChannelsViews)}</span>
                        <p className='text-base'>views</p>
                    </div>
                    <div className='h-40 flex flex-col justify-center items-center rounded-xl bg-neutral-800'>
                        <span className='text-2xl font-bold'>{dashboardData.totalSubscribersCount}</span>
                        <p className='text-base'>subscribers</p>
                    </div>
                    <div className='h-40 flex flex-col justify-center items-center rounded-xl bg-neutral-800'>
                        <span className='text-2xl font-bold'>{dashboardData.totalVideoCount}</span>
                        <p className='text-base'>videos</p>
                    </div>
                </div>
                }
                {!isSelected &&
                <>
                    <div className='w-full py-3 flex justify-between items-center'>
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
                    <div className={`${isFilterOpen ? "block" : "hidden"} w-full pt-4 px-4`}>
                        <Select 
                        className="max-w-40"
                        options={["None", "Ascending", "Descending"]} 
                        label="Duration :"
                        onChange={handleSelectChange}
                        />
                    </div>
                    {
                    videoDataStore.length > 0 ?
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 justify-center items-center'>
                        {videoDataStore.map((video) => (
                        <div 
                        key={video._id} 
                        className='relative flex justify-center items-center'
                        >
                            <div className="absolute z-10 top-0 p-6 w-full flex justify-between items-center">
                                <Button 
                                onClick={() => navigate(`/edit-video/${video._id}`)}
                                className="rounded-xl"
                                >
                                    Edit
                                </Button>
                                <Button 
                                onClick={() => {
                                    setShowModal(true)
                                    setVideoId(video._id)
                                }}
                                className="rounded-xl text-red-500 border-red-500 dark:text-red-500 dark:border-red-500 hover:dark:border-red-500"
                                >
                                    Delete
                                </Button>
                            </div>
                            <VideoCard 
                            loading={false}
                            videoId={video._id}
                            ownerId={video.owner._id}
                            thumbnailUrl={video.thumbnail}
                            title={video.title}
                            username={video.owner.username}
                            viewCount={video.views}
                            createdAt={video.createdAt}
                            duration={video.duration}
                            isOwner={true}
                            />
                        </div>
                        ))}
                    </div>
                    :
                    <div className='w-full min-h-[30vh] flex justify-center items-center text-2xl font-bold mx-3 my-3'>
                        No Video Uploaded!
                    </div>
                    }
                    <div className="py-5">
                        <Pagination totalPages={totalPages} onPageChange={(page) => setPage(page)}/>
                    </div>
                </>}
                <ConfirmModel
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setVideoId("")
                }}
                onDelete={handleDelete}
                />
            </Container>
        </div>
    )
}

export default Dashboard