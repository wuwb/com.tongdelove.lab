import { Outlet } from '@umijs/max';
import Styles from './index.less';

const SiderBoxCell = (props) => {
  return (
    <div className={Styles.boxCell}>
      <Outlet />
    </div>
  );
};

export default SiderBoxCell;
