import { CostType, Gender } from '@/enums/common.enum';

import { AppPagination, OptionItem } from '@/types/common.type';

export const DEFAULT_PAGINATION: AppPagination = {
    page: 1,
    size: 15,
    totalItem: 0,
    totalPage: 1,
    hasNext: false,
};

export const LIST_OF_NUMBER: string = '0123456789';
export const LIST_OF_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';

export const TENANT_ID: string = '222';

export const MAX_FILE_SIZE: number = 4; // 4MB

export const MAX_MONEY_LENGTH: number = 12;

export const ACCEPT_EXT: string[] = [
    'gif',
    'jpeg',
    'png',
    'jpg',
    'bmp',
    'GIF',
    'JPEG',
    'PNG',
    'JPG',
    'BMP',
    'svg',
    'SVG',
];

export const MILISECOND_OF_HOUR: number = 3600000;
export const MILISECOND_OF_MINUTE: number = 60000;
export const MILISECOND_OF_SECOND: number = 1000;
export const MINUTE_OF_HOUR: number = 60;
export const ONE_HUNGRED: number = 100;

export const QUARTER_HOUR = 15 as const;
export const HAFT_HOUR = 30 as const;

export const GenderOptions: OptionItem<Gender>[] = [
    {
        value: Gender.Male,
        label: 'male',
    },
    {
        value: Gender.Female,
        label: 'female',
    },
    {
        value: Gender.Other,
        label: 'other',
    },
];

export const PhonePrefixes: OptionItem[] = ['001', '84'].map((i: string) => ({ value: i, label: `(${i})` }));

export const CostUnit: Record<CostType, string> = {
    [CostType.Percent]: '%',
    [CostType.Money]: '$',
};
