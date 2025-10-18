import clsx from 'clsx';
import { CSSProperties, useMemo, useRef } from 'react';

import { ToastType } from '@/enums/toast.enum';

import { Image } from '@/types/common.type';

import { ACCEPT_EXT, MAX_FILE_SIZE } from '@/variables/common.data';

import { useTranslation } from '@/cores/i18n';

import { getImageSize, getUploadFileUrl } from '@/utils/file.util';
import { showToast } from '@/utils/toast.util';

import IconImage from '@/assets/icons/common/Image';
import IconUser from '@/assets/icons/common/User';

import CButton from '../button/CButton';
import { BtnSize } from '../button/CButton.type';
import ImageViewer from '../ImageViewer';

import { CropActionType } from './CAvatarCrop.type';

type CAvatarCropProps = {
    size?: number;
    cropable?: boolean;
    image?: Image | null;
    onChange?: (image: Image | null) => void;
};

const CAvatarCrop = (props: CAvatarCropProps) => {
    const { cropable, size = 112, image, onChange } = props;

    const { t } = useTranslation();

    const ref = useRef<any>(null);

    const style = useMemo<CSSProperties>(() => {
        return {
            minHeight: size,
            maxHeight: size,
            minWidth: size,
            maxWidth: size,
        };
    }, [size]);

    const handleChangeFile = async (e: any): Promise<void> => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const { name, type, size } = file;
            const kind: string = name.indexOf('.') > -1 ? name?.split('.').pop() : '';

            if (!ACCEPT_EXT.includes(kind)) return;
            if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
                showToast(t('maxFileSize', { size: MAX_FILE_SIZE }), { t: ToastType.Error });
                return;
            }
            const _src: string = URL.createObjectURL(file);
            const { width, height } = await getImageSize(_src);
            const image: any = {
                width,
                height,
                size,
                type,
                name,
                src: _src,
                file,
            };
            if (cropable) {
                // toggleShowState(this)({
                //     crop: image,
                // });
            } else onChange?.(image);
        }
        if (ref.current) ref.current.value = '';
    };

    const handleClick = (type: CropActionType): void => {
        switch (type) {
            case CropActionType.Change:
                ref.current?.click();
                break;
            case CropActionType.Clear:
                onChange?.(null);
                break;
            default:
                break;
        }
    };

    return (
        <div
            className={clsx('flex-center relative cursor-pointer rounded-full border-1 border-primary/10', {
                'bg-primary/10': !image?.src,
            })}
            style={style}
        >
            {image?.src ? (
                <ImageViewer
                    className={'overflow-hidden rounded-full'}
                    src={getUploadFileUrl(image.src)}
                    size={size}
                />
            ) : (
                <IconUser
                    size={size / 2}
                    className={'opacity-50'}
                />
            )}
            <CButton
                size={BtnSize.Small}
                className={'absolute bottom-0 right-0 min-w-[32px] max-w-[32px] rounded-full bg-white p-0'}
                onPress={() => handleClick(CropActionType.Change)}
            >
                <IconImage className={'opacity-50'} />
            </CButton>
            <input
                hidden
                ref={ref}
                type={'file'}
                accept={'image/*'}
                onChange={handleChangeFile}
            />
        </div>
    );
};

export default CAvatarCrop;
