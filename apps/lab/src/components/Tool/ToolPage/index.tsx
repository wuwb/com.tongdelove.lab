import { RiAppleFill, RiStockLine, RiLinksLine } from 'react-icons/ri'
import { RxAvatar } from 'react-icons/rx'
import { useTranslation } from '@/i18n'
import { ToolCard } from './ToolCard'

export const ToolPage = () => {
  const { t } = useTranslation()

  return (
    <div>
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
            href="/logo-gen"
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
    </div>
  )
}
