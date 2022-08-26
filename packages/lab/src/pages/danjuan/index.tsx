import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Items from './data';

// https://danjuanapp.com/djapi/fund/order/

export default function DenseTable() {

    Items.map(item => {
        if (item.status_desc === '交易失败') {
            return false;
        }

        return item;
    })

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>名称</TableCell>
                        <TableCell>code</TableCell>
                        <TableCell>plan_code</TableCell>
                        <TableCell>ttype</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell>操作</TableCell>
                        <TableCell>volume</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell>操作</TableCell>
                        <TableCell>时间</TableCell>
                        <TableCell>title</TableCell>
                        <TableCell>value</TableCell>
                        <TableCell>convert</TableCell>
                        <TableCell>jjt</TableCell>
                        <TableCell>plan2_ic</TableCell>
                        <TableCell>ia</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Items.map((row) => (
                        <TableRow
                            key={row.order_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell>{row.code}</TableCell>
                            <TableCell>{row.plan_code}</TableCell>
                            <TableCell>{row.ttype === 'plan' ? '计划' : ''}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.action}</TableCell>
                            <TableCell>{row.volume}</TableCell>
                            <TableCell>{row.status_desc}</TableCell>
                            <TableCell>{row.action_desc}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.value_desc}</TableCell>
                            <TableCell>{row.convert}</TableCell>
                            <TableCell>{row.jjt}</TableCell>
                            <TableCell>{row.plan2_ic}</TableCell>
                            <TableCell>{row.ia}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
