import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

const fmtVer = (v: string) => v.replace('^', '').replace('~', '')

export const FooterNav = (props: {
  className: string
  alwaysDarkMode: string
  displayName: string
  style: string
}) => {
  return (
    <div
      className={clsx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${props.displayName}`,
        props.className
      )}
      style={props.style}
    >
      <div className={styles['copyright']}>
        © {new Date().getFullYear()}
        <a href="/" target="_blank" rel="noreferrer">
          appName
        </a>{' '}
      </div>

      {/* <div className={styles['deps']}>
        {deps.map((d) => (
          <div className={styles['dep']} key={d.k}>
            <strong>{d.k}</strong>
            <sup>{d.v}</sup>
          </div>
        ))}
      </div> */}
    </div>
  )
}
