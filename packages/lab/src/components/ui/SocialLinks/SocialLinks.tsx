import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../utils/fontawesome';

import styles from './SocialLinks.module.css';

const SocialLinks = () => {
    return (
        <ul className={styles.socialLinks}>
            <li>
                <a href="https://www.facebook.com/keithbkelly">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                </a>
            </li>
            <li>
                <a href="http://www.instagram.com/a_grand_apparatus">
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
            </li>
            <li>
                <a href="https://twitter.com/grand_apparatus">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
            </li>
            <li>|</li>
            <li>
                <a href="http://www.edgetonerecords.com/keith_kelly.html">
                    <FontAwesomeIcon icon={['fab', 'bandcamp']} />
                </a>
            </li>
            <li>
                <a href="https://soundcloud.com/keithbkelly">
                    <FontAwesomeIcon icon={['fab', 'soundcloud']} />
                </a>
            </li>
        </ul>
    );
};

export default SocialLinks;
