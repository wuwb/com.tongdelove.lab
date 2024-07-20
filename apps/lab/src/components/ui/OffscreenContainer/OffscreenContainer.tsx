import React from 'react'
import styles from './offscreen-container.module.css'
import { TbBrandNytimes } from 'react-icons/tb'

export const OffscreenContainer = ({
  isVisible,
  children,
  handleOffscreenContainer,
}) => {
  let classNames = styles.offscreenContainer
  const show = styles.offscreenContainerShow

  if (isVisible) {
    classNames += ` ${show}`
  }
  return (
    <div className={classNames} onClick={handleOffscreenContainer}>
      <button className={styles.button} onClick={handleOffscreenContainer}>
        <TbBrandNytimes />
      </button>
      {children}
    </div>
  )
}
