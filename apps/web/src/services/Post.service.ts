import { instance as axiosInstance } from '../utils/axios'

export class PostService {
  static async post(slug) {
    try {
      const response = await axiosInstance.get(`/post/${slug}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  posts() {}
}
