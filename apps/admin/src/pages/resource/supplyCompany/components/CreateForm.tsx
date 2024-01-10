import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { useRef } from 'react';
import { create } from '../service';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <DrawerForm<any>
      title="新建"
      formRef={formRef}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        values.type = 1;
        console.log(values);

        const result = await create(values);
        props.onCreated(values);

        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="sm"
          label="供应商名称"
          tooltip="最长为 24 位"
          placeholder=""
        />
        <ProFormText width="sm" name="enName" label="英文名" placeholder="" />
        <ProFormText width="sm" name="formerName" label="曾用名" placeholder="" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="legalEntity" label="注册法人" placeholder="" />
        <ProFormDatePicker name="registryAt" label="注册日期" />
        <ProFormText width="sm" name="registryAddress" label="注册地点" placeholder="" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText width="md" name="location" label="地址" placeholder="" />
        <ProFormText width="md" name="address" label="详细地址" placeholder="" />
        <ProFormText width="sm" name="registryAddress" label="注册地点" placeholder="" />
      </ProForm.Group>
      <ProFormText width="sm" name="identifier" label="注册编号" placeholder="" />
      {/* <ProFormText width="sm" name="chairman" label="主席" placeholder="" /> */}
      <ProFormRadio.Group
        name="hasBranch"
        label="是否有分支机构"
        options={[
          {
            label: '否',
            value: 0,
          },
          {
            label: '是',
            value: 1,
          },
        ]}
      />
      <ProFormDigit width="sm" name="staffSize" label="员工数量" min={1} max={999999} />
      <ProFormDigit width="sm" name="registeredCapital" label="注册资本" min={1} max={999999} />
      <ProForm.Group>
        <ProFormText width="sm" name="website" label="网站" placeholder="" />
        <ProFormText width="sm" name="email" label="邮箱" placeholder="" />
      </ProForm.Group>

      <ProFormSelect
        width="xs"
        options={[
          {
            value: 1,
            label: '包装厂',
          },
        ]}
        name="classificationId"
        label="分类"
      />
    </DrawerForm>
  );
};
