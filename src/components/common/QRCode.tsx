import { AwesomeQRCode } from '@awesome-qrcode/react';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { ThemeColors, themeColors } from '@/styles/config';

import { QrCodeEye } from '@/enums/qr.enum';

import { QrCodeOptions } from '@/types/qr.type';

import { genQrCodeOptions } from '@/utils/qr.util';
import { randomString } from '@/utils/string.util';

type QRCodeProps = {
    value: string;
    style?: CSSProperties;
    options?: Partial<QrCodeOptions>;
};

const QRCode = (props: QRCodeProps): React.ReactNode => {
    const { value, style, options } = props;

    const ref = useRef<HTMLDivElement>({} as any);

    const [sessionId] = useState<string>(randomString());
    const [size, setSize] = useState<number>(100);
    const setRenderReady = useState<number | null>(null)[1];

    const [eyeRadius, setEyeRadius] = useState(0);

    const { bgColor, eyeRadius: eye } = options || {};

    const { width } = useResizeObserver({
        ref,
        box: 'border-box',
    });

    useEffect(() => {
        if (!width) return;
        handleResize();
    }, [width]);

    const handleResize = (): void => {
        const elm: HTMLElement = document.getElementById(sessionId)!;
        if (elm) {
            const { width } = elm.getBoundingClientRect();

            if (size !== width) {
                setSize(width);
                elm.style.height = width + 'px';
            }

            let _eyeRadius = 99;
            if (eye === QrCodeEye.Square) _eyeRadius = 0;
            if (eye === QrCodeEye.Rounded) {
                _eyeRadius = (width || 0) / QrCodeEye.Rounded;
            }

            setEyeRadius(_eyeRadius);
        }
        setRenderReady(+new Date());
    };

    return (
        <div
            ref={ref}
            className={'h-fit w-full overflow-hidden p-2'}
            style={{
                background: themeColors[bgColor || ThemeColors.White],
                ...([QrCodeEye.Rounded, QrCodeEye.Circle].includes(eye!) && { borderRadius: size * 0.1 }),
                ...style,
            }}
        >
            <div id={sessionId}>
                <AwesomeQRCode
                    {...genQrCodeOptions(value || '', { ...options, size })}
                    eyeRadius={eyeRadius}
                />
            </div>
        </div>
    );
};

export default QRCode as React.FC<QRCodeProps>;
