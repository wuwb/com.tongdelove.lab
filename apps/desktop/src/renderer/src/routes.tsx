import { Route } from 'react-router'
import { Router } from '@/lib/electron-router-dom'
import { Layout } from './layouts'
import { IndexPage } from './pages'
import { AboutPage } from './pages/about'

export function AppRoutes() {
  return (
    <Router
      about={<Route path="/" element={<AboutPage />} />}
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      }
    />
  )
}
