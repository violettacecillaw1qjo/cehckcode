import { BadgeColor, BadgeSize } from './CBadge.type';

export const BadgeColorClasses: Record<BadgeColor, string> = {
    [BadgeColor.Primary]: 'bg-primary text-white border-white',
    [BadgeColor.Info]: 'bg-info text-white border-white',
    [BadgeColor.Success]: 'bg-success text-white border-white',
    [BadgeColor.Warning]: 'bg-warning text-white border-white',
    [BadgeColor.Danger]: 'bg-danger text-white border-white',
};

export const BadgeSizeClasses: Record<BadgeSize, string> = {
    [BadgeSize.Small]: 'min-h-5 min-w-5 max-h-5 max-w-5 rounded-md text-tiny font-black',
};
