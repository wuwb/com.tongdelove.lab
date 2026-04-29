import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tongdelove/ui/components/table'
import { Layout } from '@/components/common'

const Home = () => {
  const columns: { title: string; dataIndex: string; key: string }[] = [
    {
      title: '',
      dataIndex: 'condation',
      key: 'condation',
    },
    {
      title: '传统供应商',
      dataIndex: 'other',
      key: 'other',
    },
    {
      title: '我们',
      dataIndex: 'us',
      key: 'us',
    },
  ]

  const networkData = [
    {
      key: '1',
      condation: '工厂审查和积分卡',
      other: '-',
      us: '✓',
    },
    {
      key: '2',
      condation: '标准化的质量控制',
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '透明的价格',
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '中国各个地区的工厂',
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '覆盖所有电商包装类型',
      other: '-',
      us: '✓',
    },
    {
      key: '6',
      condation: '多种付款条款',
      other: '✓',
      us: '✓',
    },
  ]

  const softwarePlatformData = [
    {
      key: '1',
      condation: '规范管理',
      other: '-',
      us: '✓',
    },
    {
      key: '2',
      condation: '无物 ID',
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '采购和报价',
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '采购工作流',
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '过程审批和文档存储',
      other: '-',
      us: '✓',
    },
    {
      key: '6',
      condation: '实时生产跟踪',
      other: '-',
      us: '✓',
    },
    {
      key: '7',
      condation: '实时货运跟踪',
      other: '-',
      us: '✓',
    },
    {
      key: '8',
      condation: '在线支付处理',
      other: '-',
      us: '✓',
    },
    {
      key: '9',
      condation: '数据分析',
      other: '-',
      us: '✓',
    },
  ]

  const expertServicesData = [
    {
      key: '1',
      condation: '专用账户支持',
      other: '✓',
      us: '✓',
    },
    {
      key: '2',
      condation: '规范导入',
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '托管 RFP',
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '账单合并',
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '打样和预生产',
      other: '✓',
      us: '✓',
    },
    {
      key: '6',
      condation: '生产管理',
      other: '✓',
      us: '✓',
    },
    {
      key: '7',
      condation: '货运订舱和物流',
      other: '✓',
      us: '✓',
    },
    {
      key: '8',
      condation: '解决质量问题',
      other: '✓',
      us: '✓',
    },
  ]

  return (
    <div title="价格">
      <div className="container mx-auto">
        <div className="banner py-10 text-center">
          <h1 className="title text-2xl font-bold">
            匹配你的业务需求的定价方案。
          </h1>
          <p className="desc text-md mt-5">
            We believe that a healthy supply chain operates on a foundation of
            trust. That's why our business model is transparent from the ground
            up.
          </p>
          <Button className="mt-10">开始 →</Button>
          <div className="mt-20 grid grid-cols-3 gap-20">
            <div className="col-span-1 px-36">
              Price transparency We do not hide behind opaque margins. Lumi
              shows you the true costs from every manufacturer.
            </div>
            <div className="col-span-1 px-36">
              Save as you scale Pricing scales predictably based on your
              company's packaging usage, so you lower costs as you grow.
            </div>
            <div className="col-span-1 px-20">
              Unbundled costs No recurring fees for non-recurring work. You
              always know exactly what you're paying for.
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h3 className="title text-xl font-bold">半祥包装提供哪些服务?</h3>
              <div className="section mt-5">
                <div className="title mb-2 text-lg">工厂网络</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{columns[0]?.title || ''}</TableHead>
                      <TableHead>{columns[1]?.title || ''}</TableHead>
                      <TableHead className="text-right">
                        {columns[2]?.title || ''}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {networkData.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell>{item.condation}</TableCell>
                        <TableCell>{item.other}</TableCell>
                        <TableCell className="text-right">{item.us}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="section mt-10">
                <div className="title mb-2 text-lg">软件平台</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{columns[0]?.title || ''}</TableHead>
                      <TableHead>{columns[1]?.title || ''}</TableHead>
                      <TableHead className="text-right">
                        {columns[2]?.title || ''}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {softwarePlatformData.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell>{item.condation}</TableCell>
                        <TableCell>{item.other}</TableCell>
                        <TableCell className="text-right">{item.us}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="section mt-10">
                <div className="title mb-2 text-lg">专业服务</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{columns[0]?.title || ''}</TableHead>
                      <TableHead>{columns[1]?.title || ''}</TableHead>
                      <TableHead className="text-right">
                        {columns[2]?.title || ''}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expertServicesData.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell>{item.condation}</TableCell>
                        <TableCell>{item.other}</TableCell>
                        <TableCell className="text-right">{item.us}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="py-32">
              <div className="more-service-1">
                Additional services are available directly in the platform with
                flat rate pricing. <br />
                Packaging engineering Custom dielines ISTA/ASTM testing On-site
                quality control Short run prototyping Factory auditing Learn
                more
              </div>
              <div className="more-service-2 mt-10">
                A network of partners is available to help you integrate Lumi
                into your supply chain. <br />
                Inventory tracking Inventory planning Just-in-time delivery
                ERP/WMS integrations
              </div>
            </div>
          </div>

          <div className="py-36 text-center">
            <p className="text-2xl font-bold">
              来看看半祥包装如何优化你的供应链吧。
            </p>
            <Button className="mt-10">Get started →</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout

export default Home
