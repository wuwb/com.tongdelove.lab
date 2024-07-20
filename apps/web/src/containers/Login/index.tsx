import React from 'react'
import clsx from 'clsx'
import LoginForm from '../LoginForm/index'
import style from './index'

export const Login = () => {
  return (
    <div className={style['wrapper']}>
      <div className={clsx('g-full-container', style['full-container'])}>
        <div className={style['login-box']}>
          <h2 className={style['title']}>Login</h2>
          <div className={style['login-form']}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
