import { NestedKeyPath, OptionItem } from '@/types/common.type';
import { BaseLevelItem, BaseSelectItem, ParseLevelOptionProps } from '@/types/select.type';

import { SelectCategoryItem } from '@/components/common/select-category/CSelectLevel.type';

import { getNestedValue } from './common.util';

export const parseLevelOption = <T>(
    data: ParseLevelOptionProps<T>['data'],
    mappingField?: ParseLevelOptionProps<T>['mappingField'],
): SelectCategoryItem[] => {
    const { label: fieldLabel, value: fieldValue, parentId } = mappingField || {};

    return data.map((item) => ({
        label: getNestedValue(item, fieldLabel || ('name' as NestedKeyPath<BaseLevelItem<T>[number]>)),
        value: getNestedValue(item, fieldValue || ('id' as NestedKeyPath<BaseLevelItem<T>[number]>)),
        parentId: getNestedValue(item, parentId || ('parentId' as NestedKeyPath<BaseLevelItem<T>[number]>)),
    }));
};

export const parseSelectOption = (data: BaseSelectItem<string>): OptionItem[] => {
    return data.map((item) => ({
        value: item.id,
        label: item.name,
    }));
};
