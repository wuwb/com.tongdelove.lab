import { auth } from '@/auth'
import { notFound } from 'next/navigation'

const Page = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default Page
