import { Button, ButtonProps } from '@heroui/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import { BtnColor, BtnSize, BtnVariant } from './CButton.type';
import { BtnColorClasses, BtnSizeClasses } from './CButton.variables';

type CButtonProps = {
    color?: BtnColor;
    variant?: BtnVariant;
    size?: BtnSize;
} & Omit<ButtonProps, 'color' | 'variant' | 'size'>;

const CButton = (props: CButtonProps) => {
    const {
        children,
        className,
        color = BtnColor.Primary,
        variant = BtnVariant.Faded,
        size = BtnSize.Medium,
        ...rest
    } = props as CButtonProps;

    const cClassName = useMemo<any>(() => {
        const result: string[] = [
            'font-bold',
            BtnColorClasses[color][variant],
            BtnSizeClasses[size],
        ];

        return result.join(' ');
    }, [variant, color, size]);

    return (
        <Button
            dataHover={false}
            className={clsx('w-fi min-w-fit', cClassName, className)}
            variant={variant as any}
            color={color as any}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default CButton;
