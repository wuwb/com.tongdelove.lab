import { PlusOutlined } from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button, Drawer, Space } from 'antd'
import React, { useState } from 'react'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ParentId',
    dataIndex: 'parentId',
    key: 'parentId',
  },
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Uri',
    dataIndex: 'uri',
    key: 'uri',
  },
  {
    title: 'PermissionId',
    dataIndex: 'permissionId',
    key: 'permissionId',
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a key="up">Up</a>
        <a key="down">Down</a>
        <a key="edit">Edit</a>
        <a key="delete">Delete</a>
      </Space>
    ),
  },
]

const tableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export default (props): React.ReactNode => {
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  // const { data, error, loading } = useRequest(queryMenu);

  // console.log('data, error, loading: ', data, error, loading);

  // const tableData = [] // data.list;

  return (
    <PageHeader>
      <ProTable
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setShowNew(true)}>
            <PlusOutlined /> New
          </Button>,
        ]}
        columns={columns}
        dataSource={tableData}
      />
      <Drawer
        title="Create a new account"
        width={720}
        onClose={() => setShowNew(false)}
        open={showNew}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button
              onClick={() => setShowNew(false)}
              rootStyle={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowNew(false)} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        new data
      </Drawer>
    </PageHeader>
  )
}
