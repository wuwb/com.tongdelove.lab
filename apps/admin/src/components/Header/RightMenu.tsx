import { Link } from '@umijs/max'
import { Grid, Menu } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const { useBreakpoint } = Grid

const RightMenu = () => {
  const { md } = useBreakpoint()
  return (
    <Menu mode={md ? 'horizontal' : 'inline'} theme="dark">
      <Menu.Item key="mail">
        <Link to="/user/login">Signin</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/user/register">Signup</Link>
      </Menu.Item>
    </Menu>
  )
}

export default RightMenu
