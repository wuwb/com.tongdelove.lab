import { useRouter } from 'next/router'
import { LayoutProvider } from './core/LayoutProvider'
import { BaseLayout } from './components/BaseLayout'
import { FullLayout } from './components/FullLayout'
import { useGlobalInit } from './useGlobalInit'

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
  useGlobalInit().catch((err) => {
    console.error(err)
  })

  const router = useRouter()

  const asPath = decodeURIComponent(router.asPath)

  console.log('asPath: ', asPath)

  const hasHeader = [
    '/tool', 
    '/map', 
    '/logo-gen', 
    '/changelog',
    '/tool/book-thickness',
  ].includes(
    asPath
  )

  const hasSidebar = [
    '/tool/book-thickness'
  ].includes(
    asPath
  )

  let layout: React.ReactNode

  if (asPath.startsWith('/auth')) {
    layout = <>{children}</>
  } else if (asPath.startsWith('/fullscreen')) {
    layout = <FullLayout>{children}</FullLayout>
  } else if (hasHeader || hasSidebar) {
    layout = <BaseLayout hasHeader={hasHeader} hasSidebar={hasSidebar}>{children}</BaseLayout>
  } else {
    layout = <BaseLayout hasHeader={true}>{children}</BaseLayout>
  }

  return <LayoutProvider>{layout}</LayoutProvider>
}
