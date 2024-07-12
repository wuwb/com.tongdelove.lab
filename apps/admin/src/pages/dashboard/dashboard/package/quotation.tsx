import { AccentSidebarLayout } from '@/components/layouts'
import { Button, Divider } from '@/components/ui'
import { FC } from 'react'

const DashboardPage: FC = () => {
  return (
    <>
      <div className="action-bar">
        <Button>下载</Button>
        <Button>打印</Button>
        <Button>分享</Button>
      </div>

      <div className="bg-white p-10">
        <div className="flex justify-between">
          <span className="text-lg font-bold">四川博通塑料制品有限公司</span>
          <span className="text-lg">报价单 Quote</span>
        </div>
        <div className="flex">
          <div>
            <div>电话：18875836702</div>
            <div>邮箱：</div>
            <div>地址：四川省成都市</div>
            <div>网址：https://printlake.com</div>
          </div>
          <div>
            <div>Invoice #</div>
            <div>Invoice Date</div>
            <div>P.O.#</div>
            <div>Due Date</div>
          </div>
        </div>
        <Divider />
        <div className="flex">
          {/* 买家信息 */}
          <div>
            <div>Bill To</div>
            <div>Company Name Customer Name Address Phone#</div>
            <div>Sales Person P.O Number Date</div>
          </div>
          <div>
            <div>Ship To</div>
            <div>Company Name Customer Name Address Phone#</div>
            <div>Company ID Phone# TERMS Due on Receipt</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>项目 Item</th>
              <th>描述 Description</th>
              <th>单位 Unit</th>
              <th>数量 Quantity</th>
              <th>单价 Unit Price</th>
              <th>总价 Amount</th>
              <th>备注 Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>7号餐盒</td>
              <td></td>
              <td>个</td>
              <td>0.95</td>
              <td>56000</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>标题</th>
              <th>描述</th>
              <th>单位</th>
              <th>数量</th>
              <th>单价</th>
              <th>总价</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div>
          <div>
            <div>条款和条例</div>
            <div>付款方式</div>
          </div>
          <div>
            <div>小计</div>
            <div>增值税</div>
            <div>折扣</div>
            <div>合计</div>
          </div>
        </div>
      </div>
    </>
  )
}

const DashboardWrapper = () => {
  return (
    <>
      <DashboardPage />
    </>
  )
}

DashboardWrapper.getLayout = (page) => (
  // <Authenticated>
  <AccentSidebarLayout>{page}</AccentSidebarLayout>
  // </Authenticated>
)

export default DashboardWrapper
