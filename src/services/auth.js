import axios from 'axios';
import conf from '../conf/conf';
import { parseErrorMessage } from '../conf/parseErrorMessage';

const API_BASE_URL = `${conf.apiUrl}/users`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class AuthService {
    async register(formData) {
        try {
            const response = await instance.post(
                `${API_BASE_URL}/register`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response) {
                const email = formData.get("email");
                const password = formData.get("password");
                //call another method
                return this.login({email, password});
            } else {
                return response.data;
            }
        } catch (error) {
            throw parseErrorMessage(error.response.data);
        }
    }

    async login({email, password}) {
        try {
            const response = await instance.post(
                `${API_BASE_URL}/login`, 
                {email, password}
            )
            // console.log(response.data.data.user);
            return response.data;
        } catch (error) {
            throw parseErrorMessage(error.response.data);
        }
    }

    async getCurrentUser() {
        try {
            const response = await instance.get(
                `${API_BASE_URL}/current-user`
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
        return null;
    }

    async logout() {
        try {
            const response = await instance.post(
                `${API_BASE_URL}/logout`,
            )
            // console.log(response.data.message);
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async refreshToken() {
        try {
            const response = await instance.post(`${API_BASE_URL}/refresh-token`)
            return response.data;
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async resetPassword({oldPassword, newPassword}) {
        try {
            const response = await instance.post(
                `${API_BASE_URL}/change-password`, 
                {oldPassword, newPassword}
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async checkUsername({ username }) {
        try {
            const response = await instance.post(`/check-username`, {username})
            return response.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const authService = new AuthService();

export default authService