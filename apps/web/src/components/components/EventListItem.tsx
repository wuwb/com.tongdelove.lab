import React from 'react'
import { Avatar } from '@chakra-ui/react'

interface EventListItemProps {
  username: string
  created: string
  children: string | React.ReactNode
}

export const EventListItem = ({
  children,
  username,
  created,
}: EventListItemProps) => {
  return (
    <div className="item-center border-bottom flex py-5 text-base">
      <Avatar
        name={`${username} Avatar`}
        alt={`${username} Avatar`}
        size={32}
        className="mr-5"
        src={`https://vercel.com/api/www/avatar/?u=${username}&s=32`}
      />
      <p className="m-0 flex-1">{children}</p>
      <p className="mx-auto my-auto bg-gray-300 pl-5 text-right">{created}</p>
    </div>
  )
}
