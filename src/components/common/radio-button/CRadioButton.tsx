import clsx from 'clsx';

import IconCheckmark from '@/assets/icons/common/Checkmark';
import IconUncheckmark from '@/assets/icons/common/Uncheckmark';

import { RadioBtnColor } from './CRadioButton.type';
import { RadioBtnColorClasses } from './CRadioButton.variable';

type CRadioButtonProps = {
    disabled?: boolean;
    checked?: boolean;
    color?: RadioBtnColor;
    label?: string;
    className?: any;
    onChange?: (value: boolean) => void;
};

const CRadioButton = (props: CRadioButtonProps) => {
    const { className, checked, color = RadioBtnColor.Success, label, disabled, onChange } = props;

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={clsx('flex w-fit cursor-pointer select-none gap-2', className, {
                'opacity-50': !checked,
                'cursor-not-allowed opacity-50': disabled,
            })}
            onClick={handleClick}
        >
            <div className={RadioBtnColorClasses[checked ? color : RadioBtnColor.Primary]}>
                {checked ? <IconCheckmark /> : <IconUncheckmark />}
            </div>
            {label && <b className={'break-words'}>{label}</b>}
        </div>
    );
};

export default CRadioButton;
