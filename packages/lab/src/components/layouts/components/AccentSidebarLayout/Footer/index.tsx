/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useLayout } from '@/components/layouts/core/useLayout';

const Footer: FC = () => {
  const { classes } = useLayout()
  return (
    <div id='wu_footer' className='footer py-4 d-flex flex-lg-column bg-white'>
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='#' className='text-gray-800 text-hover-primary'>
            Doowu
          </a>
        </div>

        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1 p-0 m-0 flex list-none'>
          <li className='menu-item'>
            <a href='#' className='menu-link ps-0 pe-2'>
              About
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0 pe-2'>
              Contact
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0'>
              Purchase
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export { Footer }
