import { FormattedMessage, useIntl } from '@umijs/max';
import React from 'react';
import { List } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

export const SecurityView = () => {
  const intl = useIntl();

  const getData = () => [
    {
      title: intl.formatMessage({ id: 'accountsettings.security.password' }, {}),
      description: (
        <>
          {intl.formatMessage({ id: 'accountsettings.security.password-description' })}：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.security.phone' }, {}),
      description: `${intl.formatMessage(
        { id: 'accountsettings.security.phone-description' },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.security.question' }, {}),
      description: intl.formatMessage({ id: 'accountsettings.security.question-description' }, {}),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.security.email' }, {}),
      description: `${intl.formatMessage(
        { id: 'accountsettings.security.email-description' },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: intl.formatMessage({ id: 'accountsettings.security.mfa' }, {}),
      description: intl.formatMessage({ id: 'accountsettings.security.mfa-description' }, {}),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  const data = getData();

  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
}
