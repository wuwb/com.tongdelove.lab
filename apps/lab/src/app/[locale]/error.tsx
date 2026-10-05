'use client'

import { useEffect } from 'react'
import type { FC } from 'react'

type Props = {
  statusCode?: number | null
  error?: Error
  message?: string
  errorId?: string
  children?: never
}

export const ErrorPage: FC<Props> = (props) => {
  const { error, errorId, message, statusCode } = props

  return (
    <>
      <title>Error {statusCode}</title>
      <div className="container bg-white text-2xl md:text-xl">
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="m-5 text-5xl text-black md:text-4xl">Woops !</h1>
          <p className="text-2xl text-black md:text-2xl">
            Something went wrong. Please try again later.
          </p>
          <div className="m-5 rounded-lg border-2 border-solid p-5 text-left text-sm text-gray-700">
            <p data-testid="error-status-code">Code: {statusCode}</p>
            <p>Message: {message}</p>
            <p>Error id: {errorId}</p>
            <p>ErrorMessage: {error?.message}</p>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 迁移自 src/pages/500.tsx。
 * App Router 的 error.tsx 已覆盖运行时错误，这里用于显式的 500 兜底展示。
 */
export default function ServerErrorPage() {
  return <ErrorPage statusCode={500} />
}


/**
 * 迁移自 pages/_error.tsx。
 *
 * App Router 的 error.tsx 只能捕获其下 segment 的渲染错误，
 * 必须是 client component；Sentry 上报沿用原逻辑。
 * 迁移前此处用 next/dynamic 包装 @/components/Error，
 * 但 App Router 的 error.tsx 约定导出必须是接收 { error, reset } 的 client component，
 * dynamic() 包装后签名不匹配，边界实际不会生效。
 * 这里改为标准 error boundary，复用 [locale]/error.tsx 的同一套 ErrorPage 展示。
 */
function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorPage
      error={error}
      errorId={error.digest}
      statusCode={500}
      message={error.message}
    />
  )
}
