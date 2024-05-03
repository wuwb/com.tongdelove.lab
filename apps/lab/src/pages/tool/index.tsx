import Image from 'next/legacy/image'
import { Container } from '@/components/common'
import { ReactNode } from 'react'

const ToolCard: React.FC<{
  title: string
  image?: ReactNode
  index: number
  desc: string
  href: string
}> = ({ title, image, href, index, desc }) => {
  return (
    <div
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
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage: "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index ? image : index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
            paddingBottom: 8,
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
          <ToolCard index={2} href="/etf-grid" title="ETF 网格" desc="ETF 网格是一个用来辅助基金投资决策的工具" />
          <ToolCard index={2} href="/tool/apple-guide" title="苹果购买指南" desc="" />
          <ToolCard
            index={1}
            image={<Image src="/images/placeholder/80x80?text=80x80&fg=666666&bg=cccccc" width="80" height="80" alt="节日头像制作" />}
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
