import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from '@emotion/styled';
import Layout from '@/components/common/Layout';
import { Hero } from '@/components/ui';

const Customers = styled.div`
  .banner {
    padding: 80px 70px;
    color: #fff;
    text-align: center;
    background: blueviolet;
  }
  .case {
    .case-item {
      padding: 32px;
      background: #f7f6f5;
      border-radius: 16px;
      .case-item-title {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>我们的客户</title>
      </Head>
      <Customers>
        <div className="banner py-80">
          <h1>customers.title</h1>
        </div>

        <div className="case max-w-screen-sm mx-auto">
          <h2 className="case-title font-bold text-2xl py-10 text-center">Case studies</h2>
          <div className="grid grid-cols-2 gap-10">
              <div className="case-item h-40 col-span-1">
                <Link href="/customers/weisinong">
                  <a>
                    <div className="case-item-title">味司浓</div>
                    <div className="case-item-desc">
                      通过海维包装来降低成本和提升质量，为义务的持续增长提供保障。
                      Uses to improve costs and quality control for rapid growth.
                    </div>
                  </a>
                </Link>
              </div>
              <div className="case-item h-40 col-span-1">
                <div>Ollie</div>
                <div>
                  Uses to source and manage overseas production of injection
                  molded parts.
                </div>
              </div>
              <div className="case-item h-40 col-span-1">
                <div>Empathy Wines</div>
                <div>
                  Uses to engineer completely custom, scalable wine packaging
                  systems.
                </div>
              </div>
              <div className="case-item h-40 col-span-1">
                <div>Function of Beauty</div>
                <div>
                  Uses to streamline production of its ever-changing, iconic
                  pouch designs.
                </div>
              </div>
          </div>
        </div>
        <Hero headline="准备好升级你的供应链了吗？" description="Get started with US →" />
      </Customers>
    </>
  );
};

Home.Layout = Layout;

export default Home;
