import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'

const Page = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  if (!session?.user?.id) {
    return notFound()
  }

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default Page
