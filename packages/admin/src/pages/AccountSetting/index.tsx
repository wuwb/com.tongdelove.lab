import React, { FC, useState, useEffect, useRef } from 'react';
import { useIntl, useModel } from '@umijs/max';
import { Card, Menu, theme } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import NotificationView from './components/notification';
import { SecurityView } from './components/security';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-components';
import { MenuMode } from 'rc-menu/lib/interface';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
}));

const { Item } = Menu;

type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';

const AccountSettingsPage: React.FC = (props) => {
  const main = useRef();
  const intl = useIntl();
  const defaultMenuMap = {
    base: intl.formatMessage({
      id: 'accountsettings.menuMap.basic',
      defaultMessage: 'Basic Settings',
    }),
    security: intl.formatMessage({
      id: 'accountsettings.menuMap.security',
      defaultMessage: 'Security Settings',
    }),
    binding: intl.formatMessage({
      id: 'accountsettings.menuMap.binding',
      defaultMessage: 'Account Binding',
    }),
    notification: intl.formatMessage({
      id: 'accountsettings.menuMap.notification',
      defaultMessage: 'New Message Notification',
    }),
  };
  const [menuMap, setMenuMap] = useState(defaultMenuMap);
  const [mode, setMode] = useState<MenuMode>('inline');
  const [selectKey, setSelectKey] = useState('base');
  const { currentUser, fetchUser } = useModel('useUser', model => ({ currentUser: model.user, fetchUser: model.fetchUser }));
  const { initialState } = useModel('@@initialState');

  if (!currentUser.userid) {
    return '';
  }

  const resize = () => {
    if (!main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = main;
      if (main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setMode(mode);
    });
  };

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const getRightTitle = () => {
    return menuMap[selectKey];
  };

  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        break;
    }

    return null;
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div className={styles.main} ref={main}>
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]}
              onClick={({ key }) => setSelectKey(key as AccountSettingsStateKeys)}
            >
              {getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{getRightTitle()}</div>
            {renderChildren()}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AccountSettingsPage;
