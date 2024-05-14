import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/dashboard`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class DashboardService {
    async channelStats () {
        try {
            const response = await instance.get(`/stats`)
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async allChannelVideos (queryParams) {
        try {
            const response = await instance.get(
                `/videos`,
                { params: queryParams}
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const dashboardService = new DashboardService()

export default dashboardService