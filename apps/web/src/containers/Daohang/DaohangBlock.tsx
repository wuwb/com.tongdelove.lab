import { Row, Col } from 'antd';
import { DaohangLink } from './DaohangLink';

export const DaohangBlock = (props) => {
  return (
    <Row>
      {
        props.links.map((item) => (
          <Col key={item} xs={12} sm={12} md={8} lg={8} xl={6}>
            <DaohangLink {...item} />
          </Col>
        ))
      }
    </Row>
  );
}

