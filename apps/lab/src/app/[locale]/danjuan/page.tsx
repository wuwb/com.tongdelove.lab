import React from 'react'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
  TableBody,
} from '@tongdelove/ui/components/table'

import { data } from './data'

// https://danjuanapp.com/djapi/fund/order/
export default function DenseTable() {
  const Items = data.map((item) => {
    if (item.status_desc === '交易失败') {
      return false
    }
    return item
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>code</TableHead>
            <TableHead>plan_code</TableHead>
            <TableHead>ttype</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>volume</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>时间</TableHead>
            <TableHead>title</TableHead>
            <TableHead>value</TableHead>
            <TableHead>convert</TableHead>
            <TableHead>jjt</TableHead>
            <TableHead>plan2_ic</TableHead>
            <TableHead>ia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Items.map((row: any) => (
            <TableRow key={row.order_id}>
              <TableHead>{row.name}</TableHead>
              <TableHead>{row.code}</TableHead>
              <TableHead>{row.plan_code}</TableHead>
              <TableHead>{row.ttype === 'plan' ? '计划' : ''}</TableHead>
              <TableHead>{row.status}</TableHead>
              <TableHead>{row.action}</TableHead>
              <TableHead>{row.volume}</TableHead>
              <TableHead>{row.status_desc}</TableHead>
              <TableHead>{row.action_desc}</TableHead>
              <TableHead>{row.created_at}</TableHead>
              <TableHead>{row.title}</TableHead>
              <TableHead>{row.value_desc}</TableHead>
              <TableHead>{row.convert}</TableHead>
              <TableHead>{row.jjt}</TableHead>
              <TableHead>{row.plan2_ic}</TableHead>
              <TableHead>{row.ia}</TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
