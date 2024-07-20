import Link from 'next/link'
import { ReactNode } from 'react'
import s from './FootNav.module.css'

interface Props {
  title: string
  navs: any[]
  children?: ReactNode
}

const Home = ({ title, navs, children }: Props) => {
  return (
    <ul className={s.footNav}>
      <>
        <li className="title">{title}</li>
        {navs.map(item => {
          return (
            <li key={item.href}>
              <Link href={item.href} className="item">
                {item.name}
              </Link>
            </li>
          )
        })}
        {children}
      </>
    </ul>
  )
}

export default Home
