import React from 'react'

const Home = props => {
  const { title } = props

  const changeLangs = () => {
    // const lang = getLocale();
    // const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    // // 刷新页面
    // // setLocale('zh-TW', true);
    // // 不刷新页面
    // setLocale(change, false);
  }

  // const intl = useIntl();

  return (
    <div>
      <a onClick={changeLangs}>切换语言</a>
    </div>
  )
}

// Home.getInitialProps = async ({ store, isServer, history, match, route }) => {
//   if (!isServer) {
//     return;
//   }
//   await store.dispatch({ type: 'test/test' });
//   const { test } = store.getState();
//   return { test };
// };

export default Home
