import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { findProductAll, updateRule, addRule, removeProduct } from './service';
import { Card, Alert, Typography } from 'antd';

export default (): React.ReactNode => {
  console.log('--------');

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '连接',
      dataIndex: 'path',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '分类',
      dataIndex: 'category',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href="">编辑</a>
          <a href="" onClick={() => removeProduct(record.id)}>删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>123456789</Card>

      {/* <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        size="small"
        options={{
          density: false,
          fullScreen: false,
          setting: true,
        }}
        toolBarRender={() => [
          <CreateForm />,
        ]}
        request={(params, sort, filter) => {
          const data = findProductAll({ ...params, sort, filter });
          console.log('data: ', data);
          return data;
        }}
        columns={columns}
      /> */}
    </PageContainer>
  );
};

