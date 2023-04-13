import { Redirect } from '@umijs/max'
import { Outlet } from '@umijs/max';

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
