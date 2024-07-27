import React from 'react'
import { Card, CardContent, Divider, Box, Text, Chip } from '@mantine/core'

export const BaseCard = (props) => {
  return (
    <Card>
      <Box p={2} display="flex">
        <Text variant="h4">{props.title}</Text>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}
