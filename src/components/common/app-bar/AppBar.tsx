import { Navbar, NavbarContent, NavbarMenuToggle } from '@heroui/react';

import AppBarLogo from './comps/AppBarLogo';
import AppBarMenu from './comps/AppBarMenu';
import AppBarTab from './comps/AppBarTab';

const AppBar = () => {
    return (
        <Navbar
            shouldHideOnScroll
            maxWidth='2xl'
        >
            <NavbarContent
                className='sm:hidden'
                justify='start'
            >
                <NavbarMenuToggle />
            </NavbarContent>

            <AppBarLogo />
            <AppBarTab />

            <AppBarMenu />
        </Navbar>
    );
};

export default AppBar;
