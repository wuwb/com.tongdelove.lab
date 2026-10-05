/**
 * tRPC 客户端统一出口。
 *
 * App Router 下客户端实例由 `TRPCReactProvider`（src/trpc/react.tsx）创建，
 * 此处只做转发，避免业务组件各自持有 provider 引用。
 */
export { trpc, api, TRPCReactProvider } from '@/trpc/react'
export type { RouterInputs, RouterOutputs } from '@/trpc/shared'
