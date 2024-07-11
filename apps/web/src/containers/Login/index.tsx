import React from 'react';
import cx from 'classnames';
import LoginForm from '../LoginForm/index';

import style from './index';

const Login = () => {
    return (
        <div className={style['wrapper']}>
            <div className={cx('g-full-container', style['full-container'])}>
                <div className={style['login-box']}>
                    <h2 className={style['title']}>Login</h2>
                    <div className={style['login-form']}>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;