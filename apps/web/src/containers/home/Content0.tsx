import React from 'react'
import { Row, Col } from 'antd'
import { getChildrenToRender } from '@/utils/utils'

export class Content extends React.PureComponent<any, any> {
  render() {
    const { dataSource, isMobile, ...props }: any = this.props
    const {
      wrapper,
      titleWrapper,
      page,
      OverPack: overPackData,
      childWrapper,
    } = dataSource
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
          </div>
          <div {...overPackData}>
            <Row>
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block
                return (
                  <Col key={i.toString()} {...blockProps}>
                    <div {...item}>
                      {item.children.map(getChildrenToRender)}
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
