import { Link, withRouter } from '@umijs/max';
import './TinyNav.less';

const Home = ({ navs, history, location, match }) => {
  return (
    <div className="sub-nav">
      {navs.map((item) => {
        return (
          <Link to={item.href} key={item.href}>
            <a className={location.pathname === item.href ? 'active' : ''}>{item.name}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default withRouter(Home);
