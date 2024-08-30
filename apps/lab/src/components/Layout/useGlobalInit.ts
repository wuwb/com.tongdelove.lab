import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/stores'

export const useGlobalInit = async () => {
  const { data: session } = useSession()

  const setUserData = useUserStore((store) => store.setUserData)
  const setUserRole = useUserStore((store) => store.setUserRole)

  trpc.user.getUserProfile.useQuery(session?.user.id ?? '', {
    enabled: !!session?.user.id,
    onSuccess: (data) => {
      if (data) {
        setUserData(data)
      }
      if (data?.role) {
        setUserRole(data.role)
      }
    },
  })
}
