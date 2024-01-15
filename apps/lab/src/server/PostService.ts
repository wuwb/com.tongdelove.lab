import axios from '@/utils/axios'

class PostService {
  static async post(slug) {
    try {
      const response = await axios.get(`/post/${slug}`)
      return response.data
    } catch (err) {}
  }

  posts() {}
}

export default PostService
