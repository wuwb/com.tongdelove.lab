import { Link } from '@/components/ui2'
import styles from './Links.module.scss'

export function LinksNav() {
  return (
    <div className={styles.LinksNavBar}>
      <Link href="/">前端导航</Link> | <Link href="/">设计导航</Link> | <Link href="/">独立开发导航</Link> |<Link href="/">后端导航</Link> | <Link href="/">包装导航</Link> |
      <Link href="/">外包导航</Link> |
    </div>
  )
}
