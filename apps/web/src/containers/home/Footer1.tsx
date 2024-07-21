import React from 'react'
import Image from 'next/image'
import { Col } from 'antd'
import { getChildrenToRender } from '@/utils/utils'
import { isImg } from '@/utils/utils'

export class Footer extends React.Component<any, any> {
  static defaultProps = {
    className: 'footer1',
  }

  getLiChildren = (data) =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.children === 'string' &&
            title.children.match(isImg) ? (
              <Image src={title.children} className="w-full" alt="img" />
            ) : (
              title.children
            )}
          </h2>
          <div {...childWrapper}>
            {childWrapper.children.map(getChildrenToRender)}
          </div>
        </Col>
      )
    })

  render() {
    const { ...props }: any = this.props
    const { dataSource }: any = props
    delete props.dataSource
    delete props.isMobile
    const childrenToRender = this.getLiChildren(dataSource.block.children)
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.div}>
          <div>{childrenToRender}</div>

          <div {...dataSource.copyrightPage}>
            <div {...dataSource.copyright}>{dataSource.copyright.children}</div>
          </div>
        </div>
      </div>
    )
  }
}
