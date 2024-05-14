import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import HomeIcon from '../../assets/home.svg';
import ActiveHomeIcon from '../../assets/home-active.svg';
import SubscriptionIcon from '../../assets/subscription.svg';
import ActiveSubscriptionIcon from '../../assets/subscription-active.svg';
import PlaylistIcon from '../../assets/playlist.svg';
import ActivePlaylistIcon from '../../assets/playlist-active.svg';

export const MobileNavBar = () => {

    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    const navItems = [
        {
            icon: HomeIcon,
            active: ActiveHomeIcon,
            path: "/home",
        },
        {
            icon: SubscriptionIcon,
            active: ActiveSubscriptionIcon,
            path: "/subscription",
        },
        {
            icon: PlaylistIcon,
            active: ActivePlaylistIcon,
            path: "/playlist",
        },
    ]

    return (
        <>
        {authStatus &&
        <div className="md:hidden fixed bottom-0 left-0 w-screen h-[--mobile-nav-height] z-50 bg-white dark:bg-backgroundDark border-t border-grey1 shadow-2xl">
                <nav className="flex justify-around items-center py-2 text-textBlack dark:text-white">
                    {navItems.map((item) => (
                        <NavLink 
                        key={item.path}
                        to={item.path}
                        className="cursor-pointer font-semibold p-0 m-0"
                        >
                            {({ isActive }) => 
                                isActive ?
                                <img src={item.active} className="dark:invert h-6 w-6"/>
                                :
                                <img src={item.icon} className="dark:invert h-6 w-6"/>
                            }
                        </NavLink>
                    ))}
                    {authStatus && <ul>
                        <Link to={`/channel/${userData?.username}`}>
                            <img src={userData?.avatar} alt="profileimage" className="rounded-full object-cover h-7 w-7" />
                        </Link>
                    </ul>}
                </nav>
            </div>
            }
        </>
    )
}