import { PageContainer } from '@ant-design/pro-components'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { useRequest } from '@umijs/max'
import { Button, Space, message } from 'antd'
import React, { useRef } from 'react'
import ImportTabaoCSV from './ImportTaobaoCsv'
import { TableListItem } from './data'
import { queryData, syncById, syncData } from './service'

const TableList: React.FC = () => {
  const { loading, run } = useRequest(syncData, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`清洗成功`)
      }
    },
  })

  const onSyncData = async (id: string | null) => {
    const hide = message.loading('正在清洗')

    try {
      if (!id) {
        await run()
      } else {
        await syncById({
          id,
        })
      }
      hide()
      message.success('清洗成功，即将刷新')
      return true
    } catch (error) {
      hide()
      message.error('清洗失败，请重试')
      return false
    }
  }

  const actionRef = useRef<ActionType>()

  // 表格列设置
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
      hideInForm: true,
    },
    {
      title: '货款',
      sorter: true,
      dataIndex: 'tradePayable',
      hideInSearch: false,
    },
    {
      title: '邮费',
      sorter: true,
      dataIndex: 'postage',
      hideInSearch: false,
    },
    {
      title: '积分',
      sorter: true,
      dataIndex: 'integration',
      hideInSearch: false,
    },
    {
      title: '总金额',
      dataIndex: 'total',
    },
    {
      title: '返点积分',
      dataIndex: 'rebateIntegration',
      hideInSearch: false,
    },
    {
      title: '实付金额',
      dataIndex: 'realTotal',
    },
    {
      title: '实付积分',
      dataIndex: 'realIntegration',
      hideInSearch: false,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        交易成功: { text: '成功', status: 'Success' },
        交易关闭: {
          text: '关闭',
          status: 'Error',
        },
      },
    },
    {
      title: '买家留言',
      dataIndex: 'message',
      ellipsis: true,
      copyable: true,
      hideInSearch: false,
    },
    {
      title: '创建时间',
      dataIndex: 'orderCreatedAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '付款时间',
      dataIndex: 'payAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '订单备注',
      dataIndex: 'orderNote',
      ellipsis: true,
      copyable: true,
      hideInSearch: false,
    },
    {
      title: '收货时间',
      dataIndex: 'confirmReceiptAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '打款金额',
      dataIndex: 'remitNum',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <a
            onClick={() => {
              onSyncData(record.id)
            }}
          >
            清洗
          </a>
          <a onClick={() => {}}>归档</a>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer>
      <ProTable
        pagination={{
          showQuickJumper: true,
        }}
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        request={(params, sorter, filter) => {
          if (filter.status === null) {
            delete filter.status
          }
          return queryData({ ...params, sorter, filter })
        }}
        columns={columns}
        size="small"
        scroll={{
          x: true,
        }}
        options={{
          density: false,
          fullScreen: true,
          setting: true,
        }}
        toolBarRender={() => [
          <ImportTabaoCSV key="import" />,
          <Button key="button" type="primary" onClick={() => run()}>
            清洗所有
          </Button>,
        ]}
        expandable={{
          expandedRowRender: (record: any) => (
            <div key={record.taobaoId}>
              <div>
                <div>店铺信息</div>
                <div>
                  店铺编号：{record.taobaoId}
                  店铺名称：{record.taobaoName}
                  商品名称：{record.taobaoTitle}
                  商品种类：{record.taobaoType}
                  商品数量：{record.taobaoNum}
                </div>
              </div>
              <div>
                <div>配送信息</div>
                <div>
                  配送方式：{record.shippingMethod}
                  物流单号：{record.shippingId}
                  物流公司：{record.shippingCompany}
                </div>
              </div>
              <div>
                <div>收货信息</div>
                <div>
                  姓名：{record.clientName}
                  地址：{record.address}
                  电话：{record.contact}
                  手机：{record.phone}
                  淘宝号：{record.clientTaobao}
                  支付宝：{record.clientAlipay}
                </div>
              </div>
            </div>
          ),
        }}
      />
    </PageContainer>
  )
}

export default TableList
