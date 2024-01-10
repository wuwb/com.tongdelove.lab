import { Outlet } from '@umijs/max';
import styles from './title.less';

function Title(props) {
  return (
    <div className={styles['title']}>
      <div>
        <h3 className="text-lg font-bold">{props.title}</h3>
        {/* {props.subTitle ? <div className="text-gray-500">{props.subTitle}</div> : null} */}
      </div>
      <Outlet />
    </div>
  );
}

export default Title;
