import React from 'react'
import styles from './Modal.v.1.module.scss'
import { Button } from '../Button'
import { TbBrandNytimes } from 'react-icons/tb'

export function Modal({ isModalOpen, setIsModalOpen, children }) {
  const modalStyle = isModalOpen ? styles.modal : styles.closedModal

  function handleOnKeyUp(e) {
    e = e || window.event
    if (e.keyCode === 27) {
      setIsModalOpen(false)
    }
  }

  function handleClose() {
    setIsModalOpen(false)
  }

  return (
    <dialog className={modalStyle} data-name="close" onClick={handleClose} onKeyUp={e => handleOnKeyUp(e)}>
      <div className={styles.modal__content}>
        <div className="modal__icon-wrapper modal__close">
          <p>
            <Button title="Add a project" onClick={setIsModalOpen(false)}>
              <TbBrandNytimes />
            </Button>
          </p>
        </div>
        {children}
      </div>
    </dialog>
  )
}
