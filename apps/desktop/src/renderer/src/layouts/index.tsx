import { NavLink } from 'react-router'
import { Outlet } from 'react-router-dom'
import { Vortex } from '../components/Vortex'
import { LayoutDashboard, MessageSquare, Settings } from 'lucide-react'
import { ColorModeButton } from '../components/ui/color-mode'

export const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex h-full w-16 shrink-0 flex-col items-center border-r bg-white/80 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/40">
        <nav className="flex flex-col gap-4 w-full items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex size-10 items-center justify-center rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`
            }
            title="Overview"
          >
            <LayoutDashboard size={20} />
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex size-10 items-center justify-center rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`
            }
            title="Chat"
          >
            <MessageSquare size={20} />
          </NavLink>
        </nav>

        <div className="mt-auto flex flex-col items-center gap-4 w-full">
          <ColorModeButton />
          
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              `flex size-10 items-center justify-center rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`
            }
            title="Settings"
          >
            <Settings size={20} />
          </NavLink>
        </div>
      </div>
      
      <section className="flex flex-1 overflow-auto relative">
        <Outlet />
      </section>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <Vortex
          backgroundColor="transparent"
          className="flex size-full"
          rangeY={300}
          baseRadius={2}
          particleCount={20}
          rangeSpeed={1.5}
          baseHue={50}
        />
      </div>
    </div>
  )
}
