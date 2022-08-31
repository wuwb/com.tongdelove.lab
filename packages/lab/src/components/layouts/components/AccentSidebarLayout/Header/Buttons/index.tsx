import Box from '@mui/material/Box';
import HeaderNotifications from './Notifications';
import LanguageSwitcher from './LanguageSwitcher';

function HeaderButtons() {
  return (
    <Box>
      <HeaderNotifications />
      <LanguageSwitcher />
    </Box>
  );
}

export default HeaderButtons;
