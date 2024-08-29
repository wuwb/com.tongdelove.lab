import { signIn, signOut } from 'next-auth/react'

export function SignIn({ provider, ...props }) {
  return (
    <button onClick={() => signIn()} {...props}>
      Sign In
    </button>
  )
}

export function SignOut(props) {
  return (
    <button
      onClick={() => signOut()}
      variant="ghost"
      className="w-full p-0"
      {...props}
    >
      Sign Out
    </button>
  )
}
