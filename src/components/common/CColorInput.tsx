import clsx from 'clsx';
import { useCallback, useRef } from 'react';

import { useTranslation } from '@/cores/i18n';

import { preventDefaultClickEvent } from '@/utils/dom.util';

import IconCancel from '@/assets/icons/common/Cancel';
import IconUnavailable from '@/assets/icons/common/Unavailable';

import ColorPicker, { ColorPickerRef } from '@/components/common/ColorPicker';
import CInput from '@/components/common/input/CInput';

type CColorInputProps = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

const CColorInput = (props: CColorInputProps) => {
    const { label, placeholder, value, onChange } = props;

    const { t } = useTranslation();

    const colorPickerRef = useRef<ColorPickerRef>(null);

    const handleRemove = useCallback((e: any) => {
        preventDefaultClickEvent(e);
        onChange('');
    }, []);

    return (
        <CInput
            isRequired
            maxLength={7}
            value={value}
            label={label ?? t('color')}
            placeholder={placeholder ?? t('noData')}
            classNames={{
                base: 'caret-transparent',
                input: 'cursor-pointer',
                label: 'w-full cursor-pointer',
            }}
            endContent={
                <div className={'flex items-center gap-2'}>
                    {value && (
                        <IconCancel
                            size={18}
                            className={'cursor-pointer opacity-70 transition-opacity hover:opacity-100'}
                            onClick={handleRemove}
                        />
                    )}
                    <ColorPicker
                        ref={colorPickerRef}
                        color={value}
                        onSelect={onChange}
                    >
                        {value ? (
                            <div
                                className={clsx(
                                    'h-5 w-5 min-w-5 cursor-pointer',
                                    'rounded-full border-1 border-foreground/20',
                                )}
                                style={{ background: value }}
                            />
                        ) : (
                            <IconUnavailable className={'cursor-pointer opacity-50'} />
                        )}
                    </ColorPicker>
                </div>
            }
            onClick={() => {
                colorPickerRef.current?.open();
            }}
        />
    );
};

export default CColorInput;
