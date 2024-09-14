import { useTranslation } from '@/i18n'
import { ActionIcon, Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react'
import { RiGithubFill } from 'react-icons/ri'
import { RiWechatFill } from 'react-icons/ri'
import { RiWeiboFill } from 'react-icons/ri'
import { RiArrowUpLine } from 'react-icons/ri'
import { RiQqFill } from 'react-icons/ri'
import { RiBilibiliFill } from 'react-icons/ri'
import Link from 'next/link'
import { Affix, Modal, Text, Transition, rem } from '@mantine/core'
import { useWindowScroll, useDisclosure } from '@mantine/hooks'

export const GoTopButton = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  const handleShowWechatQrcode = () => {
    open()
  }

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-left" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <div style={transitionStyles} className="flex flex-col gap-1">
              <Tooltip label={t('QQ 群：96064860')} position="left" withArrow>
                <Link
                  href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=TDJPzbUN8r9yjnO_tcuzo48pFpW0r0gW&authKey=XPvEt5MQ1GkNny9hi2pDTeSDETzktu%2FSt8wkPGwGvfbY4X7gIsS%2BgS1mUBu8zRa8&noverify=0&group_code=96064860"
                  target="_blank"
                >
                  <ActionIcon
                    className="group"
                    variant="subtle"
                    color="gray"
                    aria-label="Settings"
                  >
                    <RiQqFill
                      size="22"
                      className="group-hover:text-[#3498db]"
                    />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                label={t('微信公众号：DeepDevelop')}
                position="left"
                withArrow
              >
                <ActionIcon
                  className="group"
                  variant="subtle"
                  color="gray"
                  aria-label="Settings"
                  onClick={handleShowWechatQrcode}
                >
                  <RiWechatFill
                    size="22"
                    className="group-hover:text-[#2ecc71]"
                  />
                </ActionIcon>
              </Tooltip>
              <Link href="https://weibo.com/u/1732957967" target="_blank">
                <ActionIcon
                  className="group"
                  variant="subtle"
                  color="gray"
                  aria-label="Settings"
                >
                  <RiWeiboFill
                    size="22"
                    className="group-hover:text-[#e74c3c]"
                  />
                </ActionIcon>
              </Link>
              <Tooltip label={t('返回顶部')} position="left" withArrow>
                <ActionIcon
                  className="group"
                  variant="subtle"
                  color="gray"
                  aria-label="Settings"
                  onClick={handleGoTop}
                >
                  <RiArrowUpLine size="22" className="group-hover:text-black" />
                </ActionIcon>
              </Tooltip>
            </div>
          )}
        </Transition>
      </Affix>
      <Modal
        opened={opened}
        onClose={close}
        title="wechat qrcode"
        removeScrollProps={{ allowPinchZoom: true }}
        closeButtonProps={{ 'aria-label': 'Close modal' }}
        centered
      >
        {t('我是二维码')}
      </Modal>
    </>
  )
}
