import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { AiOutlineMenu } from 'react-icons/ai'
import s from './TopMenuDocker.module.css'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'

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
        <AiOutlineMenu />
      </div>
      <div
        className={clsx(s.topMenuDockerContent, {
          block: showContent,
          hidden: !showContent,
        })}
      >
        <AccordionRoot>
          <AccordionItem key="1" value="1">
            <AccordionItemTrigger>产品</AccordionItemTrigger>
            <AccordionItemContent>
              <ul>
                <li>
                  <Link href="/products/folding-carton">折叠纸盒</Link>
                </li>
                <li>
                  <Link href="/products/accessories">包装附件</Link>
                </li>
              </ul>
            </AccordionItemContent>
          </AccordionItem>
          <AccordionItem key="2" value="2">
            <AccordionItemTrigger>解决方案</AccordionItemTrigger>
            <AccordionItemContent>
              <ul>
                <li>
                  <Link href="/solutions/baked-fish">烤鱼自热包装</Link>
                </li>
              </ul>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
        <div>
          <Link href="/about" className="block px-4 py-3 text-sm">
            关于
          </Link>
        </div>
      </div>
    </div>
  )
}
