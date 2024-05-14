import { Container } from "../"
import { Link } from "react-router-dom"
import socialLinks from "../../conf/socialLinks"
import Linkedin from '../../assets/social-icon/linkedin.svg'
import Fiverr from '../../assets/social-icon/fiverr.svg'
import Youtube from '../../assets/social-icon/youtube.svg'
import Instagram from '../../assets/social-icon/instagram.svg'
import GitHub from '../../assets/social-icon/github.svg'

const pages = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Contact us",
        path: "#",
    },
    {
        name: "About us",
        path: "#",
    },
    {
        name: "Terms and conditions",
        path: "#",
    },
    {
        name: "Policies",
        path: "#",
    },
    {
        name: "FAQs",
        path: "#",
    }
]

export const Footer = () => {
    return (
        <div className="w-full border-t border-grey1 bg-white text-textBlack dark:bg-backgroundDark dark:text-white">
            <Container className="grid gap-3 md:gap-6 md:grid-cols-3 mb-12 md:mb-[--header-row-height]">
                <div className="p-2 w-full">
                    <h2 className="text-xl font-bold">Stream+</h2>
                    <p className="pt-3">Experience the world in motion: Your window to endless entertainment </p>
                    <p className="font-semibold pt-3">Follow me on:</p>
                    <div className="flex  justify-start items-center gap-4">
                        <Link to={socialLinks.github}>
                            <img src={GitHub} alt="github icon" className="size-7 dark:invert" />
                        </Link>
                        <Link to={socialLinks.linkedin}>
                            <img src={Linkedin} alt="linkedin icon" className="size-8" />
                        </Link>
                        <Link to={socialLinks.youtube}>
                            <img src={Youtube} alt="youtube icon" className="size-8" />
                        </Link>
                        <Link to={socialLinks.instagram}>
                            <img src={Instagram} alt="instagram icon" className="size-8" />
                        </Link>
                        <Link to={socialLinks.fiverr}>
                            <img src={Fiverr} alt="fiverr icon" className="size-7" />
                        </Link>
                    </div>
                    <p className="font-semibold pt-3">Mail me:</p>
                    <span className="cursor-pointer hover:text-blue-600">
                        <a href="mailto:askpranavnathe@gmail.com">askpranavnathe@gmail.com</a>
                    </span>
                </div>
                <div className="p-2 w-full">
                    <h2 className="text-xl font-bold">About us</h2>
                    <p className="pt-3">
                        Immerse yourself in limitless content with Stream+. Explore, discover, upload and indulge in a world of videos tailored just for you. Unleash your curiosity and embark on a journey of endless entertainment.
                    </p>
                </div>
                <div className="p-2 w-full">
                    <h2 className="text-xl font-bold">Ouick Links</h2>
                    <ul className="pt-3">
                        {pages.map((page) => (
                            <li key={page.path} className="pb-1 cursor-pointer hover:text-xl hover:pl-1 ease-in-out duration-100">
                                <Link to={page.path}>{page.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>
    )
}