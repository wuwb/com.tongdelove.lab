import { Link } from '@/components/ui2'
import { Logo } from '../Logo'
import styles from './Header.module.scss'
import { Navbar } from './Navbar'

function MenuIcon() {
  const handleMobileMenu = () => {
    //
  }
  return (
    <div className={styles['menu-icon']} onClick={handleMobileMenu}>
      <div className={styles['menu-icon-line']}></div>
      <div className={styles['menu-icon-line']}></div>
      <div className={styles['menu-icon-line']}></div>
    </div>
  )
}

export function Header() {
  return (
    <>
      {/* pc端菜单 */}
      <div className="sticky top-0 z-30 mx-auto box-border flex w-full bg-white p-4">
        <div className="mr-4 flex items-center md:hidden">{MenuIcon()}</div>
        <Logo />
        <Navbar />
        <div className="flex items-center justify-end space-x-1 text-sm font-medium text-gray-800">
          <Link href="/user/login" className="btn hover: rounded bg-white px-3 py-2 transition sm:inline">
            登录
          </Link>
          <Link href="/user/register" className="btn rounded bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-700">
            注册
          </Link>
        </div>
      </div>
      {/* 移动端菜单 */}
      <div className={styles['mobile-menu']}></div>
    </>
  )
}
