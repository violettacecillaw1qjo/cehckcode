import { DatePicker, DateRangePicker, TimeInput } from '@heroui/react';
import { fromAbsolute, getLocalTimeZone, ZonedDateTime } from '@internationalized/date';
import clsx from 'clsx';
import { useMemo } from 'react';

import { DateType } from '@/enums/date.enum';

import { DateRangeValue, DateValue, TimeValue } from '@/types/date.type';

import { useTranslation } from '@/cores/i18n';

import useDeepMemo from '@/hooks/common/useDeepMemo';

import IconCalendar from '@/assets/icons/common/Calendar';

import styles from './CDatePicker.module.css';
import { DatePickerClassNames } from './CDatePicker.variable';

type Props = {
    isRequired?: boolean;
    isInvalid?: boolean;
    label?: string;
    type: DateType;
    value?: DateRangeValue | DateValue | TimeValue | null;
    className?: string;
    onSelect?: (value: any) => void;
};

const CDatePicker = (props: Props) => {
    const { isRequired, isInvalid, type, value, label, className, onSelect } = props;

    const { i18n } = useTranslation();

    const isRange = useMemo<boolean>(() => [DateType.DATERANGE, DateType.DATETIMERANGE].includes(type), [type]);
    const isTime = useMemo<boolean>(() => type === DateType.TIME, [type]);

    const date = useDeepMemo<any>(() => {
        let datas: any = null;
        if (!value) return datas;
        switch (type) {
            case DateType.DATERANGE:
            case DateType.DATETIMERANGE:
                datas = Object.fromEntries(
                    [
                        ['from', 'start'],
                        ['to', 'end'],
                    ].map((item: string[]) => {
                        const [key, field] = item || [];
                        const curData: number = (value as any)?.[key];

                        return [
                            field,
                            curData ? fromAbsolute(curData, getLocalTimeZone()) : null,
                        ];
                    }),
                );
                break;
            case DateType.DATE:
            case DateType.DATETIME:
                datas = value ? fromAbsolute(value as any, getLocalTimeZone()) : null;
                break;
            case DateType.TIME:
                {
                    if (value) {
                        datas = value;
                    }
                }
                break;
        }

        return datas;
    }, [value]);

    const compProps = useDeepMemo<any>(() => {
        return {
            fullWidth: true,
            hideTimeZone: true,
            isRequired: !!isRequired,
            granularity: isTime || type.includes(DateType.DATETIME) ? 'minute' : 'day',
            label: label,
            className: clsx(className, styles.wrapper, {
                [styles.error]: isInvalid,
            }),
            hourCycle: 24,
            selectorIcon: <IconCalendar />,
            labelPlacement: 'outside',
            classNames: DatePickerClassNames,
        };
    }, [i18n.language, isRequired, isInvalid, type, className, label]);

    const handleChange = (data: any) => {
        let datas: any = null;
        switch (type) {
            case DateType.DATERANGE:
            case DateType.DATETIMERANGE:
                {
                    const { start, end } = (data || {}) as Record<string, ZonedDateTime>;
                    datas = {
                        from: start ? +start.toDate() : null,
                        to: end ? +end.toDate() : null,
                    };
                }
                break;
            case DateType.DATE:
            case DateType.DATETIME:
                datas = !!data ? +data?.toDate() : null;
                break;
            case DateType.TIME:
                if (data) {
                    const { hour, minute, second, millisecond } = data;
                    datas = {
                        hour,
                        minute,
                        millisecond,
                        second,
                    } as TimeValue;
                }
                break;
        }
        onSelect?.(datas);
    };

    return (
        <>
            {isTime ? (
                <TimeInput
                    {...compProps}
                    value={date}
                    onChange={(e: any) => handleChange(e)}
                />
            ) : (
                <>
                    {isRange ? (
                        <DateRangePicker
                            {...compProps}
                            value={date}
                            onChange={(e: any) => handleChange(e)}
                        />
                    ) : (
                        <DatePicker
                            {...compProps}
                            value={date}
                            onChange={(e: any) => handleChange(e)}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CDatePicker;
