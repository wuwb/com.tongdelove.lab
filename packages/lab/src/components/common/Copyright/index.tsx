import MUILink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href="/" passHref>
        <MUILink color="inherit">My Website</MUILink>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
