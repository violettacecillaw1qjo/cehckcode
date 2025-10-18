import { themeColors, ThemeColors } from '@/styles/config';

import { QrCodeEcLevel, QrCodeStyle } from '@/enums/qr.enum';

import { QrCodeOptions } from '@/types/qr.type';

export const genQrCodeOptions = (value: string, options?: QrCodeOptions): any => {
    const {
        ecLevel = QrCodeEcLevel.Low,
        size = 200,
        dataStyle = QrCodeStyle.Dots,
        bgColor = ThemeColors.White,
        fgColor = ThemeColors.Primary,
        quietZone = 0,
        eyeColor = ThemeColors.Primary,
        eyeRadius,
    } = options || {};
    return {
        value,
        ecLevel,
        size,
        dataStyle,
        bgColor: themeColors[bgColor],
        fgColor: themeColors[fgColor],
        quietZone,
        eyeColor: themeColors[eyeColor],
        eyeRadius,
    };
};
