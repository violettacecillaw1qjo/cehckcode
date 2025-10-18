import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@heroui/react';
import clsx from 'clsx';

import { OptionItem } from '@/types/common.type';

import { useTranslation } from '@/cores/i18n';

import IconCancel from '@/assets/icons/common/Cancel';
import IconChevronDown from '@/assets/icons/common/ChevronDown';

import CAvatar from '../avatar/CAvatar';
import { AvatarSize } from '../avatar/CAvatar.type';

import styles from './CSelect.module.css';

type CSelectProps = Omit<AutocompleteProps, 'children' | 'value' | 'onChange'> & {
    showAvatar?: boolean;
    value?: OptionItem | null;
    options: OptionItem[];
    onChange: (value: OptionItem | null) => void;
};

const CSelect = (props: CSelectProps) => {
    const { t } = useTranslation();
    const {
        showAvatar,
        value,
        options,
        className,
        isInvalid,
        isClearable = false,
        placeholder,
        onChange,
        ...rest
    } = props as CSelectProps;

    const handleChange = (value: any) => {
        const item: OptionItem | null = options.find((i: OptionItem) => i.value === value) || null;
        onChange?.(item);
    };

    return (
        <Autocomplete
            isInvalid={isInvalid}
            isClearable={isClearable}
            className={clsx(
                'max-w',
                styles.wrapper,
                {
                    [styles.error]: isInvalid,
                },
                className,
            )}
            defaultItems={options}
            labelPlacement={'outside'}
            placeholder={placeholder || t('selectOption')}
            selectorIcon={<IconChevronDown size={12} />}
            defaultSelectedKey={value?.value}
            clearIcon={<IconCancel className={'opacity-50'} />}
            onSelectionChange={handleChange}
            {...rest}
        >
            {(item) => {
                const { value: _value, label, avatar } = (item || {}) as OptionItem;
                const name = t(label);
                return (
                    <AutocompleteItem
                        key={_value}
                        textValue={name}
                        classNames={{
                            base: 'gap-0 min-h-[32px] max-h-[32px] data-[selected]:bg-success/10 data-[hover]:bg-primary/10 data-[focus]:bg-primary/10',
                            title: 'overflow-hidden',
                            selectedIcon: 'hidden',
                        }}
                    >
                        <div className={'row-2 w-full flex-1 overflow-hidden'}>
                            {showAvatar && (
                                <CAvatar
                                    src={avatar}
                                    name={name}
                                    size={AvatarSize.Small}
                                />
                            )}
                            <div className={'flex w-full flex-1 flex-col gap-1 overflow-hidden text-ellipsis'}>
                                <span className={'overflow-hidden text-ellipsis text-nowrap'}>{name}</span>
                            </div>
                        </div>
                    </AutocompleteItem>
                );
            }}
        </Autocomplete>
    );
};

export default CSelect;
