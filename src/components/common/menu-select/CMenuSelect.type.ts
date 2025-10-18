import { OptionItem } from '@/types/common.type';

export enum HandleClickType {
    Select = 'select',
    Unselect = 'unselect',
    SelectAll = 'selectAll',
    UnselectAll = 'unselectAll',
}

export enum MenuSelectType {
    Multi = 'multi',
    Single = 'single',
}

export type OnChange = (items: OptionItem[]) => void;
