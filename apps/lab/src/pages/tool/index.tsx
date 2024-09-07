import { Container } from '@/components/common'
import { RiAppleFill, RiStockLine } from 'react-icons/ri'
import { IconType } from 'react-icons'
import { RxAvatar } from 'react-icons/rx'
import { RiLinksLine } from 'react-icons/ri'
import { useTranslation } from '@/i18n'

const ToolCard: React.FC<{
  title: string
  Icon?: IconType
  index: number
  desc: string
  href: string
}> = ({ title, href, index, desc, Icon }) => {
  return (
    <div
      className="flex-1 rounded-md border bg-white px-5 py-4"
      style={{
        boxShadow:
          '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'justify',
        lineHeight: ' 22px',
      }}
    >
      <div className="flex items-center gap-1">
        <div className="h-12 w-12 px-4 pb-3 pt-2 text-center font-bold text-black">
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

const Tool = (props) => {
  const { t } = useTranslation()

  const toolData = [
    {
      title: '',
    },
  ]

  return (
    <Container>
      <div className="w-full pt-3">
        <div className="grid grid-cols-4 gap-4">
          <ToolCard
            Icon={RiStockLine}
            index={2}
            href="/tool/etf-grid"
            title="ETF 网格"
            desc="ETF 网格是一个用来辅助基金投资决策的工具。"
          />
          <ToolCard
            Icon={RiAppleFill}
            index={2}
            href="/tool/apple-guide"
            title="苹果设备购买指南"
            desc="精准推荐，全面分析，帮你挑选最适合的iPhone或其他苹果设备，决策无忧。"
          />
          <ToolCard
            index={1}
            Icon={RxAvatar}
            href="/links"
            title="网址导航"
            desc="简洁导航，一键直达热门网站，省时省心，轻松畅游互联网世界。"
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="https://umijs.org/docs/introduce/introduce"
            title="节日头像制作"
            desc="节日头像制作，国庆节、圣诞节、春节头像。"
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/category"
            title="分类导航"
            desc="行业分类导航"
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/tool/timestamp/timestamp"
            title="时间戳工具"
            desc=""
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/tool/book-thickness"
            title="计算书本厚度"
            desc=""
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/logo-surf"
            title={t('Favicon 生成器')}
            desc=""
          />
        </div>
      </div>

      <div className="w-full pt-3">
        <div>{t('开发中')}</div>
        <div className="grid grid-cols-4 gap-4">
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/category"
            title="Retro Card Generator"
            desc="行业分类导航"
          />
        </div>
      </div>

      <div className="w-full pt-3">
        <div>{t('待开发')}</div>
        <div className="grid grid-cols-4 gap-4">
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/category"
            title="Retro Card Generator"
            desc="行业分类导航"
          />
        </div>
      </div>
    </Container>
  )
}

export default Tool
