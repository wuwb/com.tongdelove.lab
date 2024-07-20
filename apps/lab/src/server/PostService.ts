import axios from '@/utils/axios'

export const post = async (slug) => {
  try {
    const response = await axios.get(`/post/${slug}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
