import { PageContainer } from '@ant-design/pro-components'
import { useIntl, useModel } from '@umijs/max'
import { Card, Menu } from 'antd'
import { MenuMode } from 'rc-menu/lib/interface'
import React, { useRef, useState } from 'react'
import BaseView from './components/base'
import BindingView from './components/binding'
import NotificationView from './components/notification'
import { SecurityView } from './components/security'
import { CurrentUser } from './data.d'
import styles from './style.less'

const { Item } = Menu

type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification'

const AccountSettingsPage = (props) => {
  const intl = useIntl()

  const main = useRef<HTMLDivElement>(null)

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
  }
  const [menuMap, setMenuMap] = useState(defaultMenuMap)
  const [mode, setMode] = useState<MenuMode>('inline')
  const [selectKey, setSelectKey] = useState('base')
  const { initialState } = useModel('@@initialState')
  const currentUser = (initialState?.currentUser || {}) as Partial<CurrentUser>

  const resize = () => {
    requestAnimationFrame(() => {
      const offsetWidth = main.current?.offsetWidth || 0
      let mode: 'inline' | 'horizontal' = 'inline'
      if (offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      setMode(mode)
    })
  }

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ))
  }

  const getRightTitle = () => {
    return menuMap[selectKey]
  }

  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView currentUser={currentUser} />
      case 'security':
        return <SecurityView />
      case 'binding':
        return <BindingView />
      case 'notification':
        return <NotificationView />
      default:
        break
    }

    return null
  }

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div className={styles.main} ref={main}>
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) =>
                setSelectKey(key as AccountSettingsStateKeys)
              }
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
  )
}

export default AccountSettingsPage
