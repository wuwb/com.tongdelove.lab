import Head from 'next/head';
import NextLink from 'next/link';
import { Card, Space } from 'antd';
import Layout from '@/components/common/Layout';
import s from './Choose.module.css';

const Home = () => {
  return (
    <div className="mx-auto my-20 max-w-2xl lg:max-w-7xl flex justify-center">
      <Space>
        <NextLink href="/join">
          <a href="">
            <div className={s.content}>
              <h2>对于品牌和零售商</h2>
              <h4>查找制造商并管理您的包装供应链。</h4>
            </div>
          </a>
        </NextLink>
        <NextLink href="/network/join">
          <a href="">
            <div className={s.content}>
              <h2>对于包装制造商</h2>
              <h4>吸引新客户并生产优质品牌的包装。</h4>
            </div>
          </a>
        </NextLink>
      </Space>
    </div>
  );
};

Home.Layout = Layout;

export default Home;
