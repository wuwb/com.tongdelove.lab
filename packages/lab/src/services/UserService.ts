import { useLocalStorage } from "react-use";
import Router from 'next/router'
import axios from "../utils/axios";

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
      const response = await axios.get("/users/user");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async login(username, password) {
    try {
      // const [accessToken, setAccessToken] = useLocalStorage('access_token');
      const response = await axios.post("/user/login", {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async logout() {
    localStorage.removeItem('user');
    Router.push('/login');
  }
  static async getAll() {
    return [];
  }
};

function login(username, password) {
  return axios.post('/api/auth/login', {
    username, password
  });
}

function logout() {
  return axios.post('/api/auth/logout');
}

function register(user) { }

function getById(id) { }

function getAll() { }

function update(id, params) { }

export default UserService;
