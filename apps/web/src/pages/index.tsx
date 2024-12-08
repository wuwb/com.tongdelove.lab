import Head from 'next/head'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { Col4Demo } from '@/containers/Index'
import { Solution } from '@/containers/Index/Solution'
import { Customers } from '@/containers/Index/Customers'
import { Ready } from '@/containers/Index/Ready'
import { Layout } from '@/components/common'
import { CustomCarousel } from '@/components/ui/CustomCarousel'
import Banner1 from '@/containers/index/1.png'
import Banner2 from '@/containers/index/2.png'

const IndexPage = (props) => {
  return (
    <>
      <Head>
        <title>海维包装</title>
        <meta name="description" content="印刷,包装,包装供应链" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomCarousel
        images={[
          {
            url: Banner1,
          },
          {
            url: Banner2,
          },
        ]}
      />
      <div className="container mx-auto">
        <Col4Demo />
        <SimpleGrid justifyItems="center">
          {/* 解决方案 */}
          <Solution />
          {/* 客户 */}
          <Customers />
          {/* 准备好了吗 */}
          <Ready />
        </SimpleGrid>
      </div>
    </>
  )
}

IndexPage.Layout = Layout

export default IndexPage
