import { Container } from '@/components/ui/Container'
import clsx from 'clsx'
import { EXAMPLE_PATH } from '@/config/constant'

export const Alert = ({ preview }) => {
  return (
    <div
      className={clsx('item-center flex justify-center border-b', {
        'border-accent-7 bg-accent-7 text-white': preview,
        'border-accent-2 bg-accent-1': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="hover:text-cyan underline transition-colors duration-200"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className="hover:text-success underline transition-colors duration-200"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
