import { BadgeStatusColor } from './BadgeStatus.type';

export const BadgeColorClasses: Record<BadgeStatusColor, string> = {
    [BadgeStatusColor.Primary]: 'bg-primary',
    [BadgeStatusColor.Info]: 'bg-info',
    [BadgeStatusColor.Success]: 'bg-success',
    [BadgeStatusColor.Warning]: 'bg-warning',
    [BadgeStatusColor.Danger]: 'bg-danger',
};
