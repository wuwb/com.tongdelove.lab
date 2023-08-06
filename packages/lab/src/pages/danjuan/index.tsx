import * as React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import {data} from './data';

// https://danjuanapp.com/djapi/fund/order/

export default function DenseTable() {

    let Items  = data.map(item => {
        if (item.status_desc === '交易失败') {
            return false;
        }
        return item;
    })

    return (
        <div>
            <Table size="small">
                <Thead>
                    <Tr>
                        <Th>名称</Th>
                        <Th>code</Th>
                        <Th>plan_code</Th>
                        <Th>ttype</Th>
                        <Th>状态</Th>
                        <Th>操作</Th>
                        <Th>volume</Th>
                        <Th>状态</Th>
                        <Th>操作</Th>
                        <Th>时间</Th>
                        <Th>title</Th>
                        <Th>value</Th>
                        <Th>convert</Th>
                        <Th>jjt</Th>
                        <Th>plan2_ic</Th>
                        <Th>ia</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Items.map((row: any) => (
                        <Tr
                            key={row.order_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <Th>{row.name}</Th>
                            <Th>{row.code}</Th>
                            <Th>{row.plan_code}</Th>
                            <Th>{row.ttype === 'plan' ? '计划' : ''}</Th>
                            <Th>{row.status}</Th>
                            <Th>{row.action}</Th>
                            <Th>{row.volume}</Th>
                            <Th>{row.status_desc}</Th>
                            <Th>{row.action_desc}</Th>
                            <Th>{row.created_at}</Th>
                            <Th>{row.title}</Th>
                            <Th>{row.value_desc}</Th>
                            <Th>{row.convert}</Th>
                            <Th>{row.jjt}</Th>
                            <Th>{row.plan2_ic}</Th>
                            <Th>{row.ia}</Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
}
