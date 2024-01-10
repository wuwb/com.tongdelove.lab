import { Outlet } from '@umijs/max';
import styles from './title.less';

function Title(props) {
  return (
    <div className={styles['section']} {...props}>
      <div className={styles['title']}>
        <h3>{props.title}</h3>
        {props.subTitle ? <div>{props.subTitle}</div> : null}
      </div>
      <Outlet />
    </div>
  );
}

export default Title;
