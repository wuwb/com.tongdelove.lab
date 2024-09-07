import { useTranslation } from '@/i18n'
import { MY_X_LINK } from '@/utils/constants/site'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { memo } from 'react'

interface FollowUsOnXProps {
  link?: string
}

export const FollowUsOnX = memo(({ link }: FollowUsOnXProps) => {
  const { t } = useTranslation()
  return (
    <div className="flex justify-center">
      <Link href={link ?? MY_X_LINK} target="_blank">
        <Button>{t('Follow us on X')}</Button>
      </Link>
    </div>
  )
})

FollowUsOnX.displayName = 'FollowUsOnX'
