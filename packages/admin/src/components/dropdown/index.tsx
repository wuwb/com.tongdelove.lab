import access from '@/components/access';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';

class OperatorDropdown extends React.Component {
  state = {
    visible: false,
  };

  handleClick = () => {
    this.setState({
      visible: true,
    });
  };

  hidden = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  // 组件卸载后阻止异步操作
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }

  overlay = () => {
    const { ctx, config } = this.props;
    const { render = [] } = config;
    const children = render.map((v, idx) => {
      const { action = [] } = v;
      const finalConfig = {
        ...v,
        action: [
          ...action,
          (ctx) => {
            ctx.menu.hidden();
          },
        ],
      };
      return (
        <Menu.Item key={idx} style={{ padding: '5px 8px' }}>
          {finalConfig.text}
        </Menu.Item>
      );
    });
    return <Menu>{children}</Menu>;
  };

  render() {
    const { visible } = this.state;
    return (
      <Dropdown
        overlay={this.overlay()}
        onClick={this.handleClick}
        open={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <EllipsisOutlined style={{ color: '#1890ff' }} />
      </Dropdown>
    );
  }
}

export default access(OperatorDropdown);
