import React from 'react'
import { Link } from '@/components/custom-ui/Link'
import styles from './Logo.module.scss'

export function Logo({ siteTitle }) {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <span></span>
        <p>{siteTitle}</p>
      </Link>
    </div>
  )
}
