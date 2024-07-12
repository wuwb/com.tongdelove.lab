import { Outlet } from '@umijs/max'
import { Modal } from 'antd'
import React from 'react'

interface CreateFormProps {
  createModalVisible: boolean
  onCancel: () => void
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="新建权限"
      open={createModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Outlet />
    </Modal>
  )
}

export default CreateForm
