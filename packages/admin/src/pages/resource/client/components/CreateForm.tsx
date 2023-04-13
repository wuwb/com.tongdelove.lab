import React, { useRef } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="新建表单"
      formRef={formRef}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormText
          name="name"
          width="md"
          label="客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
      <ProForm.Group>
        <ProFormText
          name="taobao"
          width="md"
          label="淘宝"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name="alipay"
          label="支付宝"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="phone"
          width="md"
          label="手机"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name="tel"
          label="电话"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
          name="country"
          width="sm"
          label="国家"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          name="province"
          width="sm"
          label="省份"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="sm"
          name="city"
          label="城市"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="district"
          label="区县"
          placeholder="请输入名称"
        />
        <ProFormText
          width="sm"
          name="street"
          label="街道"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProFormText
          disabled
          width="md"
          name="preview"
          label="地址预览"
          placeholder="请输入名称"
        />
      <ProForm.Group>
        <ProFormText width="md" name="address" label="地址" placeholder="请输入名称" />
      </ProForm.Group>
      <ProFormDateRangePicker name="contractTime" label="上次送货时间" />
    </DrawerForm>
  );
};
