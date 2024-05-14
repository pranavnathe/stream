import { useRef } from "react";
import { Button, Container, Gradient } from "../index.js";
import { useScroll, useTransform, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {

    const videoContainerRef = useRef(null)
    const navigate = useNavigate()
    
    const { scrollYProgress } = useScroll({
        target: videoContainerRef,
        offset: ["start start", "end end"]
    })
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
    
    return (
        <div className="relative text-textBlack dark:text-white">
            <motion.div 
                style={{opacity}}
                ref={videoContainerRef}
                className="absolute -top-[--header-row-height] left-0 w-full h-[200vh]"
            >
                <Gradient className="sticky top-0" />
            </motion.div>
            <Container className="relative z-10 pb-8 h-[--hero-height]">
                <motion.div 
                    className="flex h-full flex-col justify-end items-start"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    whileInView="visible"
                    exit="hidden"
                    animate="hidden"
                    viewport={{ amount: 0.98 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-10">
                        Step into Stream+ <br />
                        Videos Unleashed!
                    </h1>
                    <Button 
                    onClick={() => navigate("/home")}
                    className="mb-16" 
                    size="large">
                        Watch Now!
                    </Button>
                    <p className="font-semibold">Social Video Streaming Platform.</p>
                </motion.div>
            </Container>
        </div>
    );
}
