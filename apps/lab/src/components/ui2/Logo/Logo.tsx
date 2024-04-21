import React from 'react'
import { Link } from '@/components/ui'
import styles from './Logo.module.scss'
import { IconDeviceLaptop } from '@tabler/icons-react'

export function Logo({ siteTitle }) {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <span>
          <IconBrandMantine />
        </span>
        <p>{siteTitle}</p>
      </Link>
    </div>
  )
}
