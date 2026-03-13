import { Provider } from '@/renderer/components/ui/provider'
import { AppRoutes } from './routes'

export function App() {
  return (
    <Provider enableSystem={false}>
      <AppRoutes />
    </Provider>
  )
}
