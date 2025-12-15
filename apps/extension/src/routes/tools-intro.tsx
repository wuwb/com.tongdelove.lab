import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'

export const Route = createFileRoute('/tools-intro')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthenticatedLayout>
      <div>
        调价助手 报名活动助手PLUS（一键报所有） 活动报名助手（报单个活动） 批量更新商品合规信息 批量复制商品ID
        批量下架商品 批量发布商品到站点 批量退出活动 批量设置库存助手 批量设置零售价助手 批量开通JIT 全托备货单导出
        全托快递单号导出 检测结果明细导出 全托退货明细导出 全托商品销量导出 半托退货/退货订单导出 半托订单导出
        全托评价导出 全托首单导出 批量价格刷新 属性修改助手 商品广告助手 敏感词检测 全托计算配货单件数
      </div>
    </AuthenticatedLayout>
  )
}
