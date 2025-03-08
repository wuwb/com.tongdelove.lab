import { useState } from 'react'

import { Route } from 'react-router-dom'
import { Router } from '@/lib/electron-router-dom'
import { IndexPage } from './pages/index'
import { AboutPage } from './pages/about'
import { Layout } from './layouts/index'

export function App() {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [count, setCount] = useState(0)

  const handleClick = (): void => {
    setCount(count + 1)
  }

  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      }
      about={<Route path="/" element={<AboutPage />} />}
    />
  )
}
