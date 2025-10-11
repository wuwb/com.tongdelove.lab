import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import { AppRoutes } from './routes'
import './assets/main.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider enableSystem={false}>
      <AppRoutes />
    </Provider>
  </StrictMode>
)
