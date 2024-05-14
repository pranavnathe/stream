import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner, UpdateAccountForm, UploaderModel, VideoCard, VideoCarousel } from '../components'
import userService from '../services/user'
import likeService from '../services/like'
import subscriptionService from '../services/subscription'
import { subcribeButtonConfetti } from '../conf/confetti'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Channel() {
    const { username } = useParams()
    const userData = useSelector((state) => state.auth.userData)
    const decodedString = decodeURIComponent(username)
    const [channelData, setChannelData] = useState(null)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [loading, setLoading] = useState(true)
    const [owner, setOwner] = useState(false)
    const [watchHistoryVideos, setWatchHistoryVideos] = useState([])
    const [likedVideos, setLikedVideos] = useState([])

    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showUploaderModal, setShowUploaderModal] = useState(false)
    const [showCoverUploaderModal, setShowCoverUploaderModal] = useState(false)
    const navigate = useNavigate()

    const fetchWatchHistory = () => {
        userService.getWatchHistory()
        .then((response) => {
            if (response) {
            setWatchHistoryVideos(response.data);
            }
        })
        .catch((error) => toast.error(error))
    };

    const fetchLikedVideos = () => {
        likeService.getAllLikedVideos()
        .then((response) => {
            if (response) {
            setLikedVideos(response.data.likedVideos);
            }
        })
        .catch((error) => toast.error(error))
    };
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        userService.getChannelDetails(decodedString)
        .then((response) => {
            setChannelData(response.data)
            setIsSubscribed(response.data.isSubscribed)
            if (response.data._id === userData._id) {
                setOwner(true)
            } else {
                setOwner(false)
            }
        })
        .then(() => {
            fetchWatchHistory()
            fetchLikedVideos()
        })
        .catch((error) => {
            console.log(error)
            setOwner(false)
        })
        .finally(() => setLoading(false))
    }, [isSubscribed, username])

    const subscribeButtonHandeler = () => {
        subscriptionService.toggleSubscription(channelData._id)
        .then((response) => {
            if (response) {
                setIsSubscribed(response.data.isSubsribed)
                if (response.data.isSubsribed) {
                subcribeButtonConfetti()
                }
            }
        })
    }

    const coverImageButtonHandeler = ({selectedFile}) => {

        // Create a new FormData instance
        const formData = new FormData();
        // Append the selected file to the FormData object
        formData.append('coverImage', selectedFile);

        const toastId = toast.loading("updating..." , {className:"border-2"})
        userService.updateCoverImage(formData)
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => {
            setTimeout(() => {
                window.location.reload() // Reload the page
            }, 2000);
        })
    }

    const avatarButtonHandeler = ({selectedFile}) => {

        // Create a new FormData instance
        const formData = new FormData();
        // Append the selected file to the FormData object
        formData.append('avatar', selectedFile);

        // console.log(selectedFile);
        const toastId = toast.loading("updating..." , {className:"border-2"})
        userService.updateAvatar(formData)
        .then((response) => {
            if (response) {
                toast.update(toastId, { render: `${response.message}`, type: "success", isLoading: false, autoClose: 2000 })
            }
        })
        .catch((error) => toast.update(toastId, { render: error, type: "error", isLoading: false, autoClose: 2000 }))
        .finally(() => {
            setShowUploaderModal(false)
            setTimeout(() => {
                window.location.reload() // Reload the page
            }, 2000);
        })
    }

    return (
        <div className='w-full py-4 flex flex-col justify-center dark:text-white dark:bg-backgroundDark'>
            {
            !loading ?
            <Container className="relative">
                {
                channelData.coverImage.trim() !== "" 
                ?
                    <div className='relative w-full max-h-40 sm:max-h-52 flex flex-col justify-center items-center overflow-hidden rounded-xl'>
                        {
                        owner && 
                        <Button 
                        onClick={() => setShowCoverUploaderModal(true)}
                        className="absolute right-2 top-2 sm:right-4 sm:top-3 bg-opacity-80 dark:bg-opacity-60">Edit cover image</Button>
                        }
                        <img src={channelData.coverImage} alt="channel coverimage" className='min-w-full object-cover'/>
                    </div>
                    :
                    <div className='relative min-w-96 min-h-40 sm:min-h-52 flex flex-col justify-center items-center overflow-hidden rounded-xl bg-gray-900'>
                        {
                        owner && 
                        <Button 
                        onClick={() => setShowCoverUploaderModal(true)}
                        className="absolute right-2 top-2 sm:right-4 sm:top-3">Upload cover image</Button>
                        }
                    </div>
                }
                {
                channelData.avatar.trim() !== "" ?
                    <div className='relative -top-20'>
                        <div className='absolute w-full top-3 max-h-40 sm:max-h-52 flex flex-col justify-center items-center rounded-xl'>
                            <img src={channelData.avatar} alt="user avatar" className='h-40 w-40 sm:top-40 sm:h-60 sm:w-60 rounded-full object-cover shadow-2xl border-2 border-white'/>
                            {
                                owner && 
                                <Button 
                                onClick={() => setShowUploaderModal(true)}
                                className="absolute z-10 bottom-4 sm:bottom-2 font-bold rounded-xl bg-opacity-80 dark:bg-opacity-60">
                                    Edit
                                </Button>
                            }
                        </div>
                    </div>
                    :
                    <span className='w-full justify-center flex'>
                    <div className='absolute h-40 w-40 top-20 sm:top-40 sm:h-60 sm:w-60 rounded-full shadow-2xl border-2 border-white bg-grey1 animate-shimmer'></div>
                    </span>
                }
                <div className='flex flex-col w-full mt-28 sm:mt-44 items-center'>
                    <h2 className='p-1 font-semibold text-lg sm:font-bold sm:text-xl'>{channelData.fullName}</h2>
                    <p className='p-1 text-sm dark:text-slate-300'>@{channelData.username}</p>
                    <div className='w-full flex justify-between items-center py-2'>
                        {
                        owner 
                        ?
                        <Button
                        onClick={() => setShowEditProfileModal(true)} 
                        className="hover:bg-gray-200 font-medium">
                            Edit Profile
                        </Button>
                        :
                        <div onClick={subscribeButtonHandeler}>
                            {
                            channelData.isSubscribed ?
                            <Button className='hover:text-red1 hover:border-red1 hover:dark:border-red1 hover:dark:text-red1'>Subscribed</Button>
                            :
                            <Button className='hover:bg-grey1 hover:text-white dark:bg-white dark:text-textBlack hover:dark:bg-white hover:dark:opacity-90 hover:dark:text-red1'>Subscribe</Button>
                            }
                        </div>
                        }
                        <p className='p-2'>{channelData.subscribersCount} subscriber</p>
                    </div>
                </div>
                {owner &&
                <>
                    <div className='flex justify-between items-center w-full gap-3'>
                        <Button 
                        onClick={() => navigate("/dashboard")}
                        className="my-3 w-full rounded-xl"
                        >
                            Go to Dashboard
                        </Button>
                        <Button 
                        onClick={() => navigate("/upload-video")}
                        className="my-3 w-full rounded-xl"
                        >
                            Upload Video
                        </Button>
                    </div>
                    <VideoCarousel
                    Label={"History"}
                    data={watchHistoryVideos.slice(0, 10)}
                    errorMessage="No Watch History!"
                    navigateUrl="/history"
                    />
                    <VideoCarousel
                    Label={"Liked Videos"}
                    data={likedVideos}
                    errorMessage="No Liked Videos!"
                    navigateUrl="/likedvids"
                    type='like'
                    />
                </>
                }
                <UpdateAccountForm
                    isOpen={showEditProfileModal}
                    onClose={() => setShowEditProfileModal(false)}
                />
                <UploaderModel 
                    isOpen={showCoverUploaderModal}
                    onClose={() => setShowCoverUploaderModal(false)}
                    name="cover image"
                    onUpdate={coverImageButtonHandeler}
                    maxImageSize={1}
                />
                <UploaderModel 
                    isOpen={showUploaderModal}
                    onClose={() => setShowUploaderModal(false)}
                    name="avatar image"
                    onUpdate={avatarButtonHandeler}
                    maxImageSize={1}
                />
            </Container>
            :
            <Spinner fullScreen/>
            }
        </div>
    )
}

export default Channel