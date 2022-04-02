import styles from './index.module.css';

const BackgroundPanel = (props) => {
    return (
        <div
          className={styles.subTitle}>
            {props.title}
        </div>
    );
}

export default BackgroundPanel;
