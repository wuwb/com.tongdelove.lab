import React from 'react';
import { Avatar } from 'antd';

interface Props {
  username: string;
  created: string;
  children: string | React.ReactNode;
}

const EventListItem = ({ children, username, created }: Props) => {
  return (
    <div className="item-center flex text-base py-5 border-bottom">
      <Avatar
        alt={`${username} Avatar`}
        size={32}
        className="mr-5"
        src={`https://vercel.com/api/www/avatar/?u=${username}&s=32`}
      />
      <p className="flex-1 m-0">{children}</p>
      <p className="text-right pl-5 mx-auto my-auto bg-gray-300">{created}</p>
    </div>
  );
};

export default EventListItem;
