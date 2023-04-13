import React from 'react';
import { connect, useIntl, getLocale, setLocale } from '@umijs/max';
import { Button } from 'antd';

const Home = (props) => {
  const { title } = props;
  console.log('renderd', title);

  const changeLangs = () => {
    const lang = getLocale();
    const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    // 刷新页面
    // setLocale('zh-TW', true);
    // 不刷新页面
    setLocale(change, false);
  };
  const intl = useIntl();

  return (
    <div>
      <a onClick={changeLangs}>切换语言</a>
    </div>
  );
};

Home.getInitialProps = async ({ store, isServer, history, match, route }) => {
  // console.log(ctx);
  if (!isServer) {
    return;
  }
  await store.dispatch({ type: 'test/test' });
  const { test } = store.getState();
  console.log('test: ', test);
  return { test };
};

export default connect(({ test }) => ({ title: test.title }))(Home);
