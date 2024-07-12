import { Space, Tag } from 'antd'
// import Dropdown from '@/components/avatarDropdown';
// import LocaleSwitch from '@/components/localeSwitch';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { SelectLang as UmiSelectLang, useModel } from '@umijs/max'
import React from 'react'
import HeaderSearch from '../HeaderSearch'
import { AvatarDropdown } from './AvatarDropdown'
import styles from './index.less'

export type SiderTheme = 'light' | 'dark'

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
}

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  )
}

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started')
      }}
    >
      <QuestionCircleOutlined />
    </div>
  )
}

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState')

  if (!initialState || !initialState.settings) {
    return null
  }

  const { navTheme, layout } = initialState.settings
  let className = styles.right

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="计价器"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started')
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <AvatarDropdown />
      <SelectLang className={styles.action} />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* <LocaleSwitch /> */}
      {/* <Dropdown /> */}
    </Space>
  )
}
export default GlobalHeaderRight
