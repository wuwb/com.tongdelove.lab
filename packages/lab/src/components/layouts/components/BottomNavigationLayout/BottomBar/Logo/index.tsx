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
        width: 52px;
        height: 38px;
        transform: scale(.8);
        transition: ${theme.transitions.create(['transform'])};

        &:hover {
        transform: scale(1);
        }
`
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
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
          <LogoSignInner />
        </LogoSignWrapper>
      </Tooltip>
    </LogoWrapper>
  );
}

export default Logo;
