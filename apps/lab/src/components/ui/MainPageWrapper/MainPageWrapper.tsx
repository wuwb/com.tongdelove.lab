import React from 'react'

export const MainPageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col">
      <main className="h-full w-full">{children}</main>
    </div>
  )
}
