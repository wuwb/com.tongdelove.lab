import Image from 'next/image'
import styled from '@emotion/styled'

const Home = () => {
  const Container = styled.div`
    margin-top: 60px;
    & .content .content-primary {
      padding-top: 60px;
      width: 380px;
      height: 420px;
    }
    & .content .content-secondly {
      width: 1000px;
      height: 420px;
    }
  `
  return (
    <Container className="introduce-block clearfix container text-center">
      <div className="client-block-hd">
        <h3>提供一整套解决方案</h3>
        <p>从需求设计到产品出货</p>
      </div>
      <div className="container mx-auto grid grid-cols-12">
        <div className="content-primary col-span-4 float-left text-left">
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
        <div className="content-secondly col-span-8 float-right">
          <Image width={1000} height={420} src="/assets/front-page/1.jpg" alt="印刷机械设备" />
        </div>
      </div>
    </Container>
  )
}

export default Home
