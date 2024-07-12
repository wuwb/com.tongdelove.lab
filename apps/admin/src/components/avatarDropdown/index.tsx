import { LogoutOutlined } from '@ant-design/icons'
import { useModel } from '@umijs/max'
import { Avatar, Dropdown, Menu } from 'antd'
import { parse } from 'querystring'

function AvatarDropdown() {
  const { initialState, setInitialState } = useModel('@@initialState')

  const handleLogout = async () => {
    // await request({
    //   url: '/api/logout.json',
    //   method: 'post',
    //   successMessage: true,
    // });

    const { redirect } = parse(window.location.href.split('?')[1])
    console.log('window.location.pathname: ', window.location.pathname)
    if (window.location.pathname !== '/user/login' && !redirect) {
      console.log('window.location.pathname: ', window.location.pathname)
      // history.replace({
      //   pathname: '/user/login',
      //   search: stringify({
      //     redirect: window.location.href,
      //   }),
      // });

      setInitialState({
        ...initialState,
        currentUser: 'none',
      })
    }
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown menu={menu}>
      <Avatar
        style={{
          backgroundColor: '#00a2ae',
          cursor: 'pointer',
        }}
        size={26}
      >
        {initialState?.currentUser}
      </Avatar>
    </Dropdown>
  )
}

export default AvatarDropdown
