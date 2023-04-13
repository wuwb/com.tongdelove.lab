import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input } from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';

function CommonPlatemakingSize() {
  return (
    <PageContainer>
      <Card>
        <ProFormText width="md" name="name" label="书籍页数" tooltip="" />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '147g',
            },
          ]}
          name="unusedMode"
          label="纸张克重"
        />
        <ProFormText width="md" name="name" label="书籍厚度" tooltip="" readonly />
      </Card>
    </PageContainer>
  );
}

export default CommonPlatemakingSize;
