import { FC, ReactNode } from 'react';

interface BaseLayoutProps {
  children?: ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};
