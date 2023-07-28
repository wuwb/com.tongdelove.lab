import { PageContainer } from '@ant-design/pro-components';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Link } from '@umijs/max';
import { Space } from 'antd';
import React, { useRef } from 'react';
import { list } from '../service';

const PostListPage: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '图片',
      dataIndex: 'taobao',
    },
    {
      title: '标题',
      dataIndex: 'postTitle',
    },
    {
      slug: 'Slug',
      dataIndex: 'postName',
    },
    {
      slug: 'desc',
      dataIndex: 'postExcerpt',
    },
    {
      title: '状态',
      sorter: true,
      dataIndex: 'postStatus',
    },
    {
      title: '时间',
      sorter: true,
      dataIndex: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <Link to={`/resource/post/edit/${record.id}`}>编辑</Link>
          <a onClick={() => {}}>发布</a>
          <a onClick={() => {}}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        size="small"
        options={{
          density: false,
          fullScreen: true,
          setting: true,
        }}
        toolBarRender={() => []}
        request={(params, sorter, filter) => list({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default PostListPage;
