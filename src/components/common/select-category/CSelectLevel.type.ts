import { OptionItem } from '@/types/common.type';

export type SelectCategoryItem = {
    parentId?: string;
} & OptionItem;

export type SelectCategoryOption = {
    childs?: SelectCategoryItem[];
} & SelectCategoryItem;

export type Size = {
    width?: number;
    height?: number;
};
