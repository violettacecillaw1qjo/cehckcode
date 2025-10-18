import { ButtonProps } from '@heroui/react';

export enum BtnVariant {
    Solid = 'solid',
    Bordered = 'bordered',
    Light = 'light',
    Flat = 'flat',
    Faded = 'faded',
    Shadow = 'shadow',
    Ghost = 'ghost',
}

export enum BtnColor {
    Primary = 'primary',
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Yellow = 'yellow',
    Danger = 'danger',
}

export enum BtnSize {
    /**
     * @constant `28`
     */
    Mini = 'mini',
    /**
     * @constant `28` square
     */
    MiniRound = 'miniRound',
    /**
     * @constant `32`
     */
    Small = 'small',
    /**
     * @constant `32` square
     */
    SmallRound = 'smallRound',
    /**
     * @constant `36`
     */
    Medium = 'medium',
    /**
     * @constant `36` square
     */
    MediumRound = 'mediumRound',
    /**
     * @constant `40`
     */
    Large = 'large',
    /**
     * @constant `40` square
     */
    LargeRound = 'largeRound',
    /**
     * @constant `48`
     */
    Extra = 'extra',
    /**
     * @constant `48` square
     */
    ExtraCircle = 'extraCircle',
}

export type CButtonProps = {
    color?: BtnColor;
    variant?: BtnVariant;
    size?: BtnSize;
} & Omit<ButtonProps, 'color' | 'variant' | 'size'>;
