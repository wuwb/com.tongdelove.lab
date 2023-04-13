import React, { FC, useState, useEffect, useRef, FunctionComponent } from 'react';
import { Dispatch, ConnectProps, connect, useIntl, useModel } from '@umijs/max';
import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import { CurrentUser } from './data.d';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-components';
import { MenuMode } from 'rc-menu/lib/interface';

const { Item } = Menu;

type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';

const AccountSettings: React.FC = (props) => {
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
    </PageContainer>
  );
};

export default AccountSettings;
