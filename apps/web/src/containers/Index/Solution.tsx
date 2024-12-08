import Image from 'next/image'

export const Solution = () => {
  return (
    <div className="introduce-block clearfix container mt-[60px] text-center">
      <div className="client-block-hd">
        <h3 className="text-2xl font-semibold text-gray-800">
          提供一整套解决方案
        </h3>
        <p className="text-lg text-gray-600">从需求设计到产品出货</p>
      </div>
      <div className="container mx-auto mt-20 grid grid-cols-12">
        <div className="content-primary col-span-4 float-left mt-[60px] h-[420px] w-[380px] text-left">
          <dl>
            <dt>
              <p className="text-lg font-bold">在线报价</p>
            </dt>
            <dd>智能快速报价、便捷下单</dd>
          </dl>
          <dl>
            <dt>
              <p className="text-lg font-bold">3D打样</p>
            </dt>
            <dd>免费 3D 打样、在线产品管理</dd>
          </dl>
          <dl>
            <dt>
              <p className="text-lg font-bold">价格直降</p>
            </dt>
            <dd>比市场价格降低 50%</dd>
          </dl>
          <dl>
            <dt>
              <p className="text-lg font-bold">快速出货</p>
            </dt>
            <dd>最快 24 小时即可出货</dd>
          </dl>
          <dl>
            <dt>
              <p className="text-lg font-bold">工厂直营</p>
            </dt>
            <dd>32 年持续耕耘，品质可靠稳定</dd>
          </dl>
        </div>
        <div className="content-secondly col-span-8 float-right h-[420px] w-[1000px]">
          <Image
            width={1000}
            height={420}
            src="/assets/front-page/1.jpg"
            alt="印刷机械设备"
          />
        </div>
      </div>
    </div>
  )
}
