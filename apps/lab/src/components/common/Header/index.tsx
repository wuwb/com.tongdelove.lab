import { Link } from '@/components/ui';
import { Logo } from '../Logo';
import styles from './Header.module.scss';
import { Navbar } from './Navbar';

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
      <div className="w-full sticky top-0 z-30 mx-auto flex box-border bg-white p-4">
        <div className="md:hidden flex items-center mr-4" >
          {MenuIcon()}
        </div>
        <Logo />
        <Navbar />
        <div className="flex items-center justify-end space-x-1 text-sm font-medium text-gray-800">
          <Link href="/user/login" className="btn rounded bg-white px-3 py-2 transition hover:bg-gray-100 sm:inline">
            登录
          </Link>
          <Link href="/user/register" className="btn rounded bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-700">
            注册
          </Link>
        </div>
      </div>
      {/* 移动端菜单 */}
      <div className={styles['mobile-menu']}>

      </div>
    </>
  );
}
