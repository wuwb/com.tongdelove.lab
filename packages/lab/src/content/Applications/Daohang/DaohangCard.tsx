import styles from './DaohangCard.module.css';

export default function DaohangCard(props) {
    const { item } = props;
    return (
        <div className={styles.wrap}>
            <a className={styles.card} href={item.path}>
                <div className={styles.name}>
                    {item.name}
                </div>
                <div className={styles.desc}>{item.desc}</div>
            </a>
        </div>
    );
}
