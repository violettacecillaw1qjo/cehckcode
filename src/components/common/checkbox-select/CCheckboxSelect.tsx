import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';

import { OptionItem } from '@/types/common.type';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';

import CCheckbox from '../checkbox/CCheckbox';

type CCheckboxSelectProps = {
    isRequired?: boolean;
    isError?: boolean;
    noSelectAll?: boolean;
    label?: string;
    value?: string[];
    disabled?: boolean;
    nsI18n?: NsI18n;
    options?: OptionItem[];
    onChange?: (value: string[]) => void;
};

const CCheckboxSelect = (props: CCheckboxSelectProps) => {
    const { isError, isRequired, nsI18n, label, value: curValue, options, noSelectAll, disabled, onChange } = props;

    const { t } = useTranslation(nsI18n);

    const isSelectAll: boolean = (options || []).length === (curValue || []).length;

    const handleSelectAll = () => {
        onChange?.(isSelectAll ? [] : options?.map((i) => i.value) || []);
    };
    const handleSelect = (value: string) => {
        if (disabled) return;
        onChange?.(isSelectAll ? [] : options?.map((i) => i.value) || []);
        let _curValue: any[] = arrayNotEmpty(curValue) ? cloneDeep(curValue) : [];
        if (_curValue.includes(value)) {
            _curValue = _curValue.filter((i) => i !== value);
        } else {
            _curValue.push(value);
        }
        onChange?.(_curValue);
    };

    return (
        <div className={label ? 'col-2' : ''}>
            {label && (
                <div className={'row-4 justify-between'}>
                    {label ? (
                        <b className={clsx({ 'text-danger': isError })}>
                            {label}
                            {isRequired && <span className={'text-danger'}>{' *'}</span>}
                        </b>
                    ) : (
                        <span />
                    )}
                    {!noSelectAll && (
                        <span
                            className={'cursor-pointer select-none opacity-50'}
                            onClick={handleSelectAll}
                        >
                            {t(isSelectAll ? 'uncheckAll' : 'checkAll')}
                        </span>
                    )}
                </div>
            )}
            {arrayNotEmpty(options) && (
                <div className={'flex flex-wrap gap-x-4 gap-y-2'}>
                    {options?.map((item: OptionItem) => {
                        const { label, value } = item;
                        const isAcitve: boolean = !!curValue?.includes(value);
                        return (
                            <CCheckbox
                                key={value}
                                disabled={disabled}
                                checked={isAcitve}
                                label={t(label)}
                                onChange={() => handleSelect(value)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CCheckboxSelect;
