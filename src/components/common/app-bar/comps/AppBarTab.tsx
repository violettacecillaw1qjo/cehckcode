import { NavbarContent, NavbarItem } from '@heroui/navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { appRoutes } from '@/constants/routes';

import { useTranslation } from '@/cores/i18n';

const AppBarTab = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <NavbarContent
            className='hidden gap-4 sm:flex'
            justify='center'
        >
            {appRoutes.map((i) => {
                const { id, name } = i;
                const isActive = router.route === i.route;
                return (
                    <NavbarItem
                        key={id}
                        isActive={isActive}
                    >
                        <Link
                            color='foreground'
                            href='#'
                        >
                            {name ? t(name) : '-'}
                        </Link>
                    </NavbarItem>
                );
            })}
        </NavbarContent>
    );
};

export default AppBarTab;
