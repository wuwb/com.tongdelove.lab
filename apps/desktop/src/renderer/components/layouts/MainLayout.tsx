import React from 'react'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <header className="flex h-14 items-center border-gray-200 border-b bg-white px-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700">
              新建助手
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ⚙️
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
