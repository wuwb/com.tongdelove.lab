import React from 'react'
import clsx from 'clsx'

type Props = {
  data: {
    title: string
    paragraph: string
  }
  children?: any
  tag?: any
  className?: string
}

export const SectionHeader = ({ className, data, children, tag, ...props }: Props) => {
  const classes = clsx('section-header', className)
  const Component = tag

  return (
    <>
      {(data.title || data.paragraph) && (
        <div {...props} className={classes}>
          <div className="container-xs">
            {children}
            {data.title && (
              <Component
                className={clsx('mt-0', data.paragraph ? 'mb-16' : 'mb-0')}
              >
                {data.title}
              </Component>
            )}
            {data.paragraph && <p className="m-0">{data.paragraph}</p>}
          </div>
        </div>
      )}
    </>
  )
}
