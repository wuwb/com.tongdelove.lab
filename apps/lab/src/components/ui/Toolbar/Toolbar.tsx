import styles from "./toolbar.module.scss"

export default function Toolbar({ children }) {
  return <div className={styles.toolbar}>{children}</div>;
}
