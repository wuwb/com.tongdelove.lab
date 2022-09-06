import React from 'react';
import styles from './main-page-wrapper.module.scss';

export const MainPageWrapper = ({ children }) => {
    return (
        <div className={styles.mainWrapper}>
            <main>{children}</main>
        </div>
    );
}

