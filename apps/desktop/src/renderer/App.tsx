import { StrictMode } from 'react'
import { Provider } from './components/ui/provider'
import { AppRoutes } from './routes'

export function App() {
  return (
    <StrictMode>
      <Provider enableSystem={false}>
        <AppRoutes />
      </Provider>
    </StrictMode>
  )
}
