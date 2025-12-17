import { Route } from 'react-router'
import { Router } from '@/lib/electron-router-dom'
import { Layout } from './layouts'
import { IndexPage } from './pages/index'
import { AboutPage } from './pages/about'
import { SettingPage } from './pages/setting'
import { ChatPage } from './pages/chat'

export function AppRoutes() {
  return (
    <Router
      about={<Route path="/" element={<AboutPage />} />}
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      }
    />
  )
}
