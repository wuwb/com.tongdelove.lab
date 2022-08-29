import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  alpha,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Popover,
  Tooltip,
  styled
} from '@mui/material';
import { Text } from '@/components/ui';

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import internationalization from '@/i18n/i18n';
import { useTranslation } from 'next-i18next';
import { US, CN } from 'country-flag-icons/react/3x2';
import styles from './styles.module.css';


const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    margin-left: ${theme.spacing(1)};
    background: ${theme.colors.alpha.trueWhite[10]};
    color: ${theme.colors.alpha.trueWhite[70]};
    padding: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    transition: ${theme.transitions.create(['background', 'color'])};

    &.active,
    &:active,
    &:hover {
      background: ${alpha(theme.colors.alpha.trueWhite[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
    }
`
);

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t }: { t: any } = useTranslation();
  const getLanguage = i18n.language;

  const switchLanguage = ({ lng }: { lng: any }) => {
    internationalization.changeLanguage(lng);
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
          {getLanguage === 'en' && <US className={styles.country} />}
          {getLanguage === 'en-US' && (
            <US className={styles.country} />
          )}
          {getLanguage === 'en-GB' && (
            <US className={styles.country} />
          )}
          {getLanguage === 'cn' && <CN className={styles.country} />}
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
          vertical: 'top',
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
              <US className={styles.country} />
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
              <CN className={styles.country} />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Chinese"
              />
            </ListItem>
          </List>
          <Divider />
          <Text color="warning">
            <Box
              p={2}
              sx={{
                maxWidth: 340
              }}
            >
              <WarningTwoToneIcon fontSize="small" />
              <Typography variant="body1">
                {t(
                  'We only translated a small part of the template, for demonstration purposes'
                )}
                !
              </Typography>
            </Box>
          </Text>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
