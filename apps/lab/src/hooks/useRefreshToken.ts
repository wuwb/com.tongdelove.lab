import { useAuth } from '../contexts/auth'
import axios from '@/utils/axios'

export const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    })
    setAuth((prev) => {
      console.log(prev)
      console.log(response.data.accessToken)
      return {
        ...prev,
        token: response.data.accessToken,
      }
    })
    return response.data.accessToken
  }

  return refresh
}
