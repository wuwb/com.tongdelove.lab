import { Header } from '@/components/common/Header';
import { useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

interface DefaultProps {
  children?: ReactNode;
}

export const DefaultLayout: FC<DefaultProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
