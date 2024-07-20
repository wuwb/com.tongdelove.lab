import { useState, useEffect } from 'react'
import { UserService } from '@/services'
import { Layout } from '@/components/common'

const UserProfilePage = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    UserService.getAll().then((users) => setUsers(users))
  }, [])

  return (
    <div className="card mt-4">
      <h4 className="card-header">You're logged in with Next.js 11 & JWT!!</h4>
      <div className="card-body">
        <h6>Users from secure api end point</h6>
        {users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
        {!users && <div className="spinner-border spinner-border-sm"></div>}
      </div>
    </div>
  )
}

UserProfilePage.Layout = Layout

export default UserProfilePage
