import clsx from 'clsx';
import { useMemo } from 'react';

import { DateFormat, WeekDays } from '@/enums/date.enum';

import { addDaysTz, isSameDayTz, isSameMonthTz, startOfMonthTz, startOfWeekTz } from '@/utils/date-tz.util';
import { getFormatDate } from '@/utils/date.util';

type CCalendarMonthProps = {
    isCollapsed: boolean;
    days: Date[];
    value?: Date;
    disableAfter?: Date;
    currentMonth: Date;
    onChange?: (date: Date) => void;
};

const CCalendarMonth = (props: CCalendarMonthProps) => {
    const { isCollapsed, value, disableAfter, currentMonth, days, onChange } = props;

    const today = useMemo(() => new Date(), []);

    const monthStart = useMemo(() => startOfMonthTz(currentMonth), [currentMonth]);
    const weekStart = useMemo(() => startOfWeekTz(new Date()), []);

    const weekDays = useMemo(() => {
        return Array.from({ length: WeekDays.End });
    }, []);

    if (isCollapsed)
        return weekDays.map((_, i) => {
            const day = days[i];

            const isCurrentMonth = isSameMonthTz(day, monthStart);
            const isToday = isSameDayTz(day, today);
            const currentDay = getFormatDate(DateFormat.Day, day);

            const dayNow = new Date();
            const isDisabled = (dayNow > day && !isToday) || (!!disableAfter && day > disableAfter);

            return (
                <div
                    key={i}
                    className={clsx(
                        'group col-2 cursor-pointer select-none items-center rounded-xl py-2 text-primary hover:bg-primary/50 hover:text-white',
                        {
                            'text-primary/50': !isCurrentMonth || isDisabled,
                            'border border-primary hover:border-primary/50': isToday,
                            'bg-primary text-white': value && isSameDayTz(day, value),
                            '!cursor-not-allowed hover:!bg-primary/10': isDisabled,
                        },
                    )}
                    onClick={() => {
                        if (isDisabled) return;
                        onChange && onChange(day);
                    }}
                >
                    <b
                        className={clsx('text-tiny text-primary/50 group-hover:text-white', {
                            '!text-white': value && isSameDayTz(day, value),
                        })}
                    >
                        {getFormatDate(DateFormat.WeekdayShort, addDaysTz(weekStart, i))}
                    </b>
                    <b>{currentDay}</b>
                </div>
            );
        });

    return days.map((day, i) => {
        const isCurrentMonth = isSameMonthTz(day, monthStart);
        const isToday = isSameDayTz(day, today);
        const currentDay = getFormatDate(DateFormat.Day, day);

        const dayNow = new Date();

        const isDisabled = (dayNow > day && !isToday) || (!!disableAfter && day > disableAfter);

        return (
            <div
                key={i}
                className={clsx(
                    'flex size-[40px] min-h-[40px] min-w-[40px] cursor-pointer select-none items-center justify-center rounded-xl text-center font-bold text-primary hover:bg-primary/50 hover:text-white',
                    {
                        'text-primary/50': !isCurrentMonth || isDisabled,
                        'border border-primary': isToday,
                        'bg-primary text-white': value && isSameDayTz(day, value),
                        '!cursor-not-allowed hover:!bg-primary/10': isDisabled,
                    },
                )}
                onClick={() => {
                    if (isDisabled) return;
                    onChange && onChange(day);
                }}
            >
                {currentDay}
            </div>
        );
    });
};

export default CCalendarMonth;
