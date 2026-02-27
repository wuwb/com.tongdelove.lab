import { Route } from 'react-router'
import { Router } from '@/lib/electron-router-dom'
import { AppShell } from './layouts/AppShell'
import { IndexPage } from './pages/index'
import { AboutPage } from './pages/about'
import { SettingPage } from './pages/settings'
import { ChatPage } from './pages/chat'
import { AssistantsPage } from './pages/assistants'
import { SettingsModels } from './pages/settings/Models'
import { SettingsGeneral } from './pages/settings/General'
import { PlaceholderSettings } from './pages/settings/PlaceholderSettings'
import { NotFoundPage } from './pages/not-found'
import { DashboardPage } from './pages/Dashboard'
import { Usage as DashboardUsage } from './pages/Dashboard/Usage'
import { Versions as DashboardVersions } from './pages/Dashboard/Versions'

export function AppRoutes() {
  return (
    <Router
      about={<Route path="/" element={<AboutPage />} />}
      main={
        <Route path="/" element={<AppShell />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="" element={<DashboardUsage />} />
            <Route path="usage" element={<DashboardUsage />} />
            <Route path="versions" element={<DashboardVersions />} />
          </Route>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/assistants" element={<AssistantsPage />} />
          <Route path="/drawing" element={<PlaceholderSettings title="绘图" />} />
          <Route path="/miniapp" element={<PlaceholderSettings title="小程序" />} />
          <Route path="/playground" element={<PlaceholderSettings title="Playground" />} />
          <Route path="/setting/*" element={<SettingPage />}>
            <Route path="" element={<SettingsModels />} />
            <Route path="models" element={<SettingsModels />} />
            <Route path="general" element={<SettingsGeneral />} />
            <Route path="display" element={<PlaceholderSettings title="显示设置" />} />
            <Route path="data" element={<PlaceholderSettings title="数据设置" />} />
            <Route path="mcp" element={<PlaceholderSettings title="MCP服务" />} />
            <Route path="api" element={<PlaceholderSettings title="API服务" />} />
            <Route path="shortcuts" element={<PlaceholderSettings title="快捷键" />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      }
    />
  )
}
