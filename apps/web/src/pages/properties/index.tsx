import Head from 'next/head'
import { Layout } from '@/components/common'

const Home = () => (
  <>
    <Head>
      <title>价格</title>
    </Head>
    <div className="container mx-auto">
      <div className="banner py-20 text-center">
        <h1 className="text-2xl font-bold">
          可持续性发展框架 Sustainability Framework{' '}
        </h1>
        <p className="mt-5">
          海维包装创建可持续发展框架，以帮助客户确定可持续性包装策略并探索匹配的产品。每处资产均获得最新研究的支持。
        </p>
        <p className="mt-2">
          Haiwei created this framework to help you define your sustainable
          packaging strategy, and explore matching products. Each property is
          backed by the latest research available. How to use this framework.
        </p>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-20 py-10">
        <div className="col-span-1">
          <h3 className="title text-xl font-bold">Recovery</h3>
          <p className="desc">
            At the end of a product's life, some materials can be recovered or
            disposed of to minimize environmental impact.
            <br />
            在产品使用寿命结束时，可以回收或处置某些材料，以最大程度地减少对环境的影响。
          </p>
        </div>
        <div className="col-span-2">
          <div className="item">
            <h4>Curbside recyclable</h4>
            <p>
              Can be recycled by the majority of households using their curbside
              program.
            </p>
          </div>
          <div className="item">
            <h4>Drop-off recyclable</h4>
            <p>Can be recycled when deposited at a designated facility.</p>
          </div>
          <div className="item">
            <h4>Home compostable</h4>
            <p>
              Breaks down to become part of healthy soil in a home compost pile.
            </p>
          </div>
          <div className="item">
            <h4>Drop-off compostable </h4>
            <p>
              Breaks down to become part of healthy soil in an industrial
              composting facility.
            </p>
          </div>
          <div className="item">
            <h4>Biodegradable </h4>
            <p>
              Breaks down into elements found in nature when exposed to light,
              air, and moisture.
            </p>
          </div>
          <div className="item">
            <h4>Reusable </h4>
            <p>Can be reused without impairing its function.</p>
          </div>
          <div className="item">
            <h4>Returnable </h4>
            <p>Can be used for at least two trips.</p>
          </div>
          <div className="item">
            <h4>Refillable </h4>
            <p>Can be refilled with the same type of product.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-20 py-10">
        <div className="col-span-1">
          <div className="item">
            <h3 className="title text-xl font-bold">Materials </h3>
            <p>
              Through sustainably managed sources and reuse, some materials have
              a lower environmental impact.
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <div className="detail">
            <div className="item">
              <h4>Alternative inks </h4>
              <p>Uses vegetable or soy oil as a base, rather than petroleum.</p>
            </div>
            <div className="item">
              <h4>Responsible forestry</h4>
              <p>
                Contains paper pulp that came from responsibly-managed forests.
              </p>
            </div>
            <div className="item">
              <h4>Certified wood </h4>
              <p>
                Contains paper pulp that came from responsibly-managed forests.
              </p>
            </div>
            <div className="item">
              <h4>Plastic-free </h4>
              <p>Does not contain any petroleum-based plastics.</p>
            </div>
            <div className="item">
              <h4>Recycled content</h4>
              <p>Contains a significant proportion of recycled material.</p>
            </div>
            <div className="item">
              <h4>Renewable materials </h4>
              <p>
                Made from materials that can regenerate on a human timescale and
                be responsibly managed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-20 py-10">
        <div className="col-span-1">
          <div className="item">
            <h3 className="text-xl font-bold">Production </h3>
            <p>
              Factories and manufacturing options that reduce environmental
              impact and are responsibly managed.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="detail">
            <div className="item">
              <h4>Local production </h4>
              <p>
                Can be produced within 250 miles of delivery to reduce energy
                use and freight emissions in transit.
              </p>
            </div>
            <div className="item">
              <h4>Renewable energy </h4>
              <p>
                Uses energy collected from resources that naturally replenish on
                a human timescale.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-20 py-10">
        <div className="col-span-1">
          <div className="item">
            <h3 className="text-xl font-bold">Distribution </h3>
            <p>
              Efficiencies in the movement of products that can reduce net
              carbon emissions.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="detail">
            <div className="item">
              <h4>Volume reduction </h4>
              <p>
                Reduces the amount of space necessary for transit and storage.
              </p>
            </div>
            <div className="item">
              <h4>Weight reduction </h4>
              <p>Reduces overall weight in transit.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-20 py-10">
        <div className="col-span-1">
          <div className="item">
            <h3 className="text-xl font-bold">Design </h3>
            <p>
              At the earliest stages of conception, design decisions influence
              the entire lifecycle of a product.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="detail">
            <div className="item">
              <h4>Component reduction </h4>
              <p>Minimizes the number of components produced.</p>
            </div>
            <div className="item">
              <h4>Material reduction </h4>
              <p>Minimizes the amount of raw material used in production.</p>
            </div>
            <div className="item">
              <h4>Print reduction </h4>
              <p>Minimizes the amount of printed surface.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

Home.Layout = Layout

export default Home
