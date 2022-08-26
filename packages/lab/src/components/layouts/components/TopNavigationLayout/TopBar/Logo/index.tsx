import { Box, Tooltip, styled } from '@mui/material';
import { Link } from '@/components/ui/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[100]};
        padding: 0;
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
  return (
    <LogoWrapper href="/">
      <Tooltip
        arrow
        placement="right"
        title="Tokyo NextJS Typescript Admin Dashboard"
      >
        <LogoSignWrapper>
          游鹿社区
        </LogoSignWrapper>
      </Tooltip>
    </LogoWrapper>
  );
}

export default Logo;
