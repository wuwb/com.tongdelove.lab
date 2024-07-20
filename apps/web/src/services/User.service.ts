import { useLocalStorage } from 'react-use'
import Router from 'next/router'
import axiosInstance from '../utils/axios'

// const [accessToken, setAccessToken] = useLocalStorage('access_token');
// if (accessToken) {
//   config.headers.Authorization = `Bearer ${accessToken}`;
// }

class UserService {
  static get userValue() {
    return localStorage.getItem('user')
  }
  static async getUserById() {
    try {
      const response = await axiosInstance.get('/users/user')
      return response.data
    } catch (err) {
      throw err
    }
  }
  static async login(username, password) {
    try {
      // const [accessToken, setAccessToken] = useLocalStorage('access_token');
      const response = await axiosInstance.post('/user/login', {
        username,
        password,
      })
      return response.data
    } catch (err) {
      throw err
    }
  }
  static async logout() {
    localStorage.removeItem('user')
    Router.push('/login')
  }
  static async getAll() {
    return []
  }
}

export default UserService
