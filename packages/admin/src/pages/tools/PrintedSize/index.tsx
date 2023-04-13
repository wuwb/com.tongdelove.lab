import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input, Image } from 'antd';
import PrintedSize from '@/assets/printed-size.jpg';

function Page() {
  return (
    <PageContainer>
      <Card>
        <Image
          src={PrintedSize}
        />
      </Card>
    </PageContainer>
  );
}

export default Page;
