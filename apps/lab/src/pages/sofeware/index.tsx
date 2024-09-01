import React from 'react'
import { Metadata } from 'next'
import { useTranslation } from '@/i18n'

export const metadata: Metadata = {
  title: '软件推荐',
}

function SofewarePage(): any {
  const { t } = useTranslation()

  return (
    <>
      <div className="box mx-auto max-w-screen-lg p-2">
        {t('Tuxera Disk Manager ZeroTier')}
      </div>
      <div>
        <div>论坛 https://github.com/flarum/flarum/</div>
        <div>网盘 https://github.com/Xhofe/alist</div>
      </div>
    </>
  )
}

export default SofewarePage
