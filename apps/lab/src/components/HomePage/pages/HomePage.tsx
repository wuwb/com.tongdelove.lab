import { CtaBlock, HeroBlock } from '../blocks'
import { useTranslation } from '@/i18n'
import { Faq } from '@/components/Faq/Faq'
import Generator from '@/components/StickerPage/generator'
import { trpc } from '@/utils/trpc'
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { toast } from 'sonner'

export const HomePage = () => {
  const { t } = useTranslation()

  const faqData = [
    {
      question: t('如何开始定制不干胶贴纸？'),
      answer: t('您可以通过配置生成器参数，点击生成贴纸按钮生成贴纸，然后联系客付款。如果您需要帮助，可以联系客户服务。')
    },
    {
      question: t('我可以提供自己的设计吗？'),
      answer: t('当然可以。大多数网站支持多种文件格式，如PDF、JPEG、PNG或矢量文件（如AI或EPS）。请确保您的设计是高分辨率的，以避免印刷模糊。')
    },
    {
      question: t('有哪些材料可供选择？'),
      answer: t('常见的材料包括纸质不干胶、PVC、珠光合成纸等。每种材料都有不同的特性和应用场景，请根据您的需求选择合适的材料。有需求的话都可以联系客服对接，默认我们按常规不干胶材质打印。')
    },
    {
      question: t('不干胶贴纸的价格是如何确定的？'),
      answer: t('价格通常取决于尺寸、数量、材料、印刷颜色以及是否需要特殊处理等因素。大多数网站提供在线报价工具，您可以输入具体需求获得估算价格。少量打印的话按固定价格收取费用。')
    },
    {
      question: t('最小起订量是多少？'),
      answer: t('普通打印无起订量要求。商用一般500份起订，价格会合适一些。')
    },
    {
      question: t('交货时间是多久？'),
      answer: t('交货时间取决于订单的复杂程度和数量。一般情况下，下单后当日或者次日打印并发货。')
    },
    {
      question: t('如果我对成品不满意怎么办？'),
      answer: t('很多公司提供质量保证，如果成品与您的预期不符，您可以联系客服寻求解决方案，如重新印刷或退款。')
    },
    {
      question: t('支持哪些付款方式？'),
      answer: t('支持现金交易。可以微信，支付宝转账，或者淘宝，面包多下单。')
    },
    {
      question: t('如何追踪我的订单状态？'),
      answer: t('目前还未完善订单系统，交付运单号后，如果还有追踪订单状态需求，可以联系客服。')
    },
    {
      question: t('关于生成图案的版权'),
      answer: t('生成图片版权归平台所有。下单印刷后，自动获取图案版权。')
    },
  ]

  return (
    <>
      {/* <Banner /> */}
      {/* <HeroBlock /> */}
      {/* <FeaturesBlock /> */}
      {/* <CtaBlock /> */}
      <Generator />
      <Faq data={faqData} />
    </>
  )
}
