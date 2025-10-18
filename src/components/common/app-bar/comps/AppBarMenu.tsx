import { NavbarMenu, NavbarMenuItem } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { appRoutes } from '@/constants/routes';

import { useTranslation } from '@/cores/i18n';

const AppBarMenu = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <NavbarMenu>
            {appRoutes.map((i) => {
                const { id, name, route } = i;
                const isActive = router.route === route;
                return (
                    <NavbarMenuItem
                        key={id}
                        isActive={isActive}
                    >
                        <Link href={route}>{name ? t(name) : '-'}</Link>
                    </NavbarMenuItem>
                );
            })}
        </NavbarMenu>
    );
};

export default AppBarMenu;
