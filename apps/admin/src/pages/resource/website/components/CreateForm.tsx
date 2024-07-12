import { Outlet } from '@umijs/max'
import { Button, Drawer, Space } from 'antd'
import type { DrawerProps } from 'antd/es/drawer'
import React, { useState } from 'react'

interface CreateFormProps {
  createDrawerVisible: boolean
  onClose: () => void
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createDrawerVisible, onClose } = props

  const [size, setSize] = useState<DrawerProps['size']>('large')

  return (
    <Drawer
      destroyOnClose
      title="新建"
      placement="right"
      size={size}
      open={createDrawerVisible}
      onClose={() => onClose()}
      footer={null}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <Outlet />
    </Drawer>
  )
}

export default CreateForm
