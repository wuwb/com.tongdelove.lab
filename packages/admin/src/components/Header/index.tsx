import React, { useState } from 'react';
import { Link } from '@umijs/max';
import { Button, Layout, Drawer, Grid } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import Styles from './index.less';

const { useBreakpoint } = Grid;

const Header = (props) => {
  const [session] = useState(true);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const { md } = useBreakpoint();

  return (
    <Layout.Header
      className={Styles.menuBar}
      style={{ position: 'relative', zIndex: 1, width: '100%' }}
    >
      <div className={Styles.logo}>
        <Link to="/">尖端放电实验室</Link>
      </div>
      <div className={Styles.menuCon}>
        <div className={Styles.leftMenu}>
          <LeftMenu />
        </div>
        <div className={Styles.rightMenu}>
          <RightMenu />
        </div>
        <Button className={Styles.barsMenu} type="primary" onClick={showDrawer}>
          <span className={Styles.barsBtn}></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </Layout.Header>
  );
};

export default Header;
