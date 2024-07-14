// import { authOptions } from '@/server/auth'
// import { getServerSession } from 'next-auth/next'
// import { auth } from "@/auth"
const Profile = ({ user }) => {
  // Show the user. No loading state is required
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
