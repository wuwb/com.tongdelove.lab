import Container from './container';
import cx from 'classnames';

export default function Alert({ preview }) {
  return (
    <div
      className={cx('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is a page preview.{' '}
              <a href="/api/exit-preview" className="hover:text-cyan underline transition-colors duration-200">
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
