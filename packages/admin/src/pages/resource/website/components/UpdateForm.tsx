import React from 'react';
import { Modal } from 'antd';
import { Outlet } from '@umijs/max';
import { Button, Drawer } from 'antd';


interface UpdateFormProps {
  updateModalVisible: boolean;
  onClose: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onClose } = props;

  return (
    <Drawer
      destroyOnClose
      title="修改"
      open={updateModalVisible}
      onClose={() => onClose()}
      footer={null}
      width={768}
    >
      <Outlet />
      {props.children}
    </Drawer>
  );
};

export default UpdateForm;
