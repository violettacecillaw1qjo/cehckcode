import { OptionItem } from '@/types/common.type';

export enum TabViewColor {
    Primary = 'primary',
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
}

export type TabViewItem = {
    deletable?: boolean;
} & Omit<OptionItem, 'desc' | 'color'>;
