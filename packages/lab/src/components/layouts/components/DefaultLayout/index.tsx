import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import Header from './Header';

interface DefaultProps {
  children?: ReactNode;
}

export const DefaultLayout: FC<DefaultProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          '.MuiPageTitle-wrapper': {
            background: theme.palette.mode === 'dark' ? theme.colors.alpha.trueWhite[5] : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
          },
        }}
      >
        <Header />
        <Box display="block">{children}</Box>
      </Box>
    </>
  );
};
