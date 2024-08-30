import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { UserData } from '@/types/user'
import { UserPermissionRole } from '@prisma/client'
import { DEFAULT_USER_DATA } from '@/utils/constants/user'

interface UserStore {
  userData: UserData | null | undefined
  userRole: UserPermissionRole
  setUserData: (userData: UserData) => void
  setUserRole: (userRole: UserPermissionRole) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userData: DEFAULT_USER_DATA,
      userRole: UserPermissionRole.USER,
      setUserData: async (userData: UserData) => {
        set({
          userData,
        })
      },
      setUserRole: async (userRole: UserPermissionRole) => {
        set({
          userRole,
        })
      },
    }),
    {
      name: 'user',
      skipHydration: true,
      partialize: (state) => ({
        userData: state.userData,
        userRole: state.userRole,
      }),
    }
  )
)
