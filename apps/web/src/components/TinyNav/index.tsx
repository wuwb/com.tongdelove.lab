import Link from 'next/link'
import styled from '@emotion/styled'

const StyledTinyNav = styled.div`
  a {
    display: inline-block;
    margin: 0 20px -1px 0;
    padding: 14px 2px 15px 2px;
    color: #898884;
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }
  a.active {
    color: #000;
    border-bottom: 1px solid #000;
  }
  a:hover {
    color: #000;
  }
`

export const TinyNav = (props) => {
  const { navs } = props

  return (
    <StyledTinyNav className="text-center border-b border-[#e6e5e3]">
      {navs.map((item) => (
        <Link href={item.href} key={item.name}>
          {item.name}
        </Link>
      ))}
    </StyledTinyNav>
  )
}
