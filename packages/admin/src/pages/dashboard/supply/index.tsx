import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';

const Supply = (props): React.ReactNode => (
  <PageContainer content=" 这个页面只有 admin 权限才能查看">
    <Card>
      <Alert
        message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <SmileTwoTone /> FSD Node.js <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </Card>
    <Outlet />
  </PageContainer>
);

export default Supply
