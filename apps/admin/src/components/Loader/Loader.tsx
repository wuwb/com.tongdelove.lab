import clsx from 'clsx';
import styles from './Loader.less';

const Loader = ({ spinning = false, fullScreen }) => {
  return (
    <div
      className={clsx(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  );
};

export default Loader;
