import {
  AlipayOutlined,
  DingdingOutlined,
  TaobaoOutlined,
} from '@ant-design/icons'
import { FormattedMessage, useIntl } from '@umijs/max'
import { List } from 'antd'
import { Fragment } from 'react'

const BindingView = (props) => {
  const getData = (intl) => [
    {
      title: intl.formatMessage({ id: 'accountsettings.binding.taobao' }, {}),
      description: intl.formatMessage(
        { id: 'accountsettings.binding.taobao-description' },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage
            id="accountsettings.binding.bind"
            defaultMessage="Bind"
          />
        </a>,
      ],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.binding.alipay' }, {}),
      description: intl.formatMessage(
        { id: 'accountsettings.binding.alipay-description' },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage
            id="accountsettings.binding.bind"
            defaultMessage="Bind"
          />
        </a>,
      ],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.binding.dingding' }, {}),
      description: intl.formatMessage(
        { id: 'accountsettings.binding.dingding-description' },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage
            id="accountsettings.binding.bind"
            defaultMessage="Bind"
          />
        </a>,
      ],
      avatar: <DingdingOutlined className="dingding" />,
    },
  ]

  const intl = useIntl()
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData(intl)}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  )
}

export default BindingView
