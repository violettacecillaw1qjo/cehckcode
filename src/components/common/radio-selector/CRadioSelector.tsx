import clsx from 'clsx';

import { OptionItem } from '@/types/common.type';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';

import CRadioButton from '../radio-button/CRadioButton';
import { RadioBtnColor } from '../radio-button/CRadioButton.type';

export type CRadioSelectorProps = {
    disabled?: boolean;
    label?: string;
    value?: string;
    className?: any;
    color?: RadioBtnColor;
    nsI18n?: NsI18n;
    options: OptionItem[];
    onChange: (values: any) => void;
};

const CRadioSelector = (props: CRadioSelectorProps) => {
    const { label, value: curValue, nsI18n, className, color, options, disabled, onChange } = props;
    const { t } = useTranslation(nsI18n);

    const handleClick = (value: any) => {
        if (!disabled && onChange) {
            onChange(value);
        }
    };

    return (
        <div className={clsx('col-4', className)}>
            {label && <b>{label}</b>}
            {arrayNotEmpty(options) && (
                <div className={'flex flex-wrap gap-x-6 gap-y-4'}>
                    {options.map((item: OptionItem) => {
                        const { label, value } = item;
                        const isAcitve: boolean = curValue === value;
                        return (
                            <CRadioButton
                                key={value}
                                disabled={disabled}
                                color={color}
                                checked={isAcitve}
                                label={t(label)}
                                onChange={() => handleClick(value)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CRadioSelector;
