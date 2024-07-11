import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import s from './TopMenu.module.css';

const TopMenu = ({ toggleDarkMode }: any) => {
  const [current, setCurrent] = useState('/');
  const router = useRouter()

  const handleClick = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <ul className={s.headerMenu}>
      <li className={s.menuItem}>
        <Link href="/introduce"><a>介绍</a></Link>
        <ul className={cx(s.subMenu, 'flex flex-col')} aria-label="submenu">
          <li className={cx(s.subMenuItem)}>
            <Link href="/why"><a>为什么选我们</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/properties"><a>环保</a></Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}><Link href="/features"><a>平台</a></Link></li>
      <li className={s.menuItem}>
        <Link href="/products"><a aria-haspopup="true">产品分类</a></Link>
        <ul className={cx(s.subMenu, 'flex flex-col')} aria-label="submenu">
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>纸质包装</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>自加热餐盒</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>纸筒</a></Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/solutions"><a aria-haspopup="true">解决方案</a></Link>
        <ul className={cx(s.subMenu, 'flex flex-col')} aria-label="submenu">
          <li className={cx(s.subMenuItem)}>
            <Link href="/solutions/baked-fish"><a>烤鱼包装</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>日化用品</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>零售快消</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>降本服务</a></Link>
          </li>
          <li className={cx(s.subMenuItem)}>
            <Link href="/products"><a>包装测试</a></Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}>
        <Link href="/services"><a>服务</a></Link>
        <ul className={cx(s.subMenu, 'flex flex-col')} aria-label="submenu">
          <li className={s.subMenuItem}>
            <Link href="/products"><a>设计服务</a></Link>
          </li>
        </ul>
      </li>
      <li className={s.menuItem}><Link href="/customers"><a>客户案例</a></Link></li>
      <li className={s.menuItem}><Link href="/pricing"><a>价格</a></Link></li>

      {/* <a className="nav-link" href="/products/standard">标品现货</a>
      <a className="nav-link" href="/products/corrugatedbox">瓦楞纸箱</a>
      <a className="nav-link" href="/products/carton">折叠纸盒</a>
      <a className="nav-link" href="/products/bags">包装袋</a>
      <a className="nav-link" href="/products/accessories">包装辅料</a>
      <a className="nav-link" href="/product">商务印刷</a>
      <a className="nav-link" href="/product">数码快印</a> */}
      <li className={s.menuItem}><Link href="/industry"><a>行业</a></Link></li>
      <li className={s.menuItem}><Link href="/daohang"><a>导航</a></Link></li>
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
      <li className={s.menuItem}><Link href="/about"><a>关于</a></Link></li>
    </ul>
  );
};

export default TopMenu;
