import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import { getCookie } from '../utils/cookie'

export const useDeviceId = () => {
  const [id, setId] = useState('')

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId') || nanoid()
    const cookieId = getCookie('deviceId')

    const finalId = cookieId || deviceId

    if (cookieId !== deviceId) {
      localStorage.setItem('deviceId', finalId)
      document.cookie = `deviceId=${finalId}; max-age=31536000; path=/; samesite=lax;`
    }

    setId(finalId)
  }, [])

  return id
}
