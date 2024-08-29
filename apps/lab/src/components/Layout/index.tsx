import { FC } from 'react'
import { useRouter } from 'next/router'
import { LayoutProvider } from './core/LayoutProvider'
import { BaseLayout } from './components/BaseLayout'
import { FullLayout } from './components/FullLayout'

// import {} './components/DefaultLayout' // 头部
// import {} './components/FullLayout' // 侧边
// import {} './components/AccentHeaderLayout' // 头部+侧边，标准
// import {} './components/AccentSidebarLayout' // 侧边+头部
// import {} './components/BoxedSidebarLayout' // 侧边+小头部，盒型
// import {} './components/BottomNavigationLayout' // 底部
// import {} './components/CollapsedSidebarLayout' // 小侧边+头部
// import {} './components/DocsLayout' // 头部+文档侧边
// import {} './components/ExtendedSidebarLayout' // ?
// import {} './components/TopNavigationLayout' // 全包大头部

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  const asPath = decodeURIComponent(router.asPath)

  let layout: React.ReactNode

  if (asPath.startsWith('/auth')) {
    layout = <>{children}</>
  } else if (asPath.startsWith('/fullscreen')) {
    layout = <FullLayout>{children}</FullLayout>
  } else {
    layout = <BaseLayout>{children}</BaseLayout>
  }

  return <LayoutProvider>{layout}</LayoutProvider>
}
