import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input } from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';

export default (): React.ReactNode => {
  const intl = useIntl()

  return (
    <PageContainer>
      <Card>
        Welcome !
      </Card>
    </PageContainer>
  );
};
