import clsx from 'clsx'
import { type FC } from 'react'

type ContainerProps = any

export const Container: FC<ContainerProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div className={clsx('container mx-auto', props.className)}>
      {props.children}
    </div>
  )
}
