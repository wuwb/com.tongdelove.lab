import React, { useRef, useEffect } from 'react';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { queryCreateMetadata, createProduct } from '../service';

export default () => {
  const formRef = useRef();
  const intl = useIntl();

  // const { data, error, loading } = useRequest(queryCreateMetadata);

  // console.log('data: ', data);

  useEffect(() => {
    // 获取初始化数据
    return () => { };
  });

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title={intl.formatMessage({
        id: 'resource.product.createForm',
        defaultMessage: '新建表单',
      })}
      formRef={formRef}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {intl.formatMessage({
            id: 'resource.product.new',
            defaultMessage: '新建',
          })}
        </Button>
      }
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        console.log(values);
        const data = await createProduct(values);
        console.log('data, error, loading : ', data);

        message.success('创建成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormText
        name="title"
        width="md"
        label="title"
      />
      <ProFormText
        name="slug"
        width="md"
        label="slug"
      />
      <ProFormTextArea
        name="description"
        label="description"
      />
      <ProFormSelect
        width="md"
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => [
          { label: '全部', value: 'all' },
        ]}
        name="category"
        label="category"
      />
      <ProFormSelect
        name="style"
        label="style"
        valueEnum={{
          red: 'Red',
          green: 'Green',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
      />
      <ProFormSelect
        name="material"
        label="material"
        valueEnum={{
          red: 'Red',
          green: 'Green',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
      />
      <ProFormSelect
        name="process"
        label="process"
        valueEnum={{
          red: 'Red',
          green: 'Green',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
      />
      <ProFormSelect
        name="sustainability"
        label="sustainability"
        valueEnum={{
          red: 'Red',
          green: 'Green',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
      />
      <ProFormSelect
        name="certification"
        label="certification"
        valueEnum={{
          red: 'Red',
          green: 'Green',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
      />
    </DrawerForm>
  );
};
