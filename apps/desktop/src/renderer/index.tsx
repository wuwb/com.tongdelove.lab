import ReactDom from 'react-dom/client'
import React from 'react'

import { AppRoutes } from './routes'
import { Provider } from './components/ui/provider'
import './globals.css'

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
)
