import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/likes`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export class LikeService {
    async getAllLikedVideos (queryParams) {
        try {
            const response = await instance.get(`/videos/`, { params: queryParams })
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async isLikedVideo (videoId) {
        try {
            const response = await instance.get(`/video/${videoId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async toggleVideoLike (videoId) {
        try {
            const response = await instance.post(`/toggle/vid/${videoId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async toggleCommentLike (commentId) {
        try {
            const response = await instance.post(`/toggle/com/${commentId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async toggleTweetLike (tweetId) {
        try {
            const response = await instance.post(`/toggle/tweet/${tweetId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const likeService = new LikeService()

export default likeService