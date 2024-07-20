import React from 'react'
import Image from 'next/image'
import { Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { isImg } from '@/utils/utils'

class Banner extends React.PureComponent<any, any> {
  render() {
    const { ...currentProps }: any = this.props
    const { dataSource } = currentProps
    delete currentProps.dataSource
    delete currentProps.isMobile

    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <div
          key="div"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' &&
            dataSource.title.children.match(isImg) ? (
              <Image
                src={dataSource.title.children}
                className="w-full"
                width="100"
                alt="img"
              />
            ) : (
              dataSource.title.children
            )}
          </div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button>
        </div>
        <DownOutlined />
      </div>
    )
  }
}

export default Banner
