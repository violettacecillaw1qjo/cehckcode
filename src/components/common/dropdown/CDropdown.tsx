import type { PressEvent } from '@react-types/shared';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { OptionItem } from '@/types/common.type';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { DropdownClassNames, DropdownPlacement, DropdownRenderItem } from './CDropdown.type';

type CDropdownProps = {
    options: OptionItem[];
    children?: any;
    placement?: DropdownPlacement;
    classNames?: DropdownClassNames;
    nsI18n?: NsI18n;
    renderItem?: DropdownRenderItem;
    onSelect: (item: OptionItem, e: PressEvent) => void;
};

const CDropdown = (props: CDropdownProps) => {
    const {
        nsI18n,
        options,
        placement = DropdownPlacement.BottomStart,
        classNames,
        children,
        renderItem,
        onSelect,
    } = props as CDropdownProps;

    const { t } = useTranslation(nsI18n);

    return (
        <Dropdown
            placement={placement}
            classNames={classNames}
        >
            <DropdownTrigger className={'!transform-none !opacity-100'}>{children}</DropdownTrigger>
            <DropdownMenu variant={'flat'}>
                {options.map((item: OptionItem) => (
                    <DropdownItem
                        key={item.value}
                        className={'py-2'}
                        onPress={(e: PressEvent) => onSelect(item, e)}
                    >
                        {renderItem ? renderItem(item) : t(item.label)}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CDropdown;
