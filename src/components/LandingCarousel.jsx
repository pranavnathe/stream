import { useMemo, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useWindowSize } from "react-use";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./";

export const LandingCarousel = ({
    VideoData, 
    Loading=true
}) => {

    const navigate = useNavigate()
    const { width, height } = useWindowSize()
    const carouselWrapperRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: carouselWrapperRef,
        offset: ["start start", "end start"],
    })

    const maximumScale = useMemo(() => {
        const windowYRatio = height / width;
        const xScale = 1.66667;
        const yScale = xScale * (16 / 9) * windowYRatio;
        return Math.max(xScale, yScale);
    }, [width, height])

    const scale = useTransform(
        scrollYProgress, 
        [0.3, 0.5, 0.66], 
        [maximumScale * 1.1 , maximumScale, 1]
    )

    const posterOpacity = useTransform(scrollYProgress, [0.64, 0.66], [0, 0.6])
    const posterTranslateXLeft = useTransform(scrollYProgress, [0.64, 0.66], [-20, 0])
    const posterTranslateXRight = useTransform(scrollYProgress, [0.64, 0.66], [20, 0])

    const [carouselVariant, setCarouselVariant] = useState("inactive")
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (progress >= 0.67) {
            setCarouselVariant("active")
        } else {
            setCarouselVariant("inactive")
        }
    })

    const largeVideoSet = VideoData
    const VideoSetData = [...VideoData]
    const randomVideoSet1 = VideoSetData
    .sort(() => Math.random() - 0.5)
    .concat(VideoSetData.sort(() => Math.random() - 0.5))
    .concat(VideoSetData.sort(() => Math.random() - 0.5));

    const randomVideoSet2 = VideoSetData
    .sort(() => Math.random() - 0.5)
    .concat(VideoSetData.sort(() => Math.random() - 0.5))
    .concat(VideoSetData.sort(() => Math.random() - 0.5))
    .sort(() => Math.random() - 0.5);

    return (
        <motion.div animate={carouselVariant} className="dark:text-white pb-8">
            <div ref={carouselWrapperRef} className="mt-[-100vh] h-[300vh] overflow-clip">
                <div className="h-screen sticky top-0 flex items-center">
                    <div className="relative flex gap-5 mb-5 left-1/2 -translate-x-1/2">
                        <motion.div
                        style={{ opacity: posterOpacity, x: posterTranslateXLeft }} 
                        className="aspect-[9/16] md:aspect-video shrink-0 w-[300px] md:w-[60vw]">
                            {
                            !Loading ?
                            <img 
                            className="w-full h-full object-cover rounded-2xl" 
                            src={largeVideoSet[0]?.thumbnail} 
                            alt={largeVideoSet[0]?.title} 
                            />
                            :
                            <div className="w-full h-full animate-shimmer border-2 rounded-2xl bg-neutral-400 dark:bg-neutral-950"></div>
                            }
                        </motion.div>
                        <motion.div 
                        style={{ scale }}
                        className="aspect-[9/16] relative md:aspect-video shrink-0 w-[300px] md:w-[60vw]">
                            <video 
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover rounded-2xl" 
                            src="Videos/tiger.mp4"
                            alt="tiger landing page video"
                            />
                            <motion.div 
                            variants={{
                                active: {opacity: 1},
                                inactive: {opacity: 0}
                            }}
                            className="absolute flex justify-center items-center left-0 bottom-0 w-full p-5">
                                <Button onClick={() => navigate("/home")} size="large">Watch Now!</Button>
                            </motion.div>
                        </motion.div>
                        <motion.div 
                        style={{ opacity: posterOpacity, x: posterTranslateXRight }}
                        className="aspect-[9/16] md:aspect-video shrink-0 w-[300px] md:w-[60vw]">
                            {
                            !Loading ?
                            <img 
                            className="w-full h-full object-cover rounded-2xl" 
                            src={largeVideoSet[2]?.thumbnail} 
                            alt={largeVideoSet[2]?.title} 
                            />
                            :
                            <div className="w-full h-full animate-shimmer border-2 rounded-2xl bg-neutral-400 dark:bg-neutral-950"></div>
                            }
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div 
            variants={{
                active: { opacity: 1, y: 0},
                inactive: { opacity: 0, y: 20},
            }}
            transition={{ duration: 0.4 }}
            className="-mt-[calc((100vh-(300px*(16/9)))/2)] md:-mt-[calc((100vh-(60vw*(9/16)))/2)] pt-5 space-y-3">
                <SmallVideoCarousel videoSet={randomVideoSet1} loading={Loading}/>
                <div className="[--carousel-offset:-32px] [--duration:85s]">
                    <SmallVideoCarousel videoSet={randomVideoSet2} loading={Loading}/>
                </div>
            </motion.div>
        </motion.div>
    )
}

const SmallVideoCarousel = ({videoSet, loading}) => {
    return (
        <div className="overflow-clip">
            <div className="flex gap-3 animate-carousel-move relative left-[var(--carousel-offset, 0px)]">
                {
                loading 
                ?
                <>
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="relative aspect-video w-[60vw] md:w-[23vw] shrink-0" >  
                            <div className="w-full h-full animate-shimmer border rounded-2xl opacity-40 bg-neutral-400 dark:bg-neutral-950"></div>
                        </div>
                    ))}
                </>
                :
                <>
                    {videoSet.map((video) => (
                        <div 
                        className="relative aspect-video w-[60vw] md:w-[23vw] shrink-0" 
                        key={video._id}>
                            <img className="w-full h-full object-cover rounded-xl" src={video.thumbnail} alt={video.title} />
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-neutral-950 hover:bg-opacity-50 rounded-xl">
                                <Link 
                                to={`/watch/${video._id}`}
                                className="cursor-pointer">
                                    <Button>Watch</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
                }
            </div>
        </div>
    )
}