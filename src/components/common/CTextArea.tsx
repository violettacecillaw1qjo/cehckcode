import { InputProps, Textarea } from '@heroui/input';
import clsx from 'clsx';
import { ChangeEvent, forwardRef, KeyboardEvent, useCallback } from 'react';

import { useTranslation } from '@/cores/i18n';

import { isPressEnter } from '@/utils/common.util';

type Props = InputProps & {
    onChangeText?: (value: string, e: ChangeEvent<HTMLInputElement> | null) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onEnter?: () => void;
    onClear?: () => void;
};

const CTextArea = (props: Props, ref: any) => {
    const { isInvalid, classNames, onClear, onChangeText, onKeyDown, onEnter, ...rest } = props;

    const { t } = useTranslation();

    const handleOnClear = useCallback(() => {
        onClear?.();
        onChangeText?.('', null);
    }, [onClear, onChangeText]);

    const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            onChangeText?.(value, e);
        },
        [onChangeText],
    );

    return (
        <Textarea
            ref={ref}
            variant={'faded'}
            labelPlacement={'outside'}
            classNames={{
                ...classNames,
                label: clsx('font-bold', isInvalid ? '!text-danger' : ''),
                inputWrapper: clsx(
                    'border-1 px-4 shadow-none',
                    isInvalid
                        ? 'border-danger/10 bg-danger/10 focus-within:border-danger hover:!border-danger'
                        : 'border-primary/10 bg-primary/2 focus-within:bg-primary/10 hover:!bg-primary/10',
                ),
                clearButton: 'text-primary/50 [&>svg]:w-[20px] [&>svg]:h-[20px]',
            }}
            placeholder={t('enterValue')}
            onClear={handleOnClear}
            onChange={handleOnChange}
            onKeyDown={(e) => {
                onKeyDown?.(e);
                if (isPressEnter(e)) {
                    onEnter?.();
                }
            }}
            {...rest}
        />
    );
};

export default forwardRef(CTextArea);
