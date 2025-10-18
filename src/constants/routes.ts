export const appTabRoute = '[tabId]';
export const AppSettingPath: string = '/setting';

export type Router<T = string> = {
    id: T;
    route: string;
    name?: string;
    tabs?: Router[];
    icon?: any;
    iconColor?: string;
};

export const appRoutes: Router[] = [
    {
        id: 'private-policy',
        name: 'privatePolicy',
        route: '/private-policy',
    },
];
