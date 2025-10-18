import clsx from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';

import { DateFormat } from '@/enums/date.enum';

import {
    addMonthsTz,
    addWeeksTz,
    eachDayOfIntervalTz,
    endOfMonthTz,
    endOfWeekTz,
    startOfMonthTz,
    startOfWeekTz,
    subMonthsTz,
    subWeeksTz,
} from '@/utils/date-tz.util';
import { getFormatDate } from '@/utils/date.util';

import IconChevronDown from '@/assets/icons/common/ChevronDown';

import CButton from '../button/CButton';
import { BtnVariant } from '../button/CButton.type';

import { CalendarDirectionType, CCalendarProps } from './CCalendar.type';
import CCalendarMonth from './CCalendarMonth';
import CCalendarWeek from './CCalendarWeek';

const CCalendar = (props: CCalendarProps) => {
    const { value, disableAfter, onChange } = props;

    const [currentMonth, setCurrentMonth] = useState(startOfMonthTz(value || new Date()));

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeekTz(value || new Date()));

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const controlRef = useRef<HTMLDivElement | null>(null);
    const monthRef = useRef<HTMLDivElement | null>(null);

    const labelRangeYear = useMemo(() => {
        const weekStart = currentWeekStart;
        const weekEnd = endOfWeekTz(weekStart);
        const values = [
            isCollapsed
                ? `${getFormatDate(DateFormat.Day, weekStart)} - ${getFormatDate(DateFormat.Day, weekEnd)}`
                : undefined,
            getFormatDate(DateFormat.MonthYear, currentMonth),
        ].filter(Boolean);

        return values.join(', ');
    }, [isCollapsed, currentWeekStart, currentMonth]);

    const getCalendarDays = () => {
        const monthStart = startOfMonthTz(currentMonth);
        const monthEnd = endOfMonthTz(currentMonth);

        const startDate = startOfWeekTz(monthStart);
        const endDate = endOfWeekTz(monthEnd);

        return eachDayOfIntervalTz({ start: startDate, end: endDate });
    };

    const getWeekDays = () => {
        const startDate = startOfWeekTz(currentWeekStart);
        const endDate = endOfWeekTz(currentWeekStart);
        return eachDayOfIntervalTz({ start: startDate, end: endDate });
    };

    const daysOfMonth = useMemo(
        () => (isCollapsed ? getWeekDays() : getCalendarDays()),
        [
            isCollapsed,
            currentMonth,
            currentWeekStart,
        ],
    );

    const handleToggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), []);

    const handlePresPrev = useCallback(() => {
        if (isCollapsed) return handlePreviousWeek();
        handlePreviousMonth();
    }, [isCollapsed, currentMonth, currentWeekStart]);

    const handlePresNext = useCallback(() => {
        if (isCollapsed) return handleNextWeek();
        handleNextMonth();
    }, [isCollapsed, currentMonth, currentWeekStart]);

    const handleChangeAnimation = (direction: CalendarDirectionType) => {
        const controlEl = controlRef.current;
        const monthEl = monthRef.current;

        if (!controlEl || !monthEl) return;

        const animationClass =
            direction === CalendarDirectionType.Prev ? 'animate-slide-in-right' : 'animate-slide-in-left';

        const removeAnimationClasses = () => {
            controlEl.classList.remove('animate-slide-in-left', 'animate-slide-in-right');
            monthEl.classList.remove('animate-slide-in-left', 'animate-slide-in-right');
        };

        removeAnimationClasses();
        controlEl.classList.add(animationClass);
        monthEl.classList.add(animationClass);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(removeAnimationClasses, 300);
    };

    const handlePreviousMonth = () => {
        const currentMonthValue = subMonthsTz(currentMonth, 1);

        setCurrentMonth(currentMonthValue);

        setCurrentWeekStart(startOfWeekTz(currentMonthValue));

        handleChangeAnimation(CalendarDirectionType.Prev);
    };
    const handleNextMonth = () => {
        const currentMonthValue = addMonthsTz(currentMonth, 1);

        setCurrentMonth(currentMonthValue);
        setCurrentWeekStart(startOfWeekTz(currentMonthValue));

        handleChangeAnimation(CalendarDirectionType.Next);
    };

    const handleNextWeek = () => {
        const currentWeekStartValue = addWeeksTz(currentWeekStart, 1);

        setCurrentWeekStart(currentWeekStartValue);
        setCurrentMonth(startOfMonthTz(currentWeekStartValue));

        handleChangeAnimation(CalendarDirectionType.Next);
    };

    const handlePreviousWeek = () => {
        const currentWeekStartValue = subWeeksTz(currentWeekStart, 1);
        setCurrentWeekStart(currentWeekStartValue);
        setCurrentMonth(startOfMonthTz(currentWeekStartValue));
        handleChangeAnimation(CalendarDirectionType.Prev);
    };

    return (
        <div className='col-6'>
            <div
                className={
                    'row-4 max-h-[36px] min-h-[36px] items-center justify-between rounded-xl border-1 border-primary/10 bg-primary/2 px-[2px]'
                }
            >
                <CButton
                    className={clsx(
                        'max-h-[28px] min-h-[28px] min-w-[28px] max-w-[28px]',
                        'rounded-full border-none bg-transparent p-0',
                    )}
                    onPress={handlePresPrev}
                >
                    <IconChevronDown
                        size={12}
                        className={'rotate-90'}
                    />
                </CButton>
                <b
                    ref={controlRef}
                    className={'select-none'}
                >
                    {labelRangeYear}
                </b>
                <CButton
                    className={clsx(
                        'max-h-[28px] min-h-[28px] min-w-[28px] max-w-[28px]',
                        'rounded-full border-none bg-transparent p-0',
                    )}
                    onPress={handlePresNext}
                >
                    <IconChevronDown
                        size={12}
                        className={'-rotate-90'}
                    />
                </CButton>
            </div>
            <div
                className={clsx('col-2', {
                    'col-4': isCollapsed,
                })}
            >
                <div
                    ref={monthRef}
                    className='grid grid-cols-7 gap-2'
                >
                    {!isCollapsed && <CCalendarWeek />}
                    <CCalendarMonth
                        isCollapsed={isCollapsed}
                        disableAfter={disableAfter}
                        currentMonth={currentMonth}
                        days={daysOfMonth}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div className='flex-center'>
                    <CButton
                        variant={BtnVariant.Flat}
                        className='h-5 max-h-5 min-h-5 w-[48px] min-w-[48px] rounded-lg'
                        onPress={handleToggleCollapse}
                    >
                        <IconChevronDown
                            size={12}
                            className={clsx('rotate-180 transition-all', {
                                'rotate-[135]': isCollapsed,
                            })}
                        />
                    </CButton>
                </div>
            </div>
        </div>
    );
};

export default CCalendar;
