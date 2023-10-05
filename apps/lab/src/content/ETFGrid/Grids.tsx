import { useGrids, GearType, toFixedString } from '@/hooks/useGrids';
import LazyDownload from './Download';

import { Title, Table, TableTr, TableThead, TableTbody, TableTfoot } from '@mantine/core'

export function Grids() {
  const grids = useGrids();
  const total = grids.reduce(
    (prev, grid) => {
      return {
        buyAmount: prev.buyAmount + grid.buyAmount,
        profits: prev.profits + grid.profits,
        retainedProfits: prev.retainedProfits + grid.retainedProfits
      };
    },
    { buyAmount: 0, profits: 0, retainedProfits: 0 }
  );

  const totalBuyAmount = total.buyAmount;
  const totalProfits = total.profits + total.retainedProfits;

  return (
    <div>
      <Title>
        <span>操作示意表</span>
        <LazyDownload />
      </Title>
      <Table id="table-list">
        <thead>
          <TableTr>
            <TableThead>序号</TableThead>
            <TableThead>种类</TableThead>
            <TableThead>档位</TableThead>
            <TableThead>买入价格</TableThead>
            <TableThead>买入数量</TableThead>
            <TableThead>买入金额</TableThead>
            <TableThead>卖出价格</TableThead>
            <TableThead>卖出数量</TableThead>
            <TableThead>卖出金额</TableThead>
            <TableThead>盈利金额</TableThead>
            <TableThead>盈利比例</TableThead>
            <TableThead>
              本期
              <br />
              留存利润
            </TableThead>
            <TableThead>
              本期
              <br />
              留存数量
            </TableThead>
          </TableTr>
        </thead>
        <tbody>
          {grids.map((grid, index) => {
            return (
              <div key={index} last={index === grids.length - 1 ? TableTrue : false}>
                <TableTbody>{index + 1}</TableTbody>
                <TableTbody>{grid.type}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.gear)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.buyPrice)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.buyCount, 0)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.buyAmount, 0)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.sellPrice)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.sellCount, 0)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.sellAmount, 0)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.profits, 0)}</TableTbody>
                <TableTbody>{grid.returnRate}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.retainedProfits, 0)}</TableTbody>
                <TableTbody>{toFixedSTableTring(grid.retainedCount, 0)}</TableTbody>
              </div>
            );
          })}
        </tbody>
        <tfoot>
          <TableTr>
            <TableTfoot>总计</TableTfoot>
            <TableTfoot />
            <TableTfoot />
            <TableTfoot />
            <TableTfoot />
            <TableTfoot>{toFixedSTableTring(totalBuyAmount, 0)}</TableTfoot>
            <TableTfoot />
            <TableTfoot />
            <TableTfoot />
            <TableTfoot>{toFixedSTableTring(totalProfits, 0)}</TableTfoot>
            <TableTfoot>
              {toFixedSTableTring((totalProfits / totalBuyAmount) * 100, 2)}%
            </TableTfoot>
            <TableTfoot />
            <TableTfoot />
          </TableTr>
        </tfoot>
      </Table>
      <div>
        <p>说明：</p>
        <ol>
          <li>
            1. 本表格统一设定最大跌幅为60%。
          </li>
          <li>
            2. 场内基金必须按100份整数委托，因此买卖金额按实际委托份数进行修正。
          </li>
          <li>
            3.https://github.com/hushicai/ETF
          </li>
        </ol>
      </div>
    </div>
  );
}
