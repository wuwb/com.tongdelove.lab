import React from 'react'
import Image from 'next/image'

export const Content1 = (props) => {
  const { ...tagProps }: any = props
  const { dataSource, isMobile } = tagProps
  delete tagProps.dataSource
  delete tagProps.isMobile
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad',
        }
      : {
          x: '-=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad',
        },
  }
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div>
        <span {...dataSource.img}>
          <Image
            src={dataSource.img.children}
            className="w-full"
            width="100"
            alt="img"
          />
        </span>
        <div
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.textWrapper}
          componentProps={{
            md: dataSource.textWrapper.md,
            xs: dataSource.textWrapper.xs,
          }}
        >
          <h2 key="h1" {...dataSource.title}>
            {dataSource.title.children}
          </h2>
          <div key="p" {...dataSource.content}>
            {dataSource.content.children}
          </div>
        </div>
      </div>
    </div>
  )
}
