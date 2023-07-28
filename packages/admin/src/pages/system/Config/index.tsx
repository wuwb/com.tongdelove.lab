import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Divider, Dropdown, message, Popconfirm } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useRef, useState } from 'react';
// import ImgCrop from 'antd-img-crop';
import { queryPermission } from '@/services/server/base/permission';
import { queryRole } from '@/services/server/system/role';
import { createUser, removeUser, showUser, updateUser } from '@/services/server/system/user';
import { UserListItem } from '@/services/server/system/user.d';
import { UploadFile } from 'antd/lib/upload/interface';
import CreateForm from './components/CreateForm';
import ShowForm from './components/ShowForm';
import UpdateForm from './components/UpdateForm';

/**
 * 添加
 * @param fields
 */
const handleCreate = async (fields: UserListItem) => {
  const hide = message.loading('正在添加');
  const avatar = (fields.avatar as unknown as UploadFile[]) || [];
  try {
    await createUser({ ...fields, avatar: avatar[0]?.response?.url });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: UserListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateUser({
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 查看
 * @param record
 */
const handleShow = async (record: UserListItem) => {
  const hide = message.loading('正在加载数据');
  try {
    const { data } = await showUser({ id: record.id });
    hide();
    message.success('加载成功');
    return data;
  } catch (error) {
    hide();
    message.error('加载失败请重试！');
    return false;
  }
};

/**
 * 删除
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const Page: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [showModalVisible, setShowModalVisible] = useState<boolean>(false);
  const [currentFormValues, setCurrentFormValues] = useState({});

  const actionRef = useRef<ActionType>();
  const creatFormRef = useRef<FormInstance>();
  const updateFormRef = useRef<FormInstance>();

  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  // 预先加载权限选择器数据
  const {
    data: permissionData,
    loading: permissionLoading,
    error: permissionError,
  } = useRequest(() => {
    return queryPermission({ pageSize: 1000 });
  });

  // 预先加载角色选择器数据
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useRequest(() => {
    return queryRole({ pageSize: 1000 });
  });

  const intl = useIntl();

  const columns: ProColumns<ConfigListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      fixed: 'left',
      width: 80,
    },
    {
      title: '参数名称',
      dataIndex: 'name',
      width: 50,
    },
    {
      title: '参数键名',
      dataIndex: 'key',
      width: 50,
    },
    {
      title: '参数键值',
      dataIndex: 'value',
      width: 50,
    },
    {
      title: '系统内置',
      dataIndex: 'type',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              // 编辑前去服务端获取最新的数据
              const success = await handleShow(record);
              if (success) {
                setUpdateModalVisible(true);
                setCurrentFormValues(Object.assign(record, success));
              }
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除该数据吗?"
            placement="left"
            onConfirm={async () => {
              // 不论是否删除成功，都重新加载列表数据
              await handleRemove([record]);
              actionRef?.current?.reload();
            }}
            style={{ width: 220 }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" key="primary" onClick={() => setCreateModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown.Button
              menu={{
                items: [
                  {
                    label: '批量删除',
                    key: '0',
                  },
                ],
                onClick: async (e) => {
                  if (e.key === 'remove') {
                    await handleRemove(selectedRows);
                    action.reload();
                  }
                },
              }}
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown.Button>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={queryConfig}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            // setSelectedRows(selectedRows);
          },
        }}
      />

      {/* 创建 */}
      {createModalVisible ? (
        <CreateForm
          onCancel={() => setCreateModalVisible(false)}
          createModalVisible={createModalVisible}
        >
          <ProTable<UserListItem, UserListItem>
            formRef={creatFormRef}
            onSubmit={async (values) => {
              const success = await handleCreate(values);
              if (success) {
                setCreateModalVisible(false);
                actionRef.current?.reload();
              }
            }}
            rowKey="id"
            type="form"
            form={{
              layout: 'horizontal',
              labelCol: { span: 5 },
              wrapperCol: { span: 19 },
            }}
            columns={columns}
            rowSelection={{}}
          />
        </CreateForm>
      ) : null}

      {/* 更新 */}
      {updateModalVisible && Object.keys(currentFormValues).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateModalVisible(false);
            setCurrentFormValues({});
          }}
          updateModalVisible={updateModalVisible}
        >
          <ProTable<UserListItem, UserListItem>
            formRef={updateFormRef}
            onSubmit={async (values) => {
              const success = await handleUpdate({
                ...values,
                id: (currentFormValues as UserListItem).id,
              });
              if (success) {
                setUpdateModalVisible(false);
                setCurrentFormValues({});
                actionRef.current?.reload();
              }
            }}
            rowKey="id"
            type="form"
            form={{
              layout: 'horizontal',
              labelCol: { span: 5 },
              wrapperCol: { span: 19 },
              initialValues: {
                ...currentFormValues,
                permissions: (currentFormValues as UserListItem).permissions?.map((row) => row.id),
                roles: (currentFormValues as UserListItem).roles?.map((row) => row.id),
              },
            }}
            columns={columns}
            rowSelection={{}}
          />
        </UpdateForm>
      ) : null}

      {/* 详情 */}
      {currentFormValues && Object.keys(currentFormValues).length ? (
        <ShowForm
          onCancel={() => {
            setShowModalVisible(false);
            setCurrentFormValues({});
          }}
          showModalVisible={showModalVisible}
          values={currentFormValues}
          columns={columns}
        />
      ) : null}
    </PageContainer>
  );
};

export default Page;
