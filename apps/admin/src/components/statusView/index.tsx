import { Popover, Tag } from 'antd'
import clsx from 'clsx'
import React from 'react'

import './index.less'

class StatusView extends React.Component {
  render() {
    const { statusList, children } = this.props || {}
    let color = 'default'
    let childrenTex = ''
    const statusPropver =
      Array.isArray(statusList) &&
      statusList.length > 0 &&
      statusList.map((item, index) => {
        const { key, statusSuffix = '', value, children: childrenVal } = item
        if (key === children) {
          childrenTex = `${childrenVal || value} ${statusSuffix ? statusSuffix + '%' : ''}`
          color = item.color
        }
        return (
          <div className="popovers" key={item.key}>
            <div
              className={clsx(
                'popoverStatus',
                item.key === children ? 'status-high' : 'status-default',
              )}
            >
              {item.value}
            </div>
            <span
              className={clsx(
                'popoverText',
                index === statusList.length - 1 && 'propoverDisplayNone',
              )}
            ></span>
          </div>
        )
      })
    return (
      <Popover placement="leftTop" content={statusPropver}>
        <Tag className="statusTop" color={color}>{`${childrenTex}`}</Tag>
      </Popover>
    )
  }
}

export default StatusView
