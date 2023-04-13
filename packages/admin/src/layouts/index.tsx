import React from 'react';
import { Outlet } from '@umijs/max';

export default (props) => {
  return <Outlet />;
}

// class LayoutComponent extends React.Component {
//   render() {
//     const { children } = this.props;
//     return (
//         history={history}
//         locale={getLocale() === 'zh-CN' ? zhCN : enUS}
//       >
//         <PageHeader title={false}><div style={{height: '100%'}}>{children}</div></PageHeader>
//     );
//   }
// }

// export default LayoutComponent;
