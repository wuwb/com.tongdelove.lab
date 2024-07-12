import { Outlet } from '@umijs/max'
import { Modal } from 'antd'
import React from 'react'

interface CreateFormProps {
  modalVisible: boolean
  onCancel: () => void
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="新建规则"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Outlet />
    </Modal>
  )
}

export default CreateForm
