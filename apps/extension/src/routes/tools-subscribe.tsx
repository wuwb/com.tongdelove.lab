import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'
import { Check } from 'lucide-react' // 可选图标库

export const Route = createFileRoute('/tools-subscribe')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        {/* ==================== 单店铺会员 ==================== */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">单店铺会员</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* 1 个月 */}
            <PackageCard title="1个月店铺会员" price="29.90" original="29.90" perMonth="29.9" />
            {/* 3 个月 */}
            <PackageCard title="3个月店铺会员" price="71.90" original="89.90" perMonth="23.9" />
            {/* 6 个月 */}
            <PackageCard title="6个月店铺会员" price="107.90" original="179.90" perMonth="17.9" />
            {/* 1 年 */}
            <PackageCard title="1年店铺会员" price="139.90" original="358.00" perMonth="11.6" popular />
          </div>
        </section>

        {/* ==================== 多店铺会员 ==================== */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">多店铺会员</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <MultiPackageCard level="初级会员" price="499.00" original="1,194.00" per="8.33" shops={5} />
            <MultiPackageCard level="中级会员" price="899.00" original="2,388.00" per="7.49" shops={10} />
            <MultiPackageCard level="高级会员" price="1,399.00" original="4,776.00" per="5.8" shops={20} />
            <MultiPackageCard level="铂金会员" price="2,999.00" original="11,945.00" per="4.99" shops={50} />
            <MultiPackageCard level="尊享会员" price="4,999.00" original="23,880.00" per="4.1" shops={100} popular />
          </div>
        </section>

        {/* ==================== 单独开通工具 ==================== */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">单独开通工具</h2>

          <form className="space-y-6 max-w-2xl">
            {/* 店铺多选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">开通店铺（可多选）：</label>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-1 text-sm">Xiaosu Twine Workshop X</span>
                </label>
                {/* 更多店铺... */}
              </div>
            </div>

            {/* 开通工具 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">*开通工具：</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>请选择工具</option>
                {/* 动态选项 */}
              </select>
            </div>

            {/* 开通时长 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">*开通时长：</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="12"
              >
                <option value="1">1 个月</option>
                <option value="3">3 个月</option>
                <option value="6">6 个月</option>
                <option value="12">12 个月</option>
              </select>
            </div>

            {/* 联系方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系方式：</label>
              <input
                type="text"
                placeholder="请填写手机号或微信号"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">如有开通问题，客服会通过此联系方式联系您</p>
            </div>

            {/* 合计 & 支付方式 */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-lg font-semibold">
                合计需支付：<span className="text-indigo-600">请选择工具和店铺</span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  支付宝支付
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  微信支付
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </AuthenticatedLayout>
  )
}

/* ====================== 单个套餐卡片 ====================== */
function PackageCard({
  title,
  price,
  original,
  perMonth,
  popular = false,
}: {
  title: string
  price: string
  original: string
  perMonth: string
  popular?: boolean
}) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border p-6 flex flex-col transition hover:shadow-lg ${
        popular ? 'ring-2 ring-indigo-600' : 'border-gray-200'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          推荐
        </span>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold text-indigo-600">¥{price}</span>
        <span className="ml-1 text-sm text-gray-500 line-through">¥{original}</span>
      </div>

      <p className="mt-1 text-sm text-gray-600">单店铺 {perMonth} 元/月</p>

      <ul className="mt-4 space-y-2 flex-1">
        <li className="flex items-center text-sm text-gray-700">
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          商家助手全部数据服务
        </li>
        <li className="flex items-center text-sm text-gray-700">
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          商家助手全部工具服务
        </li>
      </ul>

      <button className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
        订阅
      </button>
      <a href="#" className="mt-2 block text-center text-xs text-indigo-600 hover:underline">
        权益说明
      </a>
    </div>
  )
}

/* ====================== 多店铺套餐卡片 ====================== */
function MultiPackageCard({
  level,
  price,
  original,
  per,
  shops,
  popular = false,
}: {
  level: string
  price: string
  original: string
  per: string
  shops: number
  popular?: boolean
}) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border p-6 flex flex-col transition hover:shadow-lg ${
        popular ? 'ring-2 ring-indigo-600' : 'border-gray-200'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          推荐
        </span>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{level}</h3>

      <div className="mt-3 flex items-baseline">
        <span className="text-3xl font-bold text-indigo-600">{price}</span>
        <span className="ml-1 text-sm text-gray-500 line-through">¥{original}</span>
      </div>

      <p className="mt-1 text-sm text-gray-600">低至 {per} 元/店铺/月</p>

      <ul className="mt-4 space-y-2 flex-1 text-sm text-gray-700">
        <li className="flex items-center">
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          {shops} 个店铺，时长 1 年
        </li>
        <li className="flex items-center">
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          包含全部数据服务和全部工具服务
        </li>
        <li className="flex items-center">
          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          赠送店铺前端主页访问的解决方案
        </li>
      </ul>

      <button className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
        订阅
      </button>
      <a href="#" className="mt-2 block text-center text-xs text-indigo-600 hover:underline">
        权益说明
      </a>
    </div>
  )
}
