import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const Gradient = ({ children, className }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const updateMousePositionRef = useRef();

    useEffect(() => {
        const updateMousePosition = (event) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };

        updateMousePositionRef.current = updateMousePosition;

        window.addEventListener("mousemove", updateMousePositionRef.current);

        return () => {
            window.removeEventListener("mousemove", updateMousePositionRef.current);
        };
    }, []);

    const helloStyle = {
        backgroundImage: `
            radial-gradient(circle farthest-side at ${mousePosition.x}px ${mousePosition.y}px, 
            #1250aa 0%, 
            transparent 100%
        )`,
    };

    return (
        <div className={twMerge("h-[100svh] w-screen flex justify-center items-center text-textBlack dark:text-white", className)} style={helloStyle}>
            <video 
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-2xl opacity-20" 
            src="Videos/stars.mp4"
            alt="landing page background video"
            />
            <p className="text-5xl">{children}</p>
        </div>
    );
};
