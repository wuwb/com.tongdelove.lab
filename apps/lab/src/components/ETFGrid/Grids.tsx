import { useGrids, GearType, toFixedString } from '@/hooks/useGrids'
import { Download } from './Download'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from '@tongdelove/ui/table'

export function Grids() {
  const grids = useGrids()
  const total = grids.reduce(
    (prev, grid) => {
      return {
        buyAmount: prev.buyAmount + grid.buyAmount,
        profits: prev.profits + grid.profits,
        retainedProfits: prev.retainedProfits + grid.retainedProfits,
      }
    },
    { buyAmount: 0, profits: 0, retainedProfits: 0 }
  )

  const totalBuyAmount = total.buyAmount
  const totalProfits = total.profits + total.retainedProfits

  return (
    <div>
      <Download />
      <Table id="table-list">
        <TableCaption>操作示意表</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>序号</TableHead>
            <TableHead>种类</TableHead>
            <TableHead>档位</TableHead>
            <TableHead>买入价格</TableHead>
            <TableHead>买入数量</TableHead>
            <TableHead>买入金额</TableHead>
            <TableHead>卖出价格</TableHead>
            <TableHead>卖出数量</TableHead>
            <TableHead>卖出金额</TableHead>
            <TableHead>盈利金额</TableHead>
            <TableHead>盈利比例</TableHead>
            <TableHead>
              本期
              <br />
              留存利润
            </TableHead>
            <TableHead>
              本期
              <br />
              留存数量
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grids.map((grid, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{grid.type}</TableCell>
                <TableCell>{toFixedString(grid.gear)}</TableCell>
                <TableCell>{toFixedString(grid.buyPrice)}</TableCell>
                <TableCell>{toFixedString(grid.buyCount, 0)}</TableCell>
                <TableCell>{toFixedString(grid.buyAmount, 0)}</TableCell>
                <TableCell>{toFixedString(grid.sellPrice)}</TableCell>
                <TableCell>{toFixedString(grid.sellCount, 0)}</TableCell>
                <TableCell>{toFixedString(grid.sellAmount, 0)}</TableCell>
                <TableCell>{toFixedString(grid.profits, 0)}</TableCell>
                <TableCell>{grid.returnRate}</TableCell>
                <TableCell>{toFixedString(grid.retainedProfits, 0)}</TableCell>
                <TableCell>{toFixedString(grid.retainedCount, 0)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>总计</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell>{toFixedString(totalBuyAmount, 0)}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell>{toFixedString(totalProfits, 0)}</TableCell>
            <TableCell>
              {toFixedString((totalProfits / totalBuyAmount) * 100, 2)}%
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
      <div>
        <p>说明：</p>
        <ol>
          <li>1. 本表格统一设定最大跌幅为60%。</li>
          <li>
            2. 场内基金必须按100份整数委托，因此买卖金额按实际委托份数进行修正。
          </li>
          <li>3.https://github.com/hushicai/ETF</li>
        </ol>
      </div>
    </div>
  )
}
