import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';

import { OptionItem } from '@/types/common.type';

import { useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';
import { readColorClass } from '@/utils/style.util';

import IconCancel from '@/assets/icons/common/Cancel';
import IconPlus from '@/assets/icons/common/Plus';

import CButton from './button/CButton';
import { BtnSize } from './button/CButton.type';
import CMenuSelect from './menu-select/CMenuSelect';

type CMultiSelectProps = {
    isRequired?: boolean;
    isInvalid?: boolean;
    label?: string;
    selecteds: OptionItem[];
    options: OptionItem[];
    onChange?: (items: OptionItem[]) => void;
};

const CMultiSelect = (props: CMultiSelectProps) => {
    const { isRequired, isInvalid, label, selecteds, options, onChange } = props;

    const { t } = useTranslation();

    const handleSelect = (items: OptionItem[]) => {
        onChange?.(cloneDeep(items));
    };

    const handleClear = () => {
        onChange?.([]);
    };

    return (
        <div className={'col-2'}>
            {label && (
                <div
                    className={clsx('flex justify-between', {
                        'text-danger': isInvalid,
                    })}
                >
                    <b>
                        {label}
                        {isRequired && <b className={'text-danger'}>{' *'}</b>}
                    </b>
                    {arrayNotEmpty(selecteds) && (
                        <span
                            className={'cursor-pointer select-none opacity-50'}
                            onClick={handleClear}
                        >
                            {t('removeAll')}
                        </span>
                    )}
                </div>
            )}
            <div className={'row-2 flex-wrap'}>
                <CMenuSelect
                    selecteds={selecteds}
                    options={options}
                    onChange={handleSelect}
                >
                    <CButton size={BtnSize.MediumRound}>
                        <IconPlus className={'opacity-50'} />
                    </CButton>
                </CMenuSelect>
                {arrayNotEmpty(selecteds) && (
                    <>
                        {selecteds.map((item: OptionItem) => {
                            const { value, label, color } = item;
                            return (
                                <div
                                    key={value}
                                    className={clsx(
                                        'max-h-[36px] min-h-[36px] w-fit max-w-[200px] whitespace-nowrap',
                                        'row-2 select-none items-center rounded-xl px-4 font-bold',
                                        {
                                            ['bg-primary/10']: !color,
                                            [readColorClass(color)]: true,
                                        },
                                    )}
                                    style={color && { background: color }}
                                >
                                    <span className={'overflow-hidden text-ellipsis'}>{label || '-'}</span>
                                    <div className={'min-h-5 min-w-5'}>
                                        <IconCancel className={'cursor-pointer'} />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default CMultiSelect;
