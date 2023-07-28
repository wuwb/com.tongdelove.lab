import { Col, Row } from 'antd';
import React from 'react';

class PicWrapper extends React.Component {
  render() {
    const { children, url } = this.props;
    return (
      <Row>
        <Col span={12}>{children}</Col>
        <Col
          span={12}
          style={{
            maxHeight: '200px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <img src={url} height="100%" />
        </Col>
      </Row>
    );
  }
}

export default PicWrapper;
