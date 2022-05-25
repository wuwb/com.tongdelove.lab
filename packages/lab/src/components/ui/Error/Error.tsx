import React from 'react';

import styles from './error.module.css';

const Error = ({ message }) => {
    return <div className={styles.error}>{message}</div>;
};

export default Error;
