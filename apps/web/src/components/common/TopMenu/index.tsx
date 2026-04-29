import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import s from './TopMenu.module.css'

export const TopMenu = ({ toggleDarkMode }: any) => {
  const [current, setCurrent] = useState('/')
  const router = useRouter()

  const handleClick = (e) => {
    setCurrent(e.key)
    router.push(e.key)
  }

  return (
    <ul className={s.headerMenu}>
      <li className={s.menuItem}>
        <Link href="/introduce">介绍</Link>
        <ul className={s.subMenu} aria-label="submenu">
          <li className={clsx(s.subMenuItem)}>
            <Link href="/why">为什么选我们</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/properties">环保</Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/features">平台</Link>
      </li>
      <li className={s.menuItem}>
        <Link href="/products">产品分类</Link>
        <ul className={s.subMenu} aria-label="submenu">
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">纸质包装</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">自加热餐盒</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">纸筒</Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/solutions">解决方案</Link>
        <ul className={s.subMenu} aria-label="submenu">
          <li className={clsx(s.subMenuItem)}>
            <Link href="/solutions/baked-fish">烤鱼包装</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">日化用品</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">零售快消</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">降本服务</Link>
          </li>
          <li className={clsx(s.subMenuItem)}>
            <Link href="/products">包装测试</Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/services">服务</Link>
        <ul className={s.subMenu} aria-label="submenu">
          <li className={s.subMenuItem}>
            <Link href="/products">设计服务</Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/customers">客户案例</Link>
      </li>
      <li className={s.menuItem}>
        <Link href="/pricing">价格</Link>
      </li>

      {/* <a className="nav-link" href="/products/standard">标品现货</a>
      <a className="nav-link" href="/products/corrugatedbox">瓦楞纸箱</a>
      <a className="nav-link" href="/products/carton">折叠纸盒</a>
      <a className="nav-link" href="/products/bags">包装袋</a>
      <a className="nav-link" href="/products/accessories">包装辅料</a>
      <a className="nav-link" href="/product">商务印刷</a>
      <a className="nav-link" href="/product">数码快印</a> */}
      <li className={s.menuItem}>
        <Link href="/industry">行业</Link>
      </li>
      <li className={s.menuItem}>
        <Link href="/daohang">导航</Link>
      </li>
      {/* <a className="nav-link" href="/design">设计</a>
      <a className="nav-link" href="/technology">技术</a>
      <a className="nav-link" href="/application">软件</a>
      <a className="nav-link" href="/devices">设备</a>
      <a className="nav-link" href="/company">企业</a>
      <a className="nav-link" href="/association">协会</a>
      <a className="nav-link" href="/exhibition">展会</a>
      <a className="nav-link" href="/recruitment">招聘</a>
      <a className="nav-link" href="/news">新闻</a>
      <a className="nav-link" href="/policy">政策</a> */}
      <li className={s.menuItem}>
        <Link href="/about">关于</Link>
      </li>
    </ul>
  )
}
