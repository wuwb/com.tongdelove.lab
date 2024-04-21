import { Link } from '@/components/ui/Link'
import { Box } from '@mantine/core'
import cx from 'clsx'
import { useTranslation } from 'next-i18next'

export function Logo(props) {
  const { t } = useTranslation()

  return (
    <div className={cx(props.className, 'flex flex-1 items-center md:flex-initial')} href="/">
      <div className="h-10 w-10 rounded-full bg-red-400 text-center leading-10 text-white">HAI</div>
      <div>海维包装实验室</div>
    </div>
  )
}
