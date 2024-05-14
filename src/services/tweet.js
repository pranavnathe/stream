import axios from "axios";
import conf from "../conf/conf";
import { parseErrorMessage } from "../conf/parseErrorMessage";

const API_BASE_URL = `${conf.apiUrl}/tweets`

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class TweetService {
    async createTweet (formData) {
        try {
            const response = await instance.post(
                `/`,
                formData
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async getUserTweets ({queryParams, userId}) {
        try {
            const response = await instance.get(
                `/user/${userId}`,
                { params: queryParams }
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateTweet ({formData, tweetId}) {
        try {
            const response = await instance.patch(
                `/${tweetId}`,
                formData
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async deleteTweet (tweetId) {
        try {
            const response = await instance.delete(`/${tweetId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const tweetService = new TweetService()

export default tweetService