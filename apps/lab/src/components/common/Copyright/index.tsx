import Link from 'next/link'
import React from 'react'

export function Copyright() {
  return (
    <div variant="body2" color="divSecondary" align="center">
      {'Copyright © '}
      <Link href="/" passHref>
        My Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </div>
  )
}
