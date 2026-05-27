import { NavLink } from 'react-router'
import { Outlet } from 'react-router-dom'
import { Vortex } from '../../components/Vortex'
import { LayoutDashboard, MessageSquare, Settings } from 'lucide-react'
import { ColorModeButton } from '../../components/ui/color-mode'

export const VortexLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden">
      <div className="!py-4 hidden h-full w-16 shrink-0 flex-col items-center justify-between border-gray-200 border-r bg-white/80 backdrop-blur md:flex dark:border-gray-800 dark:bg-gray-900/80">
        <nav className="flex flex-col items-center gap-4 pt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex size-10 items-center justify-center rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`
            }
            title="Overview">
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
            title="Chat">
            <MessageSquare size={20} />
          </NavLink>
        </nav>

        <div className="w-full">
          <div className="flex flex-col items-center gap-4 pb-4">
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
              title="Settings">
              <Settings size={20} />
            </NavLink>
          </div>
        </div>
      </div>

      <section className="relative flex flex-1 overflow-auto">
        <Outlet />
      </section>

      <div className="-z-10 pointer-events-none fixed inset-0 overflow-hidden">
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
