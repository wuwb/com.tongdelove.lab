import { Outlet } from '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

interface UpdateFormProps {
  updateModalVisible: boolean;
  onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="修改权限"
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Outlet />
    </Modal>
  );
};

export default UpdateForm;
