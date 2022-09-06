import type { ReactNode } from 'react';
// import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
// import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
// import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
// import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
// import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/',
        // icon: DesignServicesTwoToneIcon
      },
      {
        name: 'Blueprints',
        // icon: BackupTableTwoToneIcon,
        badge: 'v3',
        items: [
          {
            name: 'Extended Sidebar',
            link: '/dashboards/reports',
            badge: 'v3.0'
          },
          {
            name: 'Accent Header',
            link: '/blueprints/accent-header/dashboards/reports',
            badge: ''
          },
          {
            name: 'Accent Sidebar',
            link: '/blueprints/accent-sidebar/dashboards/reports'
          },
        ]
      },
      {
        name: 'Dashboards',
        // icon: SmartToyTwoToneIcon,
        link: '/blueprints/top-navigation/dashboards',
        items: [
          {
            name: 'Reports',
            link: '/blueprints/top-navigation/dashboards/reports',
            badge: ''
          },
          {
            name: 'Automation',
            link: '/blueprints/top-navigation/dashboards/automation'
          },
        ]
      },
      {
        name: 'Auth Pages',
        // icon: VpnKeyTwoToneIcon,
        items: [
          {
            name: 'Login Basic',
            link: '/auth/login/basic?demo=true'
          },
          {
            name: 'Login Cover',
            link: '/auth/login/cover?demo=true'
          },
        ]
      },
      {
        name: 'Status',
        // icon: ErrorTwoToneIcon,
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
        ]
      },
      {
        name: '',
        // icon: MenuTwoToneIcon,
        link: '',
        items: [
          {
            name: 'Doctors',
            link: '/blueprints/top-navigation/dashboards/healthcare/doctor'
          },
        ]
      }
    ]
  }
];

export default menuItems;
