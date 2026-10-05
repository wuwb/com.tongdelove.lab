'use client'

/**
 * 全局错误边界（迁移自 src/pages/_error.tsx 的兜底部分）。
 *
 * global-error 替换整个 root layout，因此必须自行输出 html/body，
 * 且不能依赖任何 provider。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh">
      <body>
        <div className="container flex min-h-screen flex-col items-center justify-center bg-white text-center">
          <h1 className="m-5 text-5xl font-bold text-black md:text-4xl">
            Woops !
          </h1>
          <p className="text-2xl text-black md:text-xl">
            Something went wrong. Please try again later.
          </p>
          {error.digest ? (
            <p className="mt-4 text-sm text-neutral-500">
              Error id: {error.digest}
            </p>
          ) : null}
          <button
            className="mt-6 rounded-full bg-blue-600 px-6 py-3 tracking-wide text-white hover:opacity-90"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
