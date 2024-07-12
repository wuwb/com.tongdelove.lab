import { ProColumns } from '@ant-design/pro-table/lib/Table.d'
import { Drawer, Form, Input } from 'antd'
import React from 'react'

import { TableListItem } from '@/services/base/user.d'

interface ShowFormProps {
  showDrawerVisible: boolean
  onClose: () => void
  values: Partial<TableListItem>
  columns: ProColumns<TableListItem>[]
}

const ShowForm: React.FC<ShowFormProps> = (props) => {
  const { showDrawerVisible, onClose, values, columns } = props
  return (
    <Drawer
      destroyOnClose
      title="查看"
      open={showDrawerVisible}
      onClose={() => onClose()}
      footer={null}
    >
      {values}
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={values}
      >
        {columns.map(
          (item, index) =>
            item.dataIndex !== 'option' && (
              // eslint-disable-next-line react/no-array-index-key
              <Form.Item key={index} label={item.title} name={item.dataIndex}>
                <Input disabled />
              </Form.Item>
            ),
        )}
      </Form>
    </Drawer>
  )
}

export default ShowForm
