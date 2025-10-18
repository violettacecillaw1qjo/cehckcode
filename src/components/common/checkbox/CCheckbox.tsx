import clsx from 'clsx';
import { ReactNode } from 'react';

import IconTickBox from '@/assets/icons/common/TickBox';
import IconUncheckedCheckbox from '@/assets/icons/common/UncheckedCheckbox';

import { CheckboxColor } from './CCheckbox.type';
import { CheckboxColorClasses } from './CCheckbox.variable';

type CCheckboxProps = {
    disabled?: boolean;
    checked?: boolean;
    color?: CheckboxColor;
    label?: ReactNode;
    subLabel?: ReactNode;
    className?: any;
    classNames?: Partial<{
        wrapperLabel: string;
        label: string;
        subLabel: string;
    }>;
    onChange?: (value: boolean) => void;
};

const CCheckbox = (props: CCheckboxProps) => {
    const {
        disabled,
        checked,
        className,
        classNames = {},
        color = CheckboxColor.Success,
        label,
        subLabel,
        onChange,
    } = props;

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={clsx('flex w-fit cursor-pointer select-none gap-2', className, {
                '!cursor-not-allowed opacity-50': disabled,
            })}
            onClick={handleClick}
        >
            <div className={CheckboxColorClasses[checked ? color : CheckboxColor.Primary]}>
                {checked ? <IconTickBox /> : <IconUncheckedCheckbox />}
            </div>
            <div className={clsx('flex flex-col gap-1', classNames.wrapperLabel)}>
                {label && <b className={classNames.label}>{label}</b>}
                {subLabel && <div className={classNames.subLabel}>{subLabel}</div>}
            </div>
        </div>
    );
};

export default CCheckbox;
