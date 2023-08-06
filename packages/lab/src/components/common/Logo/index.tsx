import { Link } from '@/components/ui/Link';
import { Box, styled } from '@mui/material';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
        &:hover {
          text-decoration: none;
        }
`);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`);

export function Logo(props) {
  const { t } = useTranslation();

  return (
    <LogoWrapper className={cx(props.className, 'flex items-center flex-1 md:flex-initial')} href="/">
      <div className="bg-red-400 text-white rounded-full w-10 h-10 text-center leading-10">HAI</div>
      <LogoTextWrapper>
        <LogoText>海维包装实验室</LogoText>
      </LogoTextWrapper>
    </LogoWrapper>
  );
}
