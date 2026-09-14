import { PageContainer } from '@ant-design/pro-components'
import EtfStrategy from './EtfStrategy'

export default function EtfPage() {
  return (
    <PageContainer
      title="网格交易策略"
      extra={[
        <a
          key="source"
          href="https://github.com/hushicai/etf"
          target="_blank"
          rel="noreferrer"
        >
          查看源码
        </a>,
      ]}
    >
      <EtfStrategy />
    </PageContainer>
  )
}
