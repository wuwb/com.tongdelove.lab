import { useEffect, useState } from 'react'

export const useDeviceOS = () => {
  const [os, setOS] = useState('')

  useEffect(() => {
    const userAgent = window.navigator.userAgent

    if (userAgent.indexOf('Windows') > -1) {
      setOS('windows')
    } else if (userAgent.indexOf('Mac OS') > -1) {
      setOS('mac')
    } else if (userAgent.indexOf('Linux') > -1) {
      setOS('linux')
    } else {
      setOS('other')
    }
  }, [])

  return os
}
