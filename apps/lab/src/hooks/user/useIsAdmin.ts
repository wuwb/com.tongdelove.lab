import { useUserStore } from '@/stores/useUserStore'
import { UserPermissionRole } from '@/server/backend/enums/user-enums'

export function useIsAdmin() {
  const userRole = useUserStore((store) => store.userRole)

  return userRole === UserPermissionRole.ADMIN
}
