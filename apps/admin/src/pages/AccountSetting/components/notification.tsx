import { List, Switch } from 'antd';
import { Component, Fragment } from 'react';

import { useIntl } from '@umijs/max';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView = (props) => {
  const getData = (intl) => {
    const Action = (
      <Switch
        checkedChildren={intl.formatMessage({ id: 'accountsettings.settings.open' })}
        unCheckedChildren={intl.formatMessage({ id: 'accountsettings.settings.close' })}
        defaultChecked
      />
    );
    return [
      {
        title: intl.formatMessage({ id: 'accountsettings.notification.password' }, {}),
        description: intl.formatMessage(
          { id: 'accountsettings.notification.password-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: intl.formatMessage({ id: 'accountsettings.notification.messages' }, {}),
        description: intl.formatMessage(
          { id: 'accountsettings.notification.messages-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: intl.formatMessage({ id: 'accountsettings.notification.todo' }, {}),
        description: intl.formatMessage(
          { id: 'accountsettings.notification.todo-description' },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  const intl = useIntl();
  const data = getData(intl);

  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
}

export default NotificationView;
