import React, { useState } from 'react'
import Link from 'next/link'
import { Collapse } from 'antd'
import clsx from 'clsx'
import { MenuOutlined } from '@ant-design/icons'
import s from './TopMenuDocker.module.css'

const { Panel } = Collapse

export const TopMenuDocker = (props) => {
  const [showContent, setShowContent] = useState(false)

  function handleClick() {
    setShowContent(!showContent)
  }

  return (
    <div className={s.topMenuDocker}>
      <div
        className="flex"
        tabIndex={0}
        aria-label="Menu"
        onClick={handleClick}
      >
        <MenuOutlined />
      </div>
      {
        <div
          className={clsx(s.topMenuDockerContent, {
            block: showContent,
            hidden: !showContent,
          })}
        >
          <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
            <Panel header="产品" key="1">
              <ul>
                <li>
                  <Link href="/products/folding-carton">折叠纸盒</Link>
                </li>
                <li>
                  <Link href="/products/accessories">包装附件</Link>
                </li>
              </ul>
            </Panel>
            <Panel header="解决方案" key="2">
              <ul>
                <li>
                  <Link href="/solutions/baked-fish">烤鱼自热包装</Link>
                </li>
              </ul>
            </Panel>
          </Collapse>
          <div>
            <Link href="/about">
              <a className="block px-4 py-3 text-sm">关于</a>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}
