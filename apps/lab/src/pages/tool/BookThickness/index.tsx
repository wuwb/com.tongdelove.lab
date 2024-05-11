import { PageContainer } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Card } from 'antd';

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
