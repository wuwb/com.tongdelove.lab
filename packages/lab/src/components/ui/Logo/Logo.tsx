import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Logo.module.css';

export default function Logo({ siteTitle }) {
    return (
        <div className={style.logo}>
            <Link to="/">
                <span>
                    <FontAwesomeIcon icon={['fas', 'laptop-code']} />
                </span>
                <p>{siteTitle}</p>
            </Link>
        </div>
    );
}
