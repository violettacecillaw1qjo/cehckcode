import { SwitchProps } from '@heroui/react';

import { SwitchSize } from './CSwitch.type';

export const SwitchSizeClasses: Record<SwitchSize, SwitchProps['classNames']> = {
    [SwitchSize.Sm]: {
        thumb: '!size-4 min-w-4',
        wrapper: 'h-[20px] ',
    },
};
