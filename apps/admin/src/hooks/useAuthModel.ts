import { useCallback, useState } from 'react'

export default function useAuthModel() {
  const [user, setUser] = useState(null)
  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])
  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])
  return {
    user,
    signin,
    signout,
  }
}
