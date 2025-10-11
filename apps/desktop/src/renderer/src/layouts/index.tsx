import { NavLink } from 'react-router'
import { type MouseEvent, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Vortex } from '../components/Vortex'

const { api } = window

export const Layout = () => {
  const aboutButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    api.onAboutWindowClosed(() => {
      aboutButtonRef.current!.disabled = false
    })
  }, [])

  function createAboutWindow(event: MouseEvent<HTMLButtonElement>) {
    api.createAboutWindow()
    event.currentTarget.disabled = true
  }

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col transition-[width] h-full bg-gray-100 duration-300 ease-in-out lg:block w-[50px] min-w-[20px]">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/about">About</NavLink>

        <nav className="flex w-full gap-2 p-4">
          <button
            className="disabled:opacity-50 disabled:text-primary"
            onClick={createAboutWindow}
            ref={aboutButtonRef}
          >
            About
          </button>
        </nav>
      </div>
      <section className="flex flex-1 overflow-x-hidden">
        <Outlet />
      </section>
      <div className="fixed left-0 -top-50 size-full -z-10 overflow-hidden">
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
