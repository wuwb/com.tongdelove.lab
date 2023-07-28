import { Link as UmiLink } from '@umijs/max';
import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  [string]: any;
}

export const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const { to, children } = props;

  let isOutLink = false;

  if (to.indexOf('http') === 0) {
    isOutLink = true;
  }
  return (
    <>
      {isOutLink ? (
        <a {...props} href={to}>
          {children}
        </a>
      ) : (
        <UmiLink {...props} to={to}>
          {children}
        </UmiLink>
      )}
    </>
  );
};
