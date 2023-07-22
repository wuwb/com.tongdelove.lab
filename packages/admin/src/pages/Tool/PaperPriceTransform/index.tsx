import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography, Input } from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';

function CommonPlatemakingSize() {
  return (
    <PageContainer>
      <Card>
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '147g',
            },
          ]}
          name="unusedMode"
          label="纸张尺寸"
        />
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
        <ProFormText width="md" name="name" label="令重" readonly />
        <ProFormText width="md" name="name" label="令数" readonly />

        <ProFormText width="md" name="name" label="吨价" tooltip="" />
        <ProFormText width="md" name="name" label="令价" tooltip="" />
        <ProFormText width="md" name="name" label="单价" tooltip="" />
      </Card>
    </PageContainer>
  );
}

export default CommonPlatemakingSize;
