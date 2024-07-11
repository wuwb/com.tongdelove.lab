import { Row, Col } from 'antd';
import DaohangLink from './DaohangLink';

const DaohangBlock = (props) => {
  console.log(props.links)
  return (
    <Row>
      {
        props.links.map(item => (
          <Col xs={12} sm={12} md={8} lg={8} xl={6}>
            <DaohangLink {...item} />
          </Col>
        ))
      }
    </Row>
  );
}

export default DaohangBlock;
