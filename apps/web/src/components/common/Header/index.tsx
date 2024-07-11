import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Space, Button, Avatar, Popover } from 'antd';
import { Logo } from '../../ui';
import TopMenu from '../TopMenu';
import TopMenuDocker from '../TopMenuDocker';
import s from './Header.module.css';
import {useAuth} from "@/contexts/auth";
// import { useTranslation, Trans } from 'next-i18next';
// import LocaleSwitch from '@/components/common/Header';

const Header = (props) => {
  const { children } = props;
  // const { t } = useTranslation('common')

  const auth = useAuth();
  let data: any = auth.user;
  let text;
  let content;

  if (data) {
    text = `Signed in as: ${data?.email || data?.username}`;
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
                e.preventDefault();
                auth.logout();
              }}
            >
              退出
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={s.headerPlaceholder}></div>
      <div id="header" className={s.styledHeader}>
        <div className={s.styledHeaderContent}>
          <div className="flex">
            <Logo className="mr-2 ml-4 items-center flex"/>
            
            <TopMenu />
           
            {children}
          </div>
          <div className="flex items-center">
            <Space direction="horizontal" align="center">
              {!data && (
                <>
                  <Link href="/user/login">
                    <a>登录</a>
                  </Link>
                  <Link href="/user/register">
                    <a>注册</a>
                  </Link>
                </>
              )}
              {data && (
                <Popover placement="bottomRight" title={text} content={content} trigger="click">
                  <Avatar src={data.avatarUrl} />
                </Popover>
              )}
              <TopMenuDocker />
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

