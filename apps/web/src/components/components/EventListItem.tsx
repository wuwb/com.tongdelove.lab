import React from 'react'
import { Avatar } from 'antd'

interface Props {
  username: string
  created: string
  children: string | React.ReactNode
}

const EventListItem = ({ children, username, created }: Props) => {
  return (
    <div className="item-center border-bottom flex py-5 text-base">
      <Avatar
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

export default EventListItem
