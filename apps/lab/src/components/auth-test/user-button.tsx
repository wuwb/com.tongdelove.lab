import { useSession } from 'next-auth/react'
import { SignIn, SignOut } from './auth-components'

export default function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) {
    return <SignIn provider="github" />
  }

  return (
    <div>
      <button className="relative h-8 w-8 rounded-full">
        {session.user.image && (
          <img src={session.user.image} alt={session.user.name ?? ''} />
        )}
        <div>{session.user.email}</div>
      </button>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{session.user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {session.user.email}
        </p>
      </div>
      <SignOut />
    </div>
  )
}
