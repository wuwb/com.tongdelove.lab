import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input } from 'antd';
import { useIntl, FormattedMessage, useRequest, Link } from '@umijs/max';
import { queryProducts } from '@/services/demo/product';

export default (): React.ReactNode => {
  const intl = useIntl();

  const { data, error, loading } = useRequest(queryProducts);

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>loading</div>
  }

  return (
    <PageContainer>
      {
        data.map((item) => {
          return (

            <div key={item.id}>
              <Link to={`/products/${item.path}`}>{item.name}</Link>
            </div>
          )
        })
      }
    </PageContainer>
  );
};
