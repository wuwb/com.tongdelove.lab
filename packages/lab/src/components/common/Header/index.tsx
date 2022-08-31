import Router from 'next/router';
import { Logo } from '../Logo';
import { Link, Button } from '@/components/ui';

export function Header() {
  const handleRedirectToDashboards = () => {
    Router.push('/dashboard');
  };

  return (
    <div className="max-w-8xl sticky top-0 z-30 mx-auto flex bg-white px-4">
      <div className="flex w-full justify-between py-4">
        <div>
          {/* <button className="flex appearance-none p-1 text-gray-500 md:hidden">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 256 256">
              <line
                x1="40"
                y1="128"
                x2="216"
                y2="128"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="40"
                y1="64"
                x2="216"
                y2="64"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="40"
                y1="192"
                x2="216"
                y2="192"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
            </svg>
          </button> */}
          <div className="mr-5 flex flex-1 items-center">
            <Logo />
          </div>
        </div>
        <div className="flex flex-1 items-center space-x-2 text-sm font-medium text-gray-800 md:flex">
          <ul className="flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
                href="/pricing"
              >
                价格
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
                href="/about"
              >
                关于
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
                href="/case-studies"
              >
                客户
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
                href="/forum"
              >
                论坛
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
                href="/links"
              >
                导航
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"

                href="/etf-grid"
              >
                ETF 网格工具
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard">
                后台
              </Link>
            </li>
          </ul>
        </div>
        <nav className="flex items-center justify-end space-x-1 text-sm font-medium text-gray-800">
          <Link href="/user/login" className="hidden rounded bg-white px-3 py-2 transition hover:bg-gray-100 sm:inline">
            登录
          </Link>
          <Link href="/user/register" className="rounded bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-700">
            注册
          </Link>
        </nav>
      </div>

      {/* 小屏显示 */}
      <div className="flex pb-4 lg:hidden lg:px-6"></div>
    </div>
  );
}
