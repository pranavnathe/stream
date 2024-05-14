import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/videos`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export class VideoService {
    async getAllVideos(queryParams) {
        try {
            const response = await instance.get(`${API_BASE_URL}/`, { params: queryParams })
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async getVideoById(videoId) {
        try {
            const response = await instance.get(`${API_BASE_URL}/watch/${videoId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateVideoViewCount(videoId) {
        try {
            const response = await instance.patch(`${API_BASE_URL}/watch/${videoId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async uploadVideo(formData) {
        try {
            const response = await instance.post(
                `${API_BASE_URL}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateVideo({formData, videoId}) {
        try {
            const response = await instance.patch(
                `${API_BASE_URL}/${videoId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async deleteVideo (videoId) {
        try {
            const response = await instance.delete(`${API_BASE_URL}/${videoId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async togglePublishStatus (videoId) {
        try {
            const response = await instance.patch(
                `${API_BASE_URL}/toggle/publish/${videoId}`
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const videoService = new VideoService();

export default videoService