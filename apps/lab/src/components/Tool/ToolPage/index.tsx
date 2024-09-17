import { RiAppleFill, RiStockLine, RiLinksLine } from 'react-icons/ri'
import { RxAvatar } from 'react-icons/rx'
import { useTranslation } from '@/i18n'
import { ToolCard } from './ToolCard'

export const ToolPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="w-full pt-3">
        <h3 className="flex-center py-10 text-4xl">{t('小工具')}</h3>
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
            href="/sticker"
            title={t('贴纸生成器')}
            desc={t(
              '使用我们的贴纸生成器，轻松创建独特、个性化的贴纸。只需输入简单描述，即可生成各种风格的可爱贴纸。适用于社交媒体、个人收藏或商业用途。让您的创意瞬间变为现实！'
            )}
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/logo-gen"
            title={t('Favicon 生成器')}
            desc={t(
              '用我们的LOGO和Favicon生成器，轻松创建专业、独特的品牌标识。只需输入您的品牌名称和配置，即可生成多种尺寸的LOGO和Favicon。适用于网站、应用程序等多种场景。让您的品牌在竞争中脱颖而出，留下深刻印象！'
            )}
          />
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/tool/color"
            title={t('中国传统色')}
            desc={t(
              '这里汇聚了丰富多彩的中国传统色彩。我们提供详细的色彩信息、历史背景及其在艺术和设计中的应用，帮助您深入了解这些富有文化底蕴的色彩。无论您是设计师、艺术爱好者，还是对中国文化感兴趣的朋友，都能在这里找到灵感和创作素材。探索传统色彩的魅力，感受中华文化的独特韵味！'
            )}
          />
        </div>
      </div>
      <div className="w-full pt-3">
        <h3 className="flex-center py-10 text-4xl">{t('开发中')}</h3>
        <div className="grid grid-cols-4 gap-4">
          <ToolCard
            index={1}
            Icon={RiLinksLine}
            href="/category"
            title={t('Retro Card Generator')}
            desc={t(
              '我们提供一个简单易用的平台，让您轻松创建复古风格的贺卡和卡片。选择您喜欢的模板、图案和字体，尽情发挥创意，制作出独一无二的个性化卡片。无论是生日、节日还是特别的场合，我们的工具都能帮助您传达祝福与情感。立即开始创建，享受复古设计的乐趣！'
            )}
          />
        </div>
      </div>
    </div>
  )
}
