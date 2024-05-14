import axios from "axios";
import conf from "../conf/conf";
import { parseErrorMessage } from "../conf/parseErrorMessage";

const API_BASE_URL = `${conf.apiUrl}/comments`

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export class CommentService {
    async getAllCommentOfVideo ({queryParams, videoId}) {
        try {
            const response = await instance.get(
                `/${videoId}/`,
                { params: queryParams}
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async addComment ({content, videoId}) {
        try {
            const response = await instance.post(
                `/${videoId}/`,
                content
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async updateComment ({content, commentId}) {
        try {
            const response = await instance.patch(
                `update/${commentId}`,
                content
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }

    async deleteComment (commentId) {
        try {
            const response = await instance.delete(
                `update/${commentId}`
            )
            return response.data
        } catch (error) {
            throw parseErrorMessage(error.response.data)
        }
    }
}

const commentService = new CommentService()

export default commentService