import React from 'react'
import Link from 'next/link'
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Avatar } from '@/components/ui/avatar'
import { Logo } from '../../ui'
import { TopMenu } from '../TopMenu'
import { TopMenuDocker } from '../TopMenuDocker'
import s from './Header.module.css'
import { useAuth } from '@/contexts/auth'
// import { useTranslation, Trans } from 'next-i18next';
// import LocaleSwitch from '@/components/common/Header';

export const Header = (props) => {
  const { children } = props
  // const { t } = useTranslation('common')

  const auth = useAuth()
  let data: any = auth.user
  let text
  let content

  if (data) {
    text = `Signed in as: ${data?.email || data?.username}`
    content = (
      <div>
        <div>
          <div>你的信息</div>
          <div>你的项目</div>
          <div>你的收藏</div>
        </div>
        <div>
          <div>升级</div>
          <div>新功能预览</div>
          <div>帮助</div>
          <div>设置</div>
          <div>
            <a
              onClick={(e) => {
                e.preventDefault()
                auth.logout()
              }}
            >
              退出
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={s.headerPlaceholder}></div>
      <div id="header" className={s.styledHeader}>
        <div className={s.styledHeaderContent}>
          <div className="flex">
            <Logo className="ml-4 mr-2 flex items-center" />

            <TopMenu />

            {children}
          </div>
          <div className="flex items-center gap-2.5">
            {!data && (
              <>
                <Link href="/user/login">登录</Link>
                <Link href="/user/register">注册</Link>
              </>
            )}
            {data && (
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Avatar src={data.avatarUrl} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <PopoverTitle fontWeight="medium">{text}</PopoverTitle>
                    {content}
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
            <TopMenuDocker />
          </div>
        </div>
      </div>
    </div>
  )
}
