import { PageContainer } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Card } from 'antd';

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
