import { DefaultFooter } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import React from 'react'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '海维包装',
  })

  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        {
          key: 'wuwb.me',
          title: '无物包装',
          href: 'https://wuwb.me',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
