// 头部
// export * from './components/DefaultLayout';

// 侧边
// export * from './components/FullLayout';

// 头部+侧边，标准
// export * from './components/AccentHeaderLayout';

// 侧边+头部
// export * from './components/AccentSidebarLayout';

// 侧边+小头部，盒型
// export * from './components/BoxedSidebarLayout';

// 底部
// export * from './components/BottomNavigationLayout';

// 小侧边+头部
// export * from './components/CollapsedSidebarLayout';

// 头部+文档侧边
// export * from './components/DocsLayout';

// ?
// export * from './components/ExtendedSidebarLayout';

// 全包大头部
// export * from './components/TopNavigationLayout';

import { FC } from 'react'
import { BaseLayout } from './components/BaseLayout'
import { useRouter } from 'next/router'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()

  const asPath = decodeURIComponent(router.asPath)

  if (asPath.startsWith('/dashboard')) {
    return <>{children}</>
  } else {
    return <BaseLayout>{children}</BaseLayout>
  }
}
