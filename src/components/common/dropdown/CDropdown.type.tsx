import { OptionItem } from '@/types/common.type';

export enum DropdownPlacement {
    Top = 'top',
    Bottom = 'bottom',
    Right = 'right',
    Left = 'left',
    TopStart = 'top-start',
    TopEnd = 'top-end',
    BottomStart = 'bottom-start',
    BottomEnd = 'bottom-end',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
    RightStart = 'right-start',
    RightEnd = 'right-end',
}

export type DropdownRenderItem = (item: OptionItem) => any;
export type DropdownClassNames = {
    base?: string;
    content?: string;
    trigger?: string;
    backdrop?: string;
    arrow?: never;
};
