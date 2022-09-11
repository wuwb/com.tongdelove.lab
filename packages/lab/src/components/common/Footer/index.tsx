import { Link } from '@/components/ui/Link';
import { ReactNode } from 'react';
import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

export function Copyright(props: any) {
  return (
    <div className="text-center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      <Link href="https://lab.tongdelove.com/">
        海维包装实验室
      </Link>{' '}
      All Rights Reserved.
    </div>
  );
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
  ];
  return (
    <div className="divider-top mt-8 py-3 md:py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {footers.map(footer => (
          <div className="" key={footer.title}>
            <div>
              {footer.title}
            </div>
            <ul className="list-none m-0 p-0">
              {footer.description.map(item => (
                <li key={item}>
                  <Link href="#">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Copyright />
      {/* <SwitchLang></SwitchLang> */}
    </div>
  );
}

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList: ReactNode;
  children: ReactNode;
};

export function CenteredFooter(props: ICenteredFooterProps) {
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
  );
}

