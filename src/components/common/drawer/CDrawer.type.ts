import { DrawerProps, ModalSlots, SlotsToClasses } from '@heroui/react';

export type CDrawerProps = {
    children?: any;
    open?: boolean;
    hideHeader?: boolean;
    acceptable?: boolean;
    hideFooter?: boolean;
    size?: DrawerSize;
    title?: string;
    onChange?: Function;
    onClose?: Function;
    onAccept?: Function;
    placement?: DrawerPlacement;
    classNames?: SlotsToClasses<ModalSlots | 'dialog'>;
} & Omit<DrawerProps, 'size' | 'placement' | 'children' | 'classNames' | 'onClose'>;

export enum DrawerSize {
    /**
     * @constant `340`
     */
    Tiny = 'tiny',
    /**
     * @constant `464`
     */
    TinySmall = 'tinySmall',
    /**
     * @constant `568`
     */
    Small = 'small',
    /**
     * @constant `704`
     */
    Medium = 'medium',
    /**
     * @constant `852`
     */
    MediumLarge = 'mediumLarge',
    /**
     * @constant `1072`
     */
    Large = 'large',
    /**
     * @constant `1200`
     */
    Extra = 'extra',
}

export enum DrawerPlacement {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left',
}
