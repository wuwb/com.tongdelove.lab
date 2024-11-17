import React from 'react'
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
            <div>
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block
                return (
                  <div key={i.toString()} {...blockProps}>
                    <div {...item}>
                      {item.children.map(getChildrenToRender)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
