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
      <div>
        <h1>Recommand Software</h1>

        <h3>系统工具</h3>
        <h3>办公软件</h3>
        <h3>图像处理</h3>
        <h3>视频编辑</h3>
        <h3>编程工具</h3>
        <h3>下载工具</h3>
        <h3>压缩工具</h3>
        <h3>截图录音</h3>
        <h3>链接工具</h3>
        <h3>媒体工具</h3>
      </div>
    </>
  )
}

export default SofewarePage
