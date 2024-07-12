import { queryProducts } from '@/services/demo/product'
import { PageContainer } from '@ant-design/pro-components'
import { Link, useIntl, useRequest } from '@umijs/max'
import React from 'react'

const Product = (): React.ReactNode => {
  const intl = useIntl()

  const { data, error, loading } = useRequest(queryProducts)

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>loading</div>
  }

  return (
    <PageContainer>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Link to={`/products/${item.path}`}>{item.name}</Link>
          </div>
        )
      })}
    </PageContainer>
  )
}

export default Product
