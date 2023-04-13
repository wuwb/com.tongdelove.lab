import { Button, Divider, message, Input, Drawer, Space, Popconfirm, Card, Row, Col } from 'antd';
import React, { useState, useRef, FC } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-components';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { create, remove, update, list, get } from './service';
import styles from './style.less';

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const TableList: React.FC<{}> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [total, setTotal] = useState(0);
  const actionRef = useRef<ActionType>();

  const handleConfirm = async (id) => {
    await remove(id);
    message.success('删除成功。');
    actionRef.current?.reload();
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '客户名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '淘宝',
      dataIndex: 'taobao',
    },
    {
      title: '支付宝',
      dataIndex: 'alipay',
    },
    {
      title: '电话',
      sorter: true,
      dataIndex: 'contact',
    },
    {
      title: '手机',
      sorter: true,
      dataIndex: 'phone',
    },
    {
      title: '国家',
      dataIndex: 'country',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '省份',
      sorter: true,
      dataIndex: 'province',
    },
    {
      title: '城市',
      sorter: true,
      dataIndex: 'city',
    },
    {
      title: '区县',
      sorter: true,
      dataIndex: 'district',
    },
    {
      title: '街道',
      dataIndex: 'street',
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '坐标',
      dataIndex: 'location',
      hideInSearch: true,
      render: (_, record) => {
        return record.location.replace(',', '\n');
      },
    },
    {
      title: '上次送货时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => { }}>转存公司</a>
            <a href="">清洗</a>
            <a href="">打标签</a>
            <Popconfirm
              title="确认删除吗?"
              onConfirm={() => handleConfirm(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <Info title="我的客户" value={`${total}个客户`} bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="本周任务平均处理时间" value="32分钟" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="本周完成任务数" value="24个任务" />
          </Col>
        </Row>
      </Card>

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
        toolBarRender={() => [
          <CreateForm />,
        ]}
        request={async (params, sorter, filter) => {
          const result = await list({ ...params, sorter, filter });
          setTotal(result.total);
          return {
            data: result.data,
            success: true,
          }
        }}
        columns={columns}
      />

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
