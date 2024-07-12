import { useCallback, useState } from 'react'

export default function useAuthModel() {
  const [user, setUser] = useState({
    userid: 'test',
  })

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    setUser(null)
  }, [])

  const fetchUser = useCallback(() => {
    setUser({
      userid: 'test2',
    })
  }, [])

  return {
    user,
    signin,
    signout,
    fetchUser,
  }
}
