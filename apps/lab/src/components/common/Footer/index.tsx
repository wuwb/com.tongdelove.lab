import { Link } from '@/components/ui2/Link'
import { ReactNode } from 'react'
import { FooterCopyright } from './FooterCopyright'
import { FooterIconList } from './FooterIconList'

export function Copyright(props: any) {
  return (
    <div className="flex items-center justify-center text-center" {...props}>
      <p className="mb-0 text-base">
        <a href="https://beian.miit.gov.cn/">浙ICP备00000000号-1</a>
        {'Copyright © '}
        {new Date().getFullYear()}
        <Link href="https://lab.tongdelove.com/">海维包装实验室</Link>
        <span>版权所有。</span>
      </p>
    </div>
  )
}

export function Footer(props): any {
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ]
  return (
    <div className="section relative flex overflow-hidden bg-primary pb-4 text-white">
      <div className="container">
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {footers.map(footer => (
            <div className="" key={footer.title}>
              <div>{footer.title}</div>
              <ul className="m-0 list-none p-0">
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-t border-solid border-gray-800 lg:my-12" />
        <Copyright />
        {/* <SwitchLang></SwitchLang> */}
      </div>
    </div>
  )
}

type ICenteredFooterProps = {
  logo: ReactNode
  iconList: ReactNode
  children: ReactNode
}

export function CenteredFooter(props: ICenteredFooterProps) {
  return (
    <div className="text-center">
      {props.logo}

      <nav>
        <ul className="navbar mt-5 flex flex-row justify-center text-xl font-medium text-gray-800">{props.children}</ul>
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
