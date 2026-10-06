'use client'

import { Jumbotron } from './blocks'
import { useTranslation } from '@/i18n'

const Demo = () => {
  const { t } = useTranslation()

  return (
    <Jumbotron />
  )
}

export default Demo
