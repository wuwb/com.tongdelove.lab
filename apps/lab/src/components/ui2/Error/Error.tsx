import React from 'react';
import styles from './error.module.scss';

export const Error = ({ message }) => {
    return <div className={styles.error}>{message}</div>;
};

