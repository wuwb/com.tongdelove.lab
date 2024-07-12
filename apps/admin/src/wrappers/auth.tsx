import { Outlet, useNavigate } from '@umijs/max'

const Auth = (props) => {
  const navigate = useNavigate()
  const { isLogin } = useAuth()
  if (isLogin) {
    return (
      <div>
        <Outlet />
      </div>
    )
  } else {
    return navigate('../login', { replace: true })
  }
}

export default Auth
