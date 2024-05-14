import React, { useEffect, useState } from 'react'
import {
    Hero,
    LandingCarousel,
    Usps,
} from '../components'
import videoService from '../services/video'
import { toast } from 'react-toastify'

function Landing() {

    const [videosData, setVideoData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        videoService.getAllVideos()
        .then((response) => {
            if (response) {
                setVideoData(response.data.videoData)
            }
        })
        .then(() => setLoading(false))
        .catch((error) => toast.error(error))
    }, [])

    return (
        <main>
            <div className='relative z-10 bg-white dark:bg-backgroundDark'>
                <Hero />
                <Usps />
            </div>
            <LandingCarousel 
            VideoData={videosData}
            Loading={loading}
            />
        </main>
    )
}

export default Landing