import { useCallback, useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PageContainer } from '@ant-design/pro-components'
import { useNavigate } from '@umijs/max'
import {
  listGridPlan,
  removeGridPlan,
  type GridPlanItem,
} from '@/services/etf/gridPlan'

export default function GridPlanListPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<GridPlanItem[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const fetchList = useCallback(async () => {
    setLoading(true)
    try {
      const result = await listGridPlan({ page: current, pageSize })
      setData(result.data)
      setTotal(result.count)
    } catch (e) {
      console.error('[GridPlanList]', e)
      message.error('加载方案列表失败')
    } finally {
      setLoading(false)
    }
  }, [current, pageSize])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const handleDelete = async (id: string) => {
    try {
      await removeGridPlan({ id })
      message.success('已删除')
      fetchList()
    } catch (e) {
      console.error('[GridPlanList] delete', e)
      message.error('删除失败')
    }
  }

  const openPlan = (id: string) => {
    navigate(`/etf/grid-strategy?planId=${id}`)
  }

  const columns: ColumnsType<GridPlanItem> = [
    {
      title: '方案名称',
      dataIndex: 'name',
      render: (name: string, record) => (
        <a onClick={() => openPlan(record.id)}>{name}</a>
      ),
    },
    {
      title: '关联基金',
      render: (_, record) =>
        record.fundName
          ? `${record.fundName}${record.fundCode ? `（${record.fundCode}）` : ''}`
          : '—',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <a onClick={() => openPlan(record.id)}>查看</a>
          <Popconfirm
            title="确认删除该方案？"
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="网格交易方案"
      extra={[
        <Button
          key="create"
          type="primary"
          onClick={() => navigate('/etf/grid-strategy')}
        >
          新建方案
        </Button>,
      ]}
    >
      <Table<GridPlanItem>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrent(page)
            setPageSize(size)
          },
        }}
      />
    </PageContainer>
  )
}
