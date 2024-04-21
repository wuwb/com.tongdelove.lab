import clsx from 'clsx'
import { type FC } from 'react'

type Props = any

export const Container: FC<Props & React.HTMLAttributes<HTMLDivElement>> = props => {
  return <div className={clsx('container mx-auto', props.className)}>{props.children}</div>
}
