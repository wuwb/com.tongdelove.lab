import React from 'react';
import { getAllLocales, getLocale, setLocale } from '@umijs/max';
import { Layout } from 'antd';
import UsgCate from '@/components/Index/UsgCate';
import StructureCate from '@/components/Index/StructureCate';
import Banner from '@/components/Index/Banner';
import Digital from '@/components/Index/Digital';
import Service from '@/components/Index/Service';
import Solution from '@/components/Index/Solution';
import Customers from '@/components/Index/Customers';
import Ready from '@/components/Index/Ready';
import Mission from '@/components/Index/Mission';
import { Article } from '@/components/Article';
import { SiteStatus, UserInfo, BoxWrap } from '@/components/Sider';
import styles from './index.less';

function IndexPage(props) {
  console.log('getAllLocales: ', getAllLocales()); // en-US,zh-CN
  console.log('getLocale: ', getLocale()); // en-US | zh-CN
  console.log(props.userAgent)

  // 不刷新页面
  // setLocale('zh-CN', false);
  const articles = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];
  return (
    <Layout.Content>
      <div className={styles.content}>
        <div className={styles.main}>
          <BoxWrap>
            <div className={styles.entryListContainer}>
              <div className={styles.entryListWrap}>
                <ul className={styles.entryList}>
                  {articles.map((article) => {
                    return (
                      <li className={styles.item} key={article.id}>
                        <Article data={article} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </BoxWrap>
        </div>
        <div className={styles.sider}>
          <UserInfo />
          <SiteStatus />
        </div>
      </div>
    </Layout.Content>
  );
}

export default IndexPage;

