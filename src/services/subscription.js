import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/subscriptions`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export class SubscriptionService {
    async toggleSubscription (channelId) {
        try {
            const response = await instance.post(`/channel/${channelId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async userChannelSubs (channelId) {
        try {
            const response = await instance.get(`/channel/${channelId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async userSubscribedChannels (subscriberId) {
        try {
            const response = await instance.get(`/user/${subscriberId}`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const subscriptionService = new SubscriptionService()

export default subscriptionService