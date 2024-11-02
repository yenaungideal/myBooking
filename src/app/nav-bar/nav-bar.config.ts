export interface IMenuItem {
  icon?: string;
  trxMenuLabel: string;
  route: string;
  enabled?: boolean;
}

export const NAV_MENU: IMenuItem[] = [
  {
    icon: 'menu_dashboard',
    trxMenuLabel: 'trxMenu.dashboard',
    route: '/dashboard',
  },
  {
    icon: 'menu_booking',
    trxMenuLabel: 'trxMenu.booking',
    route: '/booking',
  },
  {
    icon: 'menu_profile',
    trxMenuLabel: 'trxMenu.profile',
    route: '/profile',
  },
  {
    icon: 'menu_logout',
    trxMenuLabel: 'trxMenu.logout',
    route: '/logout',
  },
];
