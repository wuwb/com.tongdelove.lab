import { FC } from 'react'
import type { WithChildren } from '@/helper/WithChildren'

type Props = any

export const Divider: FC = (props: Props & WithChildren) => {
  return <div className="my-4 h-px w-full">{props.children}</div>
}
