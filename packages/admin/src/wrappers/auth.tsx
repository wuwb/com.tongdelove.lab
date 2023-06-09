import { Outlet, Redirect, Navigate } from '@umijs/max';

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
