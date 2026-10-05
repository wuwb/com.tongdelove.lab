'use client'

import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/stores'

/**
 * 全局初始化：登录后拉取用户资料写入 store。
 *
 * 内部全部是同步 hook，不能声明为 async ——
 * async 函数中的 hook 调用发生在微任务里，调用顺序不稳定，
 * 会触发 "hooks[lastArg] is not a function"。
 */
export const useGlobalInit = () => {
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
