import Link from 'next/link'
import { Button } from '@/components/ui/button'
import styled from '@emotion/styled'

const popoverContent = () => (
  <>
    <p>
      <Link href="/apps/daohang">导航</Link>
    </p>
    <p>
      <Link href="/">GitHub</Link>
    </p>
    <p>
      <Link href="/">Logout</Link>
    </p>
  </>
)

export const Menu = ({ toggleDarkMode }: any) => {
  const Header = styled('div')`
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    height: 60px;
    background-color: #ddd;
    border-bottom: solid 1px #ddd;

    position: -webkit-sticky;
    position: sticky;
    position: fixed;
    top: 0px;
    z-index: 40;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-duration: 150ms;
  `
  const HeaderContent = styled('div')`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  const HeaderTitle = styled('div')`
    font-weight: 500;
    display: flex;
    align-items: center;
    padding-left: 10px;
  `
  const Sidebar = styled('div')`
    display: flex;
    align-items: center !important;
  `

  const HeaderPlaceholder = styled.div`
    padding-top: var(--header-height);
  `

  return (
    <div>
      <HeaderPlaceholder></HeaderPlaceholder>
      <Header id="header">
        <HeaderContent>
          <div style={{ display: 'flex' }}>
            <svg width={28} height={25} viewBox="0 0 75 65" fill="#000">
              <path d="M37.59.25l36.95 64H.64l36.95-64z" />
            </svg>

            <HeaderTitle>
              <Link href="/">半祥包装</Link>
            </HeaderTitle>
          </div>
          <Sidebar>
            {/* <ThemeIcon
              aria-label="Toggle Dark mode"
              auto
              type="abort"
              onClick={toggleDarkMode}
            >
                <Icons.Sun size={16} />
            </ThemeIcon> */}
            <div>
              <Link href="/login">
                <Button type="button">登录</Button>
              </Link>
              <Link href="/choose">
                <Button type="button">开始</Button>
              </Link>
              {/* <Popover title="User Settings" content={popoverContent} placement="bottomEnd" portalClassName="popover">
                <Avatar text="链接" />
              </Popover> */}
            </div>
          </Sidebar>
        </HeaderContent>
      </Header>
    </div>
  )
}
