import React, { FC } from 'react'
import { Button } from '@/components/ui/button'
import styled from '@emotion/styled'

const Block = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding: 120px;
  text-align: center;
  h3 {
    margin-bottom: 1rem;
  }
`

interface HeroProps {
  className?: string
  headline: string
  description: string
  children?: any
}

export const Hero: FC<HeroProps> = ({
  headline = '没找到你所需要的产品？',
  description = '寻求报价',
  children = null,
}) => {
  return (
    <Block>
      <div className="content">
        <h3>{headline}</h3>
        <div>
          <Button>{description}</Button>
        </div>
      </div>
      {children}
    </Block>
  )
}
