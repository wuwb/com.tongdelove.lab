import { Outlet } from '@umijs/max'
import { Drawer } from 'antd'
import React from 'react'

interface UpdateFormProps {
  updateModalVisible: boolean
  onClose: () => void
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onClose } = props

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
  )
}

export default UpdateForm
