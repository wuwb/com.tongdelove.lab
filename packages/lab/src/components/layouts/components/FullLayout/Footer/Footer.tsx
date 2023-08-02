import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { CurrentDateTime } from '@/components/common/datetime/CurrentTime/CurrentDateTime';

type Props = {
  siteTitle?: string;
}

const Footer = (props: Props = { siteTitle: '海维包装' }) => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>
        <div>
          © {new Date().getFullYear()} by {props.siteTitle}
        </div>
        <cite>
          <Link href="https://www.tongdelove.com">
            tongdelove.com
          </Link>{" "}
        </cite>
      </Typography>
      <CurrentDateTime updateBy="minute" />
    </Box>
  );
};

export default Footer;
