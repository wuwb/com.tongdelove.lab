import React from 'react';
import { Link } from '@/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Logo.module.scss';

export function Logo({ siteTitle }) {
    return (
        <div className={styles.logo}>
            <Link to="/">
                <span>
                    <FontAwesomeIcon icon={['fas', 'laptop-code']} />
                </span>
                <p>{siteTitle}</p>
            </Link>
        </div>
    );
}
