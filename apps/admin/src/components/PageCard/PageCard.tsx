import { Outlet } from '@umijs/max'
import { Spin } from 'antd'
import clsx from 'clsx'
import React from 'react'

import style from './style.less'

interface IProps {
  children: React.ReactNode
  title?: React.ReactNode
  extra?: React.ReactNode
  className?: string
  loading?: boolean
}

export const PageCard = (props: IProps) => (
  <div className={clsx(style['wrapper'], props.className)}>
    <Spin
      spinning={typeof props.loading !== 'undefined' ? props.loading : false}
      className={style['spin']}
      size="large"
      delay={100}
    >
      <div className={style['container']}>
        <Outlet />
      </div>
    </Spin>
  </div>
)
