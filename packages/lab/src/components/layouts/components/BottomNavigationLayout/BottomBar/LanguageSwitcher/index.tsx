import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Popover,
  Tooltip,
  styled
} from '@mui/material';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';


const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);
const ImageWrapper = styled('img')(
  () => `
        width: 30px;
        margin: 3px;
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    display: inline-flex;
    width: 58px;
    border-radius: ${theme.general.borderRadiusLg};
    height: 58px;
    justify-content: center;
    font-size: ${theme.typography.pxToRem(13)};
    padding: 0;
    position: relative;

    .MuiSvgIcon-root {
      transition: ${theme.transitions.create(['color'])};
      font-size: ${theme.typography.pxToRem(28)};
      color: ${theme.colors.alpha.trueWhite[50]};
    }

    &.Mui-active,
    &:hover {
      background-color: ${theme.colors.alpha.black[10]};

      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.trueWhite[100]};
      }
    }
`
);

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t }: { t: any } = useTranslation();
  const getLanguage = i18n.language;

  const switchLanguage = ({ lng }: { lng: any }) => {
    // internationalization.changeLanguage(lng);
  };
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t('Language Switcher')}>
        <IconButtonPrimary color="primary" ref={ref} onClick={handleOpen}>
          {getLanguage === 'en' && '英文'}
          {getLanguage === 'cn' && '中文'}
        </IconButtonPrimary>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{
            maxWidth: 240
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t('Language Switcher')}
          </SectionHeading>
          <List
            sx={{
              p: 2
            }}
            component="nav"
          >
            <ListItem
              className={
                getLanguage === 'en' || getLanguage === 'en-US' ? 'active' : ''
              }
              button
              onClick={() => {
                switchLanguage({ lng: 'en' });
                handleClose();
              }}
            >
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="English"
              />
            </ListItem>
            <ListItem
              className={getLanguage === 'cn' ? 'active' : ''}
              button
              onClick={() => {
                switchLanguage({ lng: 'cn' });
                handleClose();
              }}
            >
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Chinese"
              />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
