import clsx from 'clsx';
import { useMemo } from 'react';

import { StatusColor } from '@/enums/common.enum';

import { getUploadFileUrl } from '@/utils/file.util';
import { genAvatarColor, removeAccents } from '@/utils/string.util';

import ImageViewer from '../ImageViewer';

import { AvatarSize } from './CAvatar.type';
import { ColorClassNames, MapppingSizeImg, SizeClassNames } from './CAvatar.variable';

type CAvatarProps = {
    src?: string | null;
    name?: string;
    size?: AvatarSize;
    className?: string;
};

const CAvatar = (props: CAvatarProps) => {
    const { name, size = AvatarSize.Medium, src, className } = props;

    const text = useMemo<string>(() => {
        return removeAccents(name || '')
            .split(' ')
            .filter((word) => word.length > 0)
            .map((word) => word[0].toUpperCase())
            .slice(0, 2)
            .join('');
    }, [name]);

    const color = useMemo<StatusColor>(() => {
        return genAvatarColor(text);
    }, [text]);

    const styles = useMemo<any>(() => {
        return {
            minWidth: MapppingSizeImg[size],
            maxWidth: MapppingSizeImg[size],
            minHeight: MapppingSizeImg[size],
            maxHeight: MapppingSizeImg[size],
        };
    }, [size]);

    return (
        <div
            className={clsx(
                'flex items-center justify-center overflow-hidden rounded-full',
                ColorClassNames[color],
                SizeClassNames[size],
                className,
            )}
            style={styles}
        >
            {src ? (
                <ImageViewer
                    lazyload
                    src={getUploadFileUrl(src)}
                    size={MapppingSizeImg[size]}
                />
            ) : (
                <span
                    className={'flex-center select-none font-bold'}
                    style={styles}
                >
                    {text}
                </span>
            )}
        </div>
    );
};

export default CAvatar;
