import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { AiOutlineMenu } from 'react-icons/ai'
import s from './TopMenuDocker.module.css'
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
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
        <AccordionRoot type="single" collapsible>
          <AccordionItem key="1" value="1">
            <AccordionTrigger>产品</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Link href="/products/folding-carton">折叠纸盒</Link>
                </li>
                <li>
                  <Link href="/products/accessories">包装附件</Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem key="2" value="2">
            <AccordionTrigger>解决方案</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Link href="/solutions/baked-fish">烤鱼自热包装</Link>
                </li>
              </ul>
            </AccordionContent>
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
