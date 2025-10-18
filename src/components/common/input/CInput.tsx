import { Input, InputProps } from '@heroui/input';
import { InputSlots, SlotsToClasses } from '@heroui/react';
import clsx from 'clsx';
import { ChangeEvent, forwardRef, KeyboardEvent, useCallback, useMemo } from 'react';

import { useTranslation } from '@/cores/i18n';

import { isPressEnter } from '@/utils/common.util';
import { formatPrice } from '@/utils/string.util';

export type CInputProps = {
    isEmail?: boolean;
    isPhone?: boolean;
    isPassword?: boolean;
    isPrice?: boolean;
    isClearable?: boolean;
    autoFocus?: boolean;
    suffixText?: string;
    onChangeText?: (value: string, e: ChangeEvent<HTMLInputElement> | null) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onEnter?: () => void;
} & InputProps;

const CInput = (props: CInputProps, ref: any) => {
    const {
        isEmail,
        isPhone,
        isPassword,
        isPrice,
        max,
        isClearable = true,
        radius = 'sm',
        suffixText,
        endContent,
        placeholder,
        isInvalid,
        classNames,
        onClear,
        onChangeText,
        onKeyDown,
        onEnter,
        ...rest
    } = props;

    const { t } = useTranslation();

    const classNameProps = useMemo<SlotsToClasses<InputSlots>>(() => {
        const { label, innerWrapper, inputWrapper, clearButton, ..._rest } = classNames || {};
        return {
            ..._rest,
            label: clsx('font-bold', isInvalid ? '!text-danger' : '', label),
            inputWrapper: clsx(
                'h-[40px] rounded-xl border-1 px-4 shadow-none !ring-0 !ring-offset-0',
                isInvalid
                    ? 'border-danger/10 bg-danger/10 focus-within:border-danger hover:!border-danger'
                    : 'border-primary/10 bg-primary/2 focus-within:bg-primary/10 hover:!bg-primary/10',
                inputWrapper,
            ),
            innerWrapper: clsx('h-[40px]', innerWrapper),
            clearButton: clsx('text-primary/50 [&>svg]:h-[20px] [&>svg]:w-[20px]', clearButton),
        };
    }, [isInvalid, classNames]);

    const handleOnClear = useCallback(() => {
        if (endContent) return;
        onClear?.();
        onChangeText?.('', null);
    }, [onClear, onChangeText]);

    const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            switch (true) {
                case isEmail:
                case rest.type === 'email':
                    value = value.toLowerCase().replace(/[^\sa-z0-9@._]/g, '');
                    break;
                case isPhone:
                case rest.type === 'phone':
                    value = value.replace(/[^\d+]/g, '');
                    break;
                case isPassword:
                    value = value.replace(/\s/gi, '');
                    break;
                case isPrice:
                    value = formatPrice(value);
                    if (max && value) value = Math.min(Number(value), Number(max)).toString();

                    break;
            }

            onChangeText?.(value, e);
        },
        [isEmail, isPhone, isPassword, onChangeText],
    );

    return (
        <Input
            {...rest}
            ref={ref}
            radius={radius}
            variant={'faded'}
            labelPlacement={'outside'}
            classNames={classNameProps}
            placeholder={placeholder || t('enterValue')}
            isClearable={isClearable && !endContent}
            endContent={endContent ?? (suffixText && <span className='text-small text-default-600'>{suffixText}</span>)}
            onClear={endContent ? undefined : handleOnClear}
            onChange={handleOnChange}
            onKeyDown={(e) => {
                onKeyDown?.(e);
                if (isPressEnter(e)) {
                    onEnter?.();
                }
            }}
        />
    );
};

export default forwardRef(CInput);
