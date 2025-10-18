import { CheckboxColor } from './CCheckbox.type';

export const CheckboxColorClasses: Record<CheckboxColor, string> = {
    [CheckboxColor.Primary]: 'text-primary',
    [CheckboxColor.Info]: 'text-info',
    [CheckboxColor.Success]: 'text-success',
    [CheckboxColor.Warning]: 'text-warning',
    [CheckboxColor.Danger]: 'text-danger',
};
