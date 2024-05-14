import axios from "axios";
import conf from "../conf/conf";

const API_BASE_URL = `${conf.apiUrl}/healthcheck`

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class HealthcheckService {

    async getHealthCheckStatus () {
        try {
            const response = await instance.get("/")
            return response
        } catch (error) {
            throw error
        }
    }
}

const healthcheckService = new HealthcheckService()

export default healthcheckService