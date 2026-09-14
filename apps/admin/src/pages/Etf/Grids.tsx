import React, { lazy, Suspense } from 'react'
import {
  GearType,
  MAX_GRID_COUNT,
  toFixedString,
  useGrids,
} from './hooks/useGrids'
import { useStyles } from './styles'

const LazyDownload = lazy(() => import('./Download'))

const gridClassName: Record<
  GearType,
  'smallGrid' | 'middleGrid' | 'bigGrid'
> = {
  [GearType.small]: 'smallGrid',
  [GearType.middle]: 'middleGrid',
  [GearType.big]: 'bigGrid',
}

export function Grids() {
  const { styles, cx } = useStyles()
  const grids = useGrids()
  const total = grids.reduce(
    (prev, grid) => {
      return {
        buyAmount: prev.buyAmount + grid.buyAmount,
        profits: prev.profits + grid.profits,
        retainedProfits: prev.retainedProfits + grid.retainedProfits,
      }
    },
    { buyAmount: 0, profits: 0, retainedProfits: 0 },
  )

  const totalBuyAmount = total.buyAmount
  const totalProfits = total.profits + total.retainedProfits
  const totalReturnRate = totalBuyAmount
    ? toFixedString((totalProfits / totalBuyAmount) * 100, 2)
    : '0.00'

  return (
    <div className={styles.tableContainer}>
      <p className={styles.title}>
        <span>操作示意表</span>
        <Suspense fallback={null}>
          <LazyDownload />
        </Suspense>
      </p>
      <div className={styles.content}>
        <table id="table-list" className={styles.table}>
          <thead>
            <tr>
              <th className={styles.theadCell}>序号</th>
              <th className={styles.theadCell}>种类</th>
              <th className={styles.theadCell}>档位</th>
              <th className={styles.theadCell}>买入价格</th>
              <th className={styles.theadCell}>买入数量</th>
              <th className={styles.theadCell}>买入金额</th>
              <th className={styles.theadCell}>卖出价格</th>
              <th className={styles.theadCell}>卖出数量</th>
              <th className={styles.theadCell}>卖出金额</th>
              <th className={styles.theadCell}>盈利金额</th>
              <th className={styles.theadCell}>盈利比例</th>
              <th className={styles.theadCell}>
                本期
                <br />
                留存利润
              </th>
              <th className={styles.theadCell}>
                本期
                <br />
                留存数量
              </th>
            </tr>
          </thead>
          <tbody>
            {grids.map((grid, index) => {
              const typeClass = styles[gridClassName[grid.type]]
              return (
                <tr
                  key={index}
                  className={cx(
                    styles.tr,
                    typeClass,
                    index === grids.length - 1 && styles.trLast,
                  )}
                >
                  <td className={styles.tbodyCell}>{index + 1}</td>
                  <td className={styles.tbodyCell}>{grid.type}</td>
                  <td className={styles.tbodyCell}>{toFixedString(grid.gear)}</td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.buyPrice)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.buyCount, 0)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.buyAmount, 0)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.sellPrice)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.sellCount, 0)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.sellAmount, 0)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.profits, 0)}
                  </td>
                  <td className={styles.tbodyCell}>{grid.returnRate}</td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.retainedProfits, 0)}
                  </td>
                  <td className={styles.tbodyCell}>
                    {toFixedString(grid.retainedCount, 0)}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className={styles.tfootCell}>总计</td>
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell}>
                {toFixedString(totalBuyAmount, 0)}
              </td>
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell}>
                {toFixedString(totalProfits, 0)}
              </td>
              <td className={styles.tfootCell}>{totalReturnRate}%</td>
              <td className={styles.tfootCell} />
              <td className={styles.tfootCell} />
            </tr>
          </tfoot>
        </table>
      </div>
      <div className={styles.tip}>
        <p>说明：</p>
        <ol>
          <li>
            1. 场内基金必须按100份整数委托，因此买卖金额按实际委托份数进行修正。
          </li>
          {grids.length >= MAX_GRID_COUNT && (
            <li>2. 档位过小，表格已截断为 {MAX_GRID_COUNT} 行，请调大档位。</li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default Grids
