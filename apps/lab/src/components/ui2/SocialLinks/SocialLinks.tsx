import React from 'react';
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandBandcamp,
    IconBrandSoundcloud,
} from '@tabler/icons-react';

import styles from './SocialLinks.module.scss';

const SocialLinks = () => {
    return (
        <ul className={styles.socialLinks}>
            <li>
                <a href="https://www.facebook.com/keithbkelly">
                    <IconBrandFacebook />
                </a>
            </li>
            <li>
                <a href="http://www.instagram.com/a_grand_apparatus">
                    <IconBrandInstagram />
                </a>
            </li>
            <li>
                <a href="https://twitter.com/grand_apparatus">
                    <IconBrandTwitter />
                </a>
            </li>
            <li>|</li>
            <li>
                <a href="http://www.edgetonerecords.com/keith_kelly.html">
                    <IconBrandBandcamp />
                </a>
            </li>
            <li>
                <a href="https://soundcloud.com/keithbkelly">
                    <IconBrandSoundcloud />
                </a>
            </li>
        </ul>
    );
};

export default SocialLinks;
