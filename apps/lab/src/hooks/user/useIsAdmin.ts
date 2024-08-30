import { useUserStore } from '@/stores/useUserStore'
import { UserPermissionRole } from '@prisma/client'

export function useIsAdmin() {
  const userRole = useUserStore((store) => store.userRole)

  return userRole === UserPermissionRole.ADMIN
}
