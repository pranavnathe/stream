import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button, VideoCard } from './';
import LeftArrowIcon from "../assets/arrow-left-short.svg"
import RightArrowIcon from "../assets/arrow-right-short.svg"
import { useNavigate } from 'react-router-dom';

export const VideoCarousel = ({ data, Label, errorMessage, navigateUrl, type="video" }) => {
    
    const navigate = useNavigate()
    const [sliderPostion, setSliderPostion] = useState(0)
    const skipCount = 1
    const sliderCardWidth = 320 // from VideoCard :: max-w-80
    const sliderRef = useRef(null)

    const scrollToSlide = (slider, slideIndex) => {
        if (!slider) return;
        slider.scrollTo({
            left: slideIndex * sliderCardWidth,
            behavior: "smooth",
        })
    }

    const currentSlide = useMemo(() => {
        return Math.floor(sliderPostion / (sliderCardWidth))
    }, [sliderPostion])
    // console.log(currentSlide);

    const scrollToEndOfSlider = useMemo(() => {
        if (!sliderRef.current) return false;
        return (
            sliderRef.current.scrollWidth -
            sliderRef.current.scrollLeft -
            sliderRef.current.clientWidth ===
            0
        )
    }, [sliderPostion])

    const goToNextSlide = useCallback(() => {
        scrollToSlide(sliderRef.current, currentSlide + skipCount)
    }, [currentSlide])

    const goToPreviousSlide = useCallback(() => {
        scrollToSlide(sliderRef.current, currentSlide - skipCount)
    }, [currentSlide])

    const handelViewAllButton = () => {
        navigate(`${navigateUrl}`)
    }

    return (
        <>
            <div className='mx-4 mt-4 flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>{Label}</h2>
                {data && data.length > 0 && <Button onClick={handelViewAllButton} size='small'>View all</Button>}
            </div>
            { data && data.length > 0 ?
            <div className='mx-auto relative h-[360px] overflow-hidden flex justify-center items-start'>
                <Button
                disabled={currentSlide === 0}
                onClick={() => goToPreviousSlide()}
                className="disabled:opacity-30 z-10 p-1 absolute left-0 top-[27%] md:left-2"
                >
                    {<img src={LeftArrowIcon} className='dark:invert size-8' alt='Left Arrow Button'/>}
                </Button>
                <Button
                disabled={scrollToEndOfSlider || currentSlide === data.length}
                onClick={() => goToNextSlide()}
                className="disabled:opacity-30 z-10 p-1 absolute right-0 top-[27%] md:right-2"
                >
                    {<img src={RightArrowIcon} className='dark:invert size-8' alt='Left Arrow Button'/>}
                </Button>
                <ul 
                ref={sliderRef}
                onScroll={e => {
                    setSliderPostion(e.currentTarget.scrollLeft)
                }}
                className='flex max-w-xs sm:max-w-[575px] md:max-w-[700px] lg:max-w-[950px] h-[390px] overflow-x-auto snap-x snap-mandatory'
                >
                    {data.map((video) => (
                        <li
                            key={video._id}
                            className='shrink-0 last:mr-0 snap-start snap-always'
                        >
                            { type === "video" ?
                            <VideoCard
                                loading={false}
                                videoId={video._id}
                                thumbnailUrl={video.thumbnail}
                                title={video.title}
                                avatarUrl={video.owner.avatar}
                                username={video.owner.username}
                                viewCount={video.views}
                                createdAt={video.createdAt}
                                duration={video.duration}
                            />
                            :
                            <VideoCard
                                loading={false}
                                videoId={video.video._id}
                                thumbnailUrl={video.video.thumbnail}
                                title={video.video.title}
                                avatarUrl={video.video.owner.avatar}
                                username={video.video.owner.username}
                                viewCount={video.video.views}
                                createdAt={video.video.createdAt}
                                duration={video.video.duration}
                            />
                            }
                        </li>
                    ))}
                </ul>
            </div>
            :
            <div className='w-full min-h-20 flex justify-center items-center text-2xl font-bold mx-3 my-3'>
                {errorMessage ? errorMessage : "no data to show!"}
            </div>
            }
        </>
    );
};