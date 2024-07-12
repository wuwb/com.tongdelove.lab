import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Card } from 'antd'
import React from 'react'

const Welcome = (): React.ReactNode => {
  const intl = useIntl()

  return (
    <PageContainer>
      <Card>Welcome !</Card>
    </PageContainer>
  )
}

export default Welcome
