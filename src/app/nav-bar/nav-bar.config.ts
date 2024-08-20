export interface IMenuItem{
    icon?:string;
    trxMenulabel:string;
    route:string;
    enabled?:boolean;
}

export const NAV_MENU: IMenuItem[] = [
    {
        icon:'menu_dashboard',
        trxMenulabel:'trxMenu.dashboard',
        route:'/dashboard'
    },
    {
        icon:'menu_booking',
        trxMenulabel:'trxMenu.booking',
        route:'/booking'
    },
    {
        icon:'menu_profile',
        trxMenulabel:'trxMenu.profile',
        route:'/profile'
    },
    {
        icon:'menu_logout',
        trxMenulabel:'trxMenu.logout',
        route:'/logout'
    }
]