import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '@/cores/i18n';

import { convertColorHex } from '@/utils/style.util';

import ColorPicker, { ColorPickerRef } from '@/components/common/ColorPicker';

type CColorSelectProps = {
    isRequired?: boolean;
    isInvalid?: boolean;
    label?: string;
    value: string;
    onChange: (value: string) => void;
};

const colorClasses = [
    'bg-danger',
    'bg-orange',
    'bg-yellow',
    'bg-green',
    'bg-lime',
    'bg-blue',
    'bg-purple',
    'bg-gray',
    'bg-storm',
];

const CColorSelect = (props: CColorSelectProps) => {
    const { isRequired, isInvalid, label, value, onChange } = props;
    const { t } = useTranslation();

    const _value = value ? convertColorHex(value) : '';
    const colorPickerRef = useRef<ColorPickerRef>(null);
    const [colors, setColors] = useState(colorClasses.map(convertColorHex));

    useEffect(() => {
        if (_value && !colors.includes(_value)) {
            setColors((prevColors) => [...prevColors, _value]);
        }
    }, [_value, colors]);

    const handleSelect = (color: string) => {
        if (!colors.includes(color)) {
            setColors([...colors, color]);
        }
        onChange(color);
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <label className={clsx('font-extrabold', isInvalid ? '!text-danger' : '')}>
                    {label || t('color')}
                    {isRequired && <span className='font-extrabold text-danger'> *</span>}
                </label>
                <ColorPicker
                    ref={colorPickerRef}
                    color={_value}
                    onSelect={handleSelect}
                >
                    <div
                        className='cursor-pointer opacity-50'
                        onClick={() => colorPickerRef.current?.open()}
                    >
                        {t('chooseNewColor')}
                    </div>
                </ColorPicker>
            </div>
            <div className='flex flex-wrap gap-2'>
                {colors.map((color) => (
                    <div
                        key={color}
                        className={clsx(
                            'flex cursor-pointer items-center justify-center rounded-xl border-1 border-primary/10',
                            'max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px]',
                        )}
                        style={{
                            background: color,
                        }}
                        onClick={() => onChange(color)}
                    >
                        {_value === color && <div className='h-4 w-4 rounded-full border border-primary/10 bg-white' />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CColorSelect;
