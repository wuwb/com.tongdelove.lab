import { Language } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies, withCookies } from 'react-cookie';

// https://headlessui.dev/react/menu#integrating-with-next-js
const CustomLink = ({ href, children, as, locale, ...props }): JSX.Element => {
  return (
    <Link href={href} as={as} locale={locale} {...props}>
      {children}
    </Link>
  );
};

const localeText = (locale: string): string => {
  switch (locale) {
    case 'en':
      return '🇬🇧 English';
    case 'zh-CN':
      return '🇨🇳 简体中文';
    default:
      return '🇬🇧 English';
  }
};

const SwitchLang = () => {
  const { locales, pathname, query, asPath } = useRouter();
  console.log('locales: ', locales);

  const [_, setCookie] = useCookies(['NEXT_LOCALE']);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddLanguage = () => window.open('/', '_blank');

  return (
    <div className="relative">
      <Button
        id="basic-button"
        className="flex items-center space-x-1.5 hover:opacity-80 dark:text-white"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Language className="h-4 w-4" />
        <KeyboardArrowDownIcon className="h-3 w-3" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {locales!.map(locale => (
          <MenuItem key={locale} onClick={handleClose}>
            <CustomLink
              key={locale}
              href={{ pathname, query }}
              as={asPath}
              locale={locale}
              onClick={() => setCookie('NEXT_LOCALE', locale, { path: '/' })}
            >
              <div className="m-1 cursor-pointer rounded px-2 py-1 text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-600/10 dark:hover:text-blue-400">
                {localeText(locale)}
              </div>
            </CustomLink>
          </MenuItem>
        ))}
        <MenuItem>
          <span className="font-bold" onClick={handleAddLanguage}>
            Add your language
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withCookies(SwitchLang);
