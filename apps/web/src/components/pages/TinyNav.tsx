import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const SubNav = styled.div`
  border-bottom: 1px solid #e6e5e3;
  a {
    display: inline-block;
    border-bottom: 1px solid transparent;
    padding: 14px 2px 15px 2px;
    margin: 0 20px -1px 0;
    color: #898884;
    text-decoration: none;
  }
  a.active {
    color: #000;
    border-bottom: 1px solid #000;
  }
  a:hover {
    color: #000;
  }
`;

const TinyNav = ({ navs }) => {
  const router = useRouter();
  return (
    <SubNav className="text-center">
      {
        navs.map((item) => {
          return (
            <Link href={item.href} key={item.href} passHref>
              <a className={router.pathname === item.href ? 'active' : ''}>{item.name}</a>
            </Link>
          )
        })
      }
    </SubNav>
  );
};

export default TinyNav;
