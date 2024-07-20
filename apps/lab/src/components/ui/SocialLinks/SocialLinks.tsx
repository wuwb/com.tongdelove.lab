import React from 'react'
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandBandcamp,
  TbBrandSoundcloud,
} from 'react-icons/tb'

import styles from './SocialLinks.module.scss'

const SocialLinks = () => {
  return (
    <ul className={styles.socialLinks}>
      <li>
        <a href="https://www.facebook.com/keithbkelly">
          <TbBrandFacebook />
        </a>
      </li>
      <li>
        <a href="http://www.instagram.com/a_grand_apparatus">
          <TbBrandInstagram />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/grand_apparatus">
          <TbBrandTwitter />
        </a>
      </li>
      <li>|</li>
      <li>
        <a href="http://www.edgetonerecords.com/keith_kelly.html">
          <TbBrandBandcamp />
        </a>
      </li>
      <li>
        <a href="https://soundcloud.com/keithbkelly">
          <TbBrandSoundcloud />
        </a>
      </li>
    </ul>
  )
}

export default SocialLinks
