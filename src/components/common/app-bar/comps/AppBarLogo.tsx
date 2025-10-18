import { NavbarBrand, NavbarContent } from '@heroui/react';

import IconSoraFull from '@/assets/icons/common/SoraFull';

const AppBarLogo = () => {
    const handleClick = () => {};

    return (
        <NavbarContent
            className='pr-3'
            justify='center'
        >
            <NavbarBrand
                className='min-w-fit flex-grow-[unset] cursor-pointer'
                onClick={handleClick}
            >
                <IconSoraFull
                    height={48}
                    width={'auto'}
                />
            </NavbarBrand>
        </NavbarContent>
    );
};

export default AppBarLogo;
