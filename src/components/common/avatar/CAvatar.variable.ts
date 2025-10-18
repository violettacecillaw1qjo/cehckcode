import { StatusColor } from '@/enums/common.enum';

import { AvatarSize } from './CAvatar.type';

export const ColorClassNames: Record<StatusColor, string> = {
    [StatusColor.Primary]: 'text-primary bg-primary/10',
    [StatusColor.Success]: 'text-success bg-success/10',
    [StatusColor.Info]: 'text-info bg-info/10',
    [StatusColor.Warning]: 'text-warning bg-warning/10',
    [StatusColor.Danger]: 'text-danger bg-danger/10',
};

export const SizeClassNames: Record<AvatarSize, string> = {
    [AvatarSize.Tiny]: 'min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-[8px]/[10px]',
    [AvatarSize.Small]: 'min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] text-[8px]/[10px]',
    [AvatarSize.SmallMedium]: 'min-w-[32px] max-w-[32px] min-h-[32px] max-h-[32px]',
    [AvatarSize.Medium]: 'min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px]',
    [AvatarSize.MediumLarge]: 'min-w-[48] max-w-[48px] min-h-[48px] max-h-[48px]',
    [AvatarSize.Large]: 'min-w-[56px] max-w-[56px] min-h-[56px] max-h-[56px]',
    [AvatarSize.LargeExtra]: 'min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px]',
    [AvatarSize.ExtraLarge]: 'min-w-[72px] max-w-[72px] min-h-[72px] max-h-[72px]',
    [AvatarSize.Extra]: 'min-w-[96px] max-w-[96px] min-h-[96px] max-h-[96px]',
    [AvatarSize.ExtraExtra]: 'min-w-[128px] max-w-[128px] min-h-[128px] max-h-[128px]',
};

export const MapppingSizeImg: Record<AvatarSize, number> = {
    [AvatarSize.Tiny]: 16,
    [AvatarSize.Small]: 20,
    [AvatarSize.SmallMedium]: 32,
    [AvatarSize.Medium]: 40,
    [AvatarSize.MediumLarge]: 48,
    [AvatarSize.Large]: 56,
    [AvatarSize.LargeExtra]: 64,
    [AvatarSize.ExtraLarge]: 72,
    [AvatarSize.Extra]: 96,
    [AvatarSize.ExtraExtra]: 128,
};
