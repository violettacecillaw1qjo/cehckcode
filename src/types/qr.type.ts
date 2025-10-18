import { ThemeColors } from '@/styles/config';

import { QrCodeEcLevel, QrCodeEye, QrCodeStyle } from '@/enums/qr.enum';

export type QrCodeOptions = {
    ecLevel?: QrCodeEcLevel;
    size?: number;
    dataStyle?: QrCodeStyle;
    bgColor?: ThemeColors;
    fgColor?: ThemeColors;
    quietZone?: number;
    eyeColor?: ThemeColors;
    eyeRadius?: QrCodeEye;
};
