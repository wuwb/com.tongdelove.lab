import { ReactNode } from 'react'
import { FooterCopyright } from './FooterCopyright'
import { FooterIconList } from './FooterIconList'

type ICenteredFooterProps = {
  logo: ReactNode
  iconList: ReactNode
  children: ReactNode
}

export const CenteredFooter = (props: ICenteredFooterProps) => {
  return (
    <div className="text-center">
      {props.logo}

      <nav>
        <ul className="navbar mt-5 flex flex-row justify-center text-xl font-medium text-gray-800">
          {props.children}
        </ul>
      </nav>

      <div className="mt-8 flex justify-center">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>

      <div className="mt-8 text-sm">
        <FooterCopyright />
      </div>
    </div>
  )
}
