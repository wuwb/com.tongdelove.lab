import { showProduct } from '@/services/demo/product';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import React from 'react';

const ProductDetail = (): React.ReactNode => {
  const intl = useIntl();
  const params = useParams();

  const { data, error, loading } = useRequest(() => showProduct(params.path));

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageContainer>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
    </PageContainer>
  );
};

export default ProductDetail
