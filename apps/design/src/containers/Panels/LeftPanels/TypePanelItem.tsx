
import styles from './TypePanelItem.module.css';

const TypePanelItem = (props) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.item}>PPT</div>
            <div className={styles.item}>头图</div>
            <div className={styles.item}>纸盒</div>
            <div className={styles.item}>纸套</div>
        </div>
    );
}

export default TypePanelItem;
