import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AiOutlineDown } from 'react-icons/ai'
import { isImg } from '@/utils/utils'

export const Banner = (props) => {
  const { ...currentProps } = props
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
      <AiOutlineDown />
    </div>
  )
}
