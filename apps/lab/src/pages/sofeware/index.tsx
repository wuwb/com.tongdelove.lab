import React from 'react'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '软件推荐',
}

function SofewarePage(): any {
  const { t } = useTranslation()

  return (
    <>
      <div className="box mx-auto max-w-screen-lg p-2">
        Tuxera Disk Manager ZeroTier
      </div>
      <div>
        论坛 https://github.com/flarum/flarum/ 网盘
        https://github.com/Xhofe/alist
      </div>
    </>
  )
}

export default SofewarePage

export async function getServerSideProps({ locale, defaultLocale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
