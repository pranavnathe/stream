import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from "../conf/parseErrorMessage"

const API_BASE_URL = `${conf.apiUrl}/users`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export class UserService {
    async updateAccount({fullName, email}) {
        try {
            const response = await instance.patch(
                `${API_BASE_URL}/update-account`,
                {fullName, email}
            );
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateAvatar(avatar) {
        try {
            const response = await instance.patch(
                `${API_BASE_URL}/update-avatar`,
                avatar,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateCoverImage(coverImage) {
        try {
            const response = await instance.patch(
                `${API_BASE_URL}/update-cover`,
                coverImage,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async getChannelDetails(username) {
        try {
            const response = await instance.get(`${API_BASE_URL}/channel/${username}`)
            return response.data
        } catch (error) {
            const errorMessage = parseErrorMessage(error.response.data);
            throw parseErrorMessage(error.response.data)
        }
    }

    async getWatchHistory() {
        try {
            const response = await instance.get(`${API_BASE_URL}/history`,
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async removeFromWatchHistory (videoId) {
        try {
            const response = await instance.patch(`/delete-history/${videoId}`)
            return response
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const userService = new UserService();

export default userService