import React from 'react'
import { HeaderMegaMenu } from './Header'
import { NavigationProgress } from '@mantine/nprogress';

type LayoutProps = {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavigationProgress />
      <HeaderMegaMenu />
      {children}
    </>
  )
}

export default BaseLayout
