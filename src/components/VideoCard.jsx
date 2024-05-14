import { useNavigate } from "react-router-dom";
import { formatDuration } from "../conf/formatDuration";
import { timeAgo } from "../conf/timestampsConverter";

export const VideoCard = ({
    loading = true,
    videoId,
    ownerId,
    thumbnailUrl,
    title,
    avatarUrl,
    username,
    viewCount,
    createdAt,
    duration,
    likedOnDate,
}) => {
    const navigate = useNavigate()

    const thumbnailClickHandeler = () => {
        const encodedVideoId = encodeURIComponent(videoId);
        navigate(`/watch/${encodedVideoId}`)
    }

    const avatarClickHandeler = () => {
        const encodedUsername = encodeURIComponent(username);
        navigate(`/channel/${encodedUsername}`)
    }

    return (
        <div className="w-full max-w-80 p-4 min-h-[325px]">
            <div className="relative h-48 bg-backgroundDark flex justify-center items-center overflow-hidden rounded-xl cursor-pointer">
                {
                loading ? 
                    <div className="w-full h-full animate-shimmer"></div>
                    :
                    <img 
                    onClick={thumbnailClickHandeler}
                    src={thumbnailUrl} 
                    className="w-full h-full object-cover"
                    /> 
                }
                <span className="bg-grey1 rounded-md text-sm m-1 px-2 py-1 absolute bottom-0 right-0">{formatDuration(duration)}</span>
            </div>
            <div className="pt-2">
                {
                loading ? 
                    <div className="w-full h-8 bg-grey1 rounded-full animate-pulse"></div>
                    :
                    <p className="text-lg max-h-12 font-bold overflow-hidden">{title}</p> 
                }
                <div className="pt-2 flex gap-3">
                    {
                    loading ? 
                        <>
                        <div className="w-9 h-9 rounded-full animate-shimmer"></div>
                        <div className="pt-2 h-8 w-3/4 bg-grey1 rounded-full animate-pulse"></div>
                        </>
                        :
                        <>
                            {avatarUrl &&
                            <>
                                <img 
                                onClick={avatarClickHandeler}
                                src={avatarUrl} 
                                alt="avatar" 
                                className="h-9 w-9 rounded-full cursor-pointer"
                                />
                                <p className="pt-2 h-9 w-3/4 overflow-hidden">{username}</p>
                            </>
                            }
                        </>
                    }
                </div>
                {
                loading ? 
                    <div className="mt-2 w-3/4 h-6 bg-grey1 rounded-full animate-pulse"></div>
                    :
                    <p className="pt-3">
                        {viewCount} views 
                        {createdAt && ` 🔹 ${timeAgo(createdAt)}`}
                        {likedOnDate && ` 🔹 liked ${timeAgo(likedOnDate)}`}
                    </p>
                }
            </div>
        </div>
    )
}