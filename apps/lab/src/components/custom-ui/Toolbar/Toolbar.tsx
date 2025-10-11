import styles from './toolbar.module.scss'
import clsx from 'clsx'

export function Toolbar({ children }) {
  return <div className={clsx('border', styles.toolbar)}>{children}</div>
}
