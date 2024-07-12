import { Outlet } from '@umijs/max'
import { Modal } from 'antd'
import React from 'react'

interface UpdateFormProps {
  updateModalVisible: boolean
  onCancel: () => void
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="修改用户"
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={768}
    >
      <Outlet />
    </Modal>
  )
}

export default UpdateForm
