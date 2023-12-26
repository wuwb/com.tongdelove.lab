import React from 'react'
import { HeaderMegaMenu } from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  )
}

export default BaseLayout
