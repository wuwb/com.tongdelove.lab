import { Route } from 'react-router-dom'

import { Router } from 'lib/electron-router-dom'

import { MainScreen } from './screens/main'
import { Layout } from './layouts/index'

import { ErrorScreen } from './pages/ErrorScreen'
import { AboutPage } from './pages/about'
import { ShopPage } from './pages/shop'
import { ShopLinksPage } from './pages/ShopLinksPage'
import { ShopBrowserPage } from './pages/ShopBrowserPage'

export function AppRoutes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />} errorElement={<ErrorScreen />}>
          <Route path="/" element={<MainScreen />} />
          <Route path="/shop" element={<ShopPage />}>
            <Route path="links" element={<ShopLinksPage />} />
            <Route path="browser" element={<ShopBrowserPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
        </Route>
      }
      about={<Route path="/about" element={<AboutPage />} />}
    />
  )
}
