import { OptionItem } from '@/types/common.type';

import { arrayToObject } from '@/utils/common.util';

export const CountryOptions: OptionItem[] = [
    {
        label: 'USA',
        value: 'usa',
    },
    {
        label: 'Vietnam',
        value: 'vietnam',
    },
];

export const MappingCountryOptions: Record<string, OptionItem> = arrayToObject(CountryOptions, 'value');
