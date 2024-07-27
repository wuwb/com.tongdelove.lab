import Link from 'next/link'
import React from 'react'
import { Text } from '@mantine/core'

export function Copyright() {
  return (
    <Text variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href="/" passHref>
        My Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Text>
  )
}
