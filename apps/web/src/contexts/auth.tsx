import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import api from '../utils/axios'

const AuthContext = createContext({} as any)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        try {
          const { data: user } = await api.get('user/profile')
          if (user) {
            setUser(user)
          }
        } catch (err) {
          console.log('未登陆')
        }
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [])

  const login = async (username, password) => {
    const { data: token } = await api.post('auth/login', { username, password })
    if (token) {
      Cookies.set('token', token.token, { expires: 60 })
      api.defaults.headers['Authorization'] = `Bearer ${token.token}`
      const { data: user } = await api.get('user/profile')
      setUser(user)
      return user
    }
  }

  const logout = (username, password) => {
    Cookies.remove('token')
    setUser(null)
    delete api.defaults.headers['Authorization']
    window.location.pathname = '/login'
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <div>loading</div>
  }
  return children
}
