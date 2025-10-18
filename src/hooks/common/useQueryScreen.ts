import { useMediaQuery } from 'usehooks-ts';

import { screenBreakPoints } from '@/styles/config';

import { ScreenBreakPointKey } from '@/enums/theme.enum';

export const useQueryScreen = (type: ScreenBreakPointKey) => {
    const getScreenType = () => {
        const [prefix, key] = type.split('-');

        switch (prefix) {
            case 'max':
                return `(max-width: ${screenBreakPoints[key as keyof typeof screenBreakPoints] - 1}px)`;
            default:
                return `(min-width: ${screenBreakPoints[type as keyof typeof screenBreakPoints]}px)`;
        }
    };

    const result = useMediaQuery(getScreenType());

    return result;
};
