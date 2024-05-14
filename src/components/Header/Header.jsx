import { useEffect, useState } from "react"
import { Button, Container, Logo } from "../index.js"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LogoutButton from "./LogoutButton.jsx"
import ChannelIcon from '../../assets/profile.svg'
import UploadIcon from '../../assets/upload.svg'
import ArrowLeftIcon from '../../assets/arrow-left-short.svg'
import LightModeIcon from '../../assets/theme-icon/light-mode.svg'
import DarkModeIcon from '../../assets/theme-icon/dark-mode.svg'
import { updateThemeMode } from "../../slices/themeSlice.js"

export const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const themeMode = useSelector((state) => state.theme.themeMode)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const navItems = [
        {
            name: "Home",
            path: "/home",
            active: true
        },
        {
            name: "Subscriptions",
            path: "/subscription",
            active: authStatus
        },
        {
            name: "Playlsits",
            path: "/playlist",
            active: authStatus
        },
        {
            name: "History",
            path: "/history",
            active: authStatus
        },
        {
            name: "Liked videos",
            path: "/likedvids",
            active: authStatus
        }
    ]

    const subNavItems = [
        {
            name: "Login",
            path: "/login",
            active: !authStatus
        },
        {
            name: "Register",
            path: "/register",
            active: !authStatus
        }
    ]

    const toggleTheme = () => {
        const htmlElement = document.querySelector('html');
        const currentTheme = localStorage.getItem("themeMode");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        // Update local storage with the new theme
        localStorage.setItem("themeMode", newTheme);
        dispatch(updateThemeMode({theme : localStorage.getItem("themeMode")}))
        // Remove both theme classes first
        htmlElement.classList.remove('dark', 'light');

        // Add the new theme class
        htmlElement.classList.add(newTheme);
    }

    useEffect(() => {
        const htmlElement = document.querySelector('html');

        // remove theme class from HTML element
        htmlElement.classList.remove('dark', 'light'); // Remove both classes first

        // Initialize theme mode from local storage
        const savedTheme = localStorage.getItem("themeMode");
        if (savedTheme) {
            dispatch(updateThemeMode({theme : localStorage.getItem("themeMode")}))
            htmlElement.classList.add(savedTheme); // Add the stored theme class
        } else {
            // Set a default theme (if no theme is stored)
            htmlElement.classList.add("dark"); // default theme variable (e.g., 'dark')
            localStorage.setItem("themeMode", "dark"); // Store the default theme
        }
    }, [])

    return (
        <>
            {authStatus && 
            <header
            className="hidden md:block fixed bottom-0 left-0 w-screen h-12 z-50 bg-white text-textBlack dark:bg-backgroundContrast dark:text-white border-t border-grey1"
            >
                <Container className="flex items-center min-h-[--header-row-height]">
                    <nav className="w-full">
                        <ul className="flex mx-auto gap-2 justify-around items-center">
                            {navItems.map((item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <NavLink
                                        to={item.path}
                                        >
                                            {({ isActive }) => (
                                                <Button
                                                size="small"
                                                isActive={isActive}
                                                >
                                                {item.name}
                                                </Button>
                                            )}
                                        </NavLink>
                                    </li>
                                ) : null
                            ))}
                            {authStatus && (
                                <li className="hidden md:block">
                                    <LogoutButton/>
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>}
            <div className="sticky top-0 z-50 bg-white text-textBlack dark:bg-backgroundContrast dark:text-white" >
                <Container className="flex justify-between items-center min-h-[--header-row-height]">
                    <div className="flex justify-start items-center">
                        {location.pathname !== '/' && 
                        <Button
                        onClick={() => navigate(-1)}
                        className="md:hidden p-1 mr-4 border-none"
                        >
                            <img className="dark:invert size-7" src={ArrowLeftIcon} alt="previous button"/>
                        </Button>}
                        <Link href="/" className="h-[--header-row-height] flex items-center px-6 -ml-6 text-xl">
                            <Logo /> 
                            <span className="sr-only">Back to homepage</span>
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex mx-auto gap-2 justify-between items-center">
                            {subNavItems.map((item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <Button
                                        className="rounded-lg"
                                        size="small"
                                        onClick={() => navigate(item.path)}
                                        >
                                            {item.name}
                                        </Button>
                                    </li>
                                ) : null
                            ))}
                            <Button 
                            onClick={toggleTheme}
                            className="p-1 border-none"
                            >
                                {
                                themeMode === "dark" ?
                                <img className="dark:invert size-4" src={DarkModeIcon} alt="dark mode icon"/>
                                :
                                <img className="dark:invert size-5" src={LightModeIcon} alt="light mode icon"/>
                                }
                            </Button>
                            {
                            authStatus && 
                            <>
                            <Link to={"/upload-video"} className="mx-4 hidden md:block">
                                <img className="dark:invert h-6 w-6" src={UploadIcon} alt="upload icon" />
                            </Link>
                            <Link to={`/channel/${userData?.username}`}>
                                {
                                userData?.avatar ?
                                <img src={userData.avatar} alt="profileimage" className="rounded-full object-cover h-8 w-8 hidden md:block" />
                                :
                                <img src={ChannelIcon} alt="profileimage" className="dark:invert h-6 w-6 hidden md:block" />
                                }
                            </Link>
                            </>
                            }
                        </ul>
                    </nav>
                </Container>
            </div>
        </>
    )
}