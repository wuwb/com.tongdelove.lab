import styles from './max-width-container.module.css'

export function MaxWidthContainer({ children }) {
  return <div className={styles.container}>{children}</div>
}
