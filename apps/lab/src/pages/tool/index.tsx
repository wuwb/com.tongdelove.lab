import { Container } from '@/components/common'
import { RiAppleFill, RiStockLine } from "react-icons/ri"
import { IconType } from 'react-icons'
import { RxAvatar } from "react-icons/rx"

const ToolCard: React.FC<{
  title: string
  Icon?: IconType
  index: number
  desc: string
  href: string
}> = ({ title, href, index, desc, Icon }) => {
  return (
    <div
      className="border"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'justify',
        lineHeight: ' 22px',
        padding: '16px 19px',
        flex: 1,
      }}
    >
      <div
        className="flex items-center gap-1"
      >
        <div
          className="text-center pt-2 px-4 pb-3 text-black h-12 w-12 font-bold"
        >
          {Icon && <Icon size={30} />}
        </div>
        <div
          className="pb-2"
          style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.65)',
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href}>了解更多 {'>'}</a>
    </div>
  )
}

const ToolPage = props => {
  return (
    <Container>
      <div className="w-full pt-3">
        <div className="flex gap-4">
          <ToolCard
            Icon={RiStockLine}
            index={2} href="/tool/etf-grid" title="ETF 网格" desc="ETF 网格是一个用来辅助基金投资决策的工具" />
          <ToolCard
            Icon={RiAppleFill}
            index={2} href="/tool/apple-guide" title="苹果设备购买指南" desc="精准推荐，全面分析，帮你挑选最适合的iPhone或其他苹果设备，决策无忧。" />
          <ToolCard
            index={1}
            Icon={RxAvatar}
            href="https://umijs.org/docs/introduce/introduce"
            title="节日头像制作"
            desc="节日头像制作，国庆节、圣诞节、春节头像"
          />
        </div>
      </div>
    </Container>
  )
}

export default ToolPage
