import { ProColumns } from '@ant-design/pro-table/lib/Table.d'
import { Form, Input, Modal } from 'antd'
import React from 'react'

import { TableListItem } from '@/services/server/system/user.d'

interface ShowFormProps {
  showModalVisible: boolean
  onCancel: () => void
  values: Partial<TableListItem>
  columns: ProColumns<TableListItem>[]
}

const ShowForm: React.FC<ShowFormProps> = (props) => {
  const { showModalVisible, onCancel, values, columns } = props
  return (
    <Modal
      destroyOnClose
      title="查看用户"
      open={showModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
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
    </Modal>
  )
}

export default ShowForm
