// import { authOptions } from '@/server/auth'
// import { getServerSession } from 'next-auth/next'
import { useSession } from "next-auth/react"
import { useState } from "react"

const Profile = ({ user }) => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")

  if (!session?.user) return null

  return (
    <div>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const session = await auth()

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   }
// }

export default Profile
