import { ModalSlots, SlotsToClasses } from '@heroui/react';

import { DrawerPlacement, DrawerSize } from './CDrawer.type';

export const DrawerSizeClasses: Record<DrawerSize, Record<DrawerPlacement, string>> = {
    [DrawerSize.Tiny]: {
        [DrawerPlacement.Left]: 'max-w-[340px] min-w-[340px]',
        [DrawerPlacement.Right]: 'max-w-[340px] min-w-[340px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.TinySmall]: {
        [DrawerPlacement.Left]: 'max-w-[464px] min-w-[464px]',
        [DrawerPlacement.Right]: 'max-w-[464px] min-w-[464px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.Small]: {
        [DrawerPlacement.Left]: 'max-w-[568px] min-w-[568px]',
        [DrawerPlacement.Right]: 'max-w-[568px] min-w-[568px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.Medium]: {
        [DrawerPlacement.Left]: 'max-w-[704px] min-w-[704px]',
        [DrawerPlacement.Right]: 'max-w-[704px] min-w-[704px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.MediumLarge]: {
        [DrawerPlacement.Left]: 'max-w-[852px] min-w-[852px]',
        [DrawerPlacement.Right]: 'max-w-[852px] min-w-[852px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.Large]: {
        [DrawerPlacement.Left]: 'max-w-[1072px] min-w-[1072px]',
        [DrawerPlacement.Right]: 'max-w-[1072px] min-w-[1072px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
    [DrawerSize.Extra]: {
        [DrawerPlacement.Left]: 'max-w-[1200px] min-w-[1200px]',
        [DrawerPlacement.Right]: 'max-w-[1200px] min-w-[1200px]',
        [DrawerPlacement.Top]: 'w-full',
        [DrawerPlacement.Bottom]: 'w-full',
    },
};

export const DrawerPlacementClassName: Record<DrawerPlacement, SlotsToClasses<ModalSlots | 'dialog'>> = {
    [DrawerPlacement.Left]: {},
    [DrawerPlacement.Right]: {
        base: 'rounded-medium data-[placement=left]:sm:m-2 data-[placement=right]:sm:m-2 !w-fit !max-w-[calc(100%-78px)]',
    },
    [DrawerPlacement.Top]: {},
    [DrawerPlacement.Bottom]: {
        dialog: '!max-h-[calc(100%-78px)] h-full',
        base: 'rounded-medium  ',
    },
};
