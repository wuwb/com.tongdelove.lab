import { useTranslation } from '@/i18n'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tongdelove/ui/components/tooltip'
import Link from 'next/link'
import { useState } from 'react'
import {
  RiArrowUpLine,
  RiQqFill,
  RiWechatFill,
  RiWeiboFill,
} from 'react-icons/ri'

export const GoTopButton = () => {
  const { t } = useTranslation()

  const [opened, setOpened] = useState(false)

  const handleShowWechatQrcode = () => {
    setOpened((prev) => !prev)
  }

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const buttonClass =
    'group flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-600'

  return (
    <div className="fixed bottom-10 right-6 z-50 flex flex-col items-center gap-3">
      {/* QR Code Popover */}
      {opened && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white p-4 rounded-lg shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
          <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {t('我是二维码')}
          </div>
          {/* Add actual QR code image here if/when available */}
        </div>
      )}

      {/* Main Button Group */}
      <TooltipProvider>
        <div className="flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200/50">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=TDJPzbUN8r9yjnO_tcuzo48pFpW0r0gW&authKey=XPvEt5MQ1GkNny9hi2pDTeSDETzktu%2FSt8wkPGwGvfbY4X7gIsS%2BgS1mUBu8zRa8&noverify=0&group_code=96064860"
                target="_blank"
              >
                <div className={buttonClass} aria-label="QQ Group">
                  <RiQqFill size="22" className="group-hover:text-[#3498db]" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>{t('QQ 群：96064860')}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={buttonClass}
                aria-label="WeChat"
                onClick={handleShowWechatQrcode}
              >
                <RiWechatFill
                  size="22"
                  className="group-hover:text-[#2ecc71]"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>{t('微信公众号：DeepDevelop')}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="https://weibo.com/u/1732957967" target="_blank">
                <div className={buttonClass} aria-label="Weibo">
                  <RiWeiboFill
                    size="22"
                    className="group-hover:text-[#e74c3c]"
                  />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>{t('微博')}</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-px w-6 bg-gray-200 mx-auto" />

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={buttonClass}
                aria-label="Go Top"
                onClick={handleGoTop}
              >
                <RiArrowUpLine size="22" className="group-hover:text-black" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>{t('返回顶部')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}
