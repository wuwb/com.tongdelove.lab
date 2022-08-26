import { Box, Tooltip, Badge, styled, useTheme } from '@mui/material';
import { Link } from '@/components/ui/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  ({ theme }) => `
        width: 80px;
        height: 38px;
        transition: ${theme.transitions.create(['transform'])};
        &:hover {
          transform: scale(1.1);
        }
`
);



function Logo() {
  const theme = useTheme();

  return (
    <LogoWrapper href="/">
      <Tooltip
        arrow
        placement="right"
        title=""
      >
        {/* <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8,
              background: theme.colors.alpha.black[30],
              color: theme.colors.alpha.trueWhite[100]
            }
          }}
          overlap="circular"
          badgeContent="3.0"
        > */}
        <LogoSignWrapper>
          游鹿社区
        </LogoSignWrapper>
        {/* </Badge> */}
      </Tooltip>
    </LogoWrapper>
  );
}

export default Logo;
