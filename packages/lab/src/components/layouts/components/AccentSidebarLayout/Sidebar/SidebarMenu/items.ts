import type { ReactNode } from 'react';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'General',
    items: [
      {
        name: 'Blueprints',
        // icon: BackupTableTwoToneIcon,
        items: [
          {
            name: 'Extended Sidebar',
            link: '/dashboards/reports',
            badge: 'v3.0',
            badgeTooltip: 'Added in version 3.0'
          },
          {
            name: 'Accent Header',
            link: '/blueprints/accent-header/dashboards/reports',
            badge: '',
            badgeTooltip: 'Updated'
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
        link: '/blueprints/accent-sidebar/dashboards',
        items: [
          {
            name: 'Reports',
            link: '/blueprints/accent-sidebar/dashboards/reports',
            badge: '',
            badgeTooltip: 'Reports Dashboard - version 3.0'
          },
          {
            name: 'Automation',
            link: '/blueprints/accent-sidebar/dashboards/automation'
          },
          {
            name: 'Healthcare',
            link: '/blueprints/accent-sidebar/dashboards/healthcare',
            items: [
              {
                name: 'Doctors',
                link: '/blueprints/accent-sidebar/dashboards/healthcare/doctor'
              },
              {
                name: 'Hospital',
                link: '/blueprints/accent-sidebar/dashboards/healthcare/hospital'
              }
            ]
          },
        ]
      }
    ]
  },
  {
    heading: 'Demos',
    items: [
      {
        name: 'Overview',
        link: '/',
        // icon: DesignServicesTwoToneIcon
      },
    ]
  },
  {
    heading: 'Apps',
    items: [
      {
        name: 'Overview',
        link: '/',
        // icon: DesignServicesTwoToneIcon
      },
    ]
  }
];
export default menuItems;
