import { NavLink, Outlet } from 'react-router-dom'

export const ShopPage = () => {
  return (
    <div className="flex w-full h-full grow">
      <div id="menu" className="flex flex-col w-[200px]">
        <NavLink to="/shop/links">导航</NavLink>
        <NavLink to="/shop/browser">浏览器</NavLink>
      </div>
      <div className="flex flex-col w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}
