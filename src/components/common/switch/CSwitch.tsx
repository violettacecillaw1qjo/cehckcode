import { Switch, SwitchProps } from '@heroui/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import { SwitchSize } from './CSwitch.type';
import { SwitchSizeClasses } from './CSwitch.variable';

type CSwitchProps = Omit<SwitchProps, 'children' | 'isSelected' | 'size'> & {
    checked: boolean;
    label?: string;
    children?: any;
    size?: SwitchSize;
};

const CSwitch = (props: CSwitchProps) => {
    const { checked, label, children, size = SwitchSize.Sm, classNames = {}, ...rest } = props as CSwitchProps;

    const cClassNames = useMemo<SwitchProps['classNames']>(() => {
        return {
            ...classNames,
            label: clsx('ms-4', classNames.label),
            thumb: clsx('group-data-[selected]:bg-green', SwitchSizeClasses[size]?.thumb, classNames.thumb),
            wrapper: clsx(
                'group-data-[selected=true]:bg-green group-data-[selected=true]:bg-opacity-20',
                SwitchSizeClasses[size]?.wrapper,
                classNames.wrapper,
            ),
        };
    }, [classNames, size]);

    return (
        <Switch
            size={size}
            isSelected={checked}
            classNames={cClassNames}
            {...rest}
        >
            {label ? <span>{label}</span> : children}
        </Switch>
    );
};

export default CSwitch;
