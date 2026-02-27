import './assets/main.css'
import '@/preload/index.d.ts'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
