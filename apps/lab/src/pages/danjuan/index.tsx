import * as React from 'react'
import { Table, TableTr, TableTd, TableTh, TableThead, TableTbody } from '@mantine/core'

import { data } from './data'

// https://danjuanapp.com/djapi/fund/order/
export default function DenseTable() {
  const Items = data.map(item => {
    if (item.status_desc === '交易失败') {
      return false
    }
    return item
  })

  return (
    <div>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>名称</TableTh>
            <TableTh>code</TableTh>
            <TableTh>plan_code</TableTh>
            <TableTh>ttype</TableTh>
            <TableTh>状态</TableTh>
            <TableTh>操作</TableTh>
            <TableTh>volume</TableTh>
            <TableTh>状态</TableTh>
            <TableTh>操作</TableTh>
            <TableTh>时间</TableTh>
            <TableTh>title</TableTh>
            <TableTh>value</TableTh>
            <TableTh>convert</TableTh>
            <TableTh>jjt</TableTh>
            <TableTh>plan2_ic</TableTh>
            <TableTh>ia</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {Items.map((row: any) => (
            <TableTr key={row.order_id}>
              <TableTh>{row.name}</TableTh>
              <TableTh>{row.code}</TableTh>
              <TableTh>{row.plan_code}</TableTh>
              <TableTh>{row.ttype === 'plan' ? '计划' : ''}</TableTh>
              <TableTh>{row.status}</TableTh>
              <TableTh>{row.action}</TableTh>
              <TableTh>{row.volume}</TableTh>
              <TableTh>{row.status_desc}</TableTh>
              <TableTh>{row.action_desc}</TableTh>
              <TableTh>{row.created_at}</TableTh>
              <TableTh>{row.title}</TableTh>
              <TableTh>{row.value_desc}</TableTh>
              <TableTh>{row.convert}</TableTh>
              <TableTh>{row.jjt}</TableTh>
              <TableTh>{row.plan2_ic}</TableTh>
              <TableTh>{row.ia}</TableTh>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  )
}
