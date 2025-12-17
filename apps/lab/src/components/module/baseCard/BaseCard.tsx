import React from 'react'
import { Card , CardContent} from '@tongdelove/ui/components/card'

export const BaseCard = (props) => {
  return (
    <Card>
      <div p={2} display="flex">
        <Text variant="h4">{props.title}</Text>
      </div>
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}
