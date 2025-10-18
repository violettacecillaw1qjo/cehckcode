import { OptionItem } from '@/types/common.type';

import { CropActionType } from './CAvatarCrop.type';

export const avatarOptions: OptionItem[] = [
    { value: CropActionType.Change, label: 'uploadImage' },
    { value: CropActionType.Clear, label: 'deleteImage' },
];
