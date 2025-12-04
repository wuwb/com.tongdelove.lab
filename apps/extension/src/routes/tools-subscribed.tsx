import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'

export const Route = createFileRoute('/tools-subscribed')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthenticatedLayout>
      <div>
        会员店铺
        套餐会员
        开通会员的店铺包含全部数据服务和工具服务！！
        店铺ID
        店铺名称
        备注
        发货单列表
        履约中心
        Seller Central
        Q
        已开通的工具
        店铺状态
        订阅类型
        No data
        kuajing-help.com
        通过底部插件使用调
        1.9.17 - 待測試列表✕＋
        之
        运营对接
        dc）客服
        百反馈
        99+
        •
        Xiaosu Twine Works...
        の人半许
        山学习
        商家交流群
        •
        商家
        助手
        刷新
        近一次数据更新时间
      </div>
    </AuthenticatedLayout>
  )
}
