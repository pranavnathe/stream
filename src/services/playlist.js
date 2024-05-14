import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/playlist`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class PlaylistService {
    async createPlaylist ({name, description}) {
        try {
            const response = await instance.post(
                `/`,
                {name, description}
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async deletePlaylist (playlistId) {
        try {
            const response = await instance.delete(`/${playlistId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updatePlaylist ({name, description, playlistId}) {
        try {
            const response = await instance.patch(
                `/${playlistId}`,
                {name, description}
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async addVideoToPlaylist ({playlistId, videoId}) {
        try {
            const response = await instance.patch(`/add/${videoId}/${playlistId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async removeFromPlaylist ({playlistId, videoId}) {
        try {
            const response = await instance.patch(`/remove/${videoId}/${playlistId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async getPlaylistbyPlaylistId (playlistId) {
        try {
            const response = await instance.get(`/${playlistId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async getPlaylistbyUserId (userId) {
        try {
            const response = await instance.get(`/user/${userId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const playlistService = new PlaylistService()

export default playlistService