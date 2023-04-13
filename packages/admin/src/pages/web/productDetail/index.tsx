import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input } from 'antd';
import { useIntl, FormattedMessage, useRequest, useParams } from '@umijs/max';
import { showProduct } from '@/services/demo/product';

export default (): React.ReactNode => {
  const intl = useIntl();
  const params = useParams();

  const { data, error, loading } = useRequest(() => showProduct(params.path));

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  return (
    <PageContainer>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
    </PageContainer>
  );
};
