import axios from '@/utils/axios'

export const userValue = () => {
  return localStorage.getItem('user')
}

export const getUserById = async () => {
  const response = await axios.get('/users/user')
  return response.data
}

export const login = async (username, password) => {
  const response = await axios.post('/user/login', {
    username,
    password,
  })
  return response.data
}

export const logout = async () => {
  localStorage.removeItem('user')
  return axios.post('/api/auth/logout')
}
