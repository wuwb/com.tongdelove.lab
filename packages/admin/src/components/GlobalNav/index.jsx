import React, { Component, useState, useCallback } from 'react';
import { Link as NextLink } from '@umijs/max';
import css from './index.module.less';

const GlobalNav = () => {
  // const isServer = typeof window === "undefined";

  const [isServer, setIsServer] = useState(true);

  useCallback(() => {
    setIsServer(typeof window !== 'undefined');
  }, []);

  return (
    <div className={css.globalNav}>
      <div className={css.globalNavItems}>
        <ul className="fl">
          <li>
            <a>
              {isServer ? 'Server' : 'Client'} <span className="badge badge-secondary">Beta</span>
            </a>
          </li>
          <li>
            <a href="/">首页</a>
          </li>
          <li>
            <a href="/shop">店铺</a>
          </li>
          <li>
            <a href="/forum">论坛</a>
          </li>
          <li>
            <a href="/blog">博客</a>
          </li>
          <li>
            <a href="/chat">在线聊天室</a>
          </li>
          <li>
            <a href="/studio">工作室</a>
          </li>
        </ul>
        <ul className="fr">
          <li>
            <a className="nav-item-weibo" href="/">
              微博
            </a>
          </li>
          <li>
            <a className="nav-item-weixin" href="/">
              微信
            </a>
          </li>
          {/* <li>
                        <a className="nav-item-twitter" href="/">twitter</a>
                    </li>
                    <li>
                        <a className="nav-item-rss" href="/">RSS</a>
                    </li>
                    <li>
                        <a className="nav-item-phone" href="/">手机: 13735851501</a>
                    </li> */}
        </ul>
      </div>
    </div>
  );
};

export default GlobalNav;
