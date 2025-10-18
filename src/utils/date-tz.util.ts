import { DateTime, Settings } from 'luxon';

import { DateFormat, WeekDays } from '@/enums/date.enum';

const checkValidTimeZone = (timezone: string): boolean => {
    const validTimezones = Intl.supportedValuesOf('timeZone');
    return validTimezones.includes(timezone);
};

export const getTimeZone = () => DateTime.local().zoneName;

export const setTimeZone = (timeZone?: string) => {
    if (!timeZone || !checkValidTimeZone(timeZone)) return;
    Settings.defaultZone = timeZone;

    const minimalDays = 4; // ISO khuyến nghị 4

    Settings.defaultWeekSettings = {
        minimalDays,
        firstDay: WeekDays.Start,
        weekend: [6, 7],
    };
};

const getTzDate = (date: Date | number | string): DateTime => {
    return DateTime.fromJSDate(new Date(date));
};

export const formatTz = (date: Date | number | string, format: DateFormat): string => {
    const dt = getTzDate(date);
    return dt.toFormat(format);
};

export const fromUnixTimeTz = (unixTime: number): Date => {
    return DateTime.fromSeconds(unixTime).toJSDate();
};

// start isSame Functions

export const isSameDayTz = (date1: Date | number | string, date2: Date | number | string): boolean => {
    const dt1 = getTzDate(date1);
    const dt2 = getTzDate(date2);
    return dt1.hasSame(dt2, 'day');
};

export const isSameMonthTz = (date1: Date | number | string, date2: Date | number | string): boolean => {
    const dt1 = getTzDate(date1);
    const dt2 = getTzDate(date2);
    return dt1.hasSame(dt2, 'month');
};

export const isSameYearTz = (date1: Date | number | string, date2: Date | number | string): boolean => {
    const dt1 = getTzDate(date1);
    const dt2 = getTzDate(date2);
    return dt1.hasSame(dt2, 'year');
};
// end isSame Functions

// start add Functions
export const addMinutesTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.plus({ minutes: amount }).toJSDate();
};

export const subMinutesTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.minus({ minutes: amount }).toJSDate();
};

export const addHoursTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.plus({ hours: amount }).toJSDate();
};

export const subHoursTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.minus({ hours: amount }).toJSDate();
};

export const addDaysTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.plus({ days: amount }).toJSDate();
};

export const subDaysTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.minus({ days: amount }).toJSDate();
};

export const addWeeksTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.plus({ weeks: amount }).toJSDate();
};

export const subWeeksTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.minus({ weeks: amount }).toJSDate();
};

export const addMonthsTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.plus({ months: amount }).toJSDate();
};

export const subMonthsTz = (date: Date | number | string, amount: number): Date => {
    const dt = getTzDate(date);
    return dt.minus({ months: amount }).toJSDate();
};
// end add Functions

// start get Functions
export const getMinutesTz = (date: Date | number | string): number => {
    const dt = getTzDate(date);
    return dt.get('minute');
};

export const getHoursTz = (date: Date | number | string): number => {
    const dt = getTzDate(date);
    return dt.get('hour');
};
// end get Functions

// start set Functions

export const setMinutesTz = (date: Date | number | string, minute: number): Date => {
    const dt = getTzDate(date);
    return dt.set({ minute }).toJSDate();
};

export const setHoursTz = (date: Date | number | string, hour: number): Date => {
    const dt = getTzDate(date);
    return dt.set({ hour }).toJSDate();
};

// end set Functions

export const startOfSecondTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('second').toJSDate();
};

export const endOfSecondTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('second').toJSDate();
};

export const startOfMinuteTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('minute').toJSDate();
};

export const endOfMinuteTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('minute').toJSDate();
};

export const startOfHourTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('hour').toJSDate();
};

export const endOfHourTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('hour').toJSDate();
};

export const startOfDayTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('day').toJSDate();
};

export const endOfDayTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('day').toJSDate();
};

export const startOfWeekTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);

    return dt.startOf('week').toJSDate();
};

export const endOfWeekTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);

    return dt.endOf('week').toJSDate();
};

export const startOfMonthTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('month').toJSDate();
};

export const endOfMonthTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('month').toJSDate();
};

export const startOfYearTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.startOf('year').toJSDate();
};

export const endOfYearTz = (date: Date | number | string): Date => {
    const dt = getTzDate(date);
    return dt.endOf('year').toJSDate();
};

export const eachDayOfIntervalTz = (interval: {
    start: Date | number | string;
    end: Date | number | string;
}): Date[] => {
    const { start, end } = interval;
    const startDate = startOfDayTz(start);
    const endDate = endOfDayTz(end);

    const days: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        days.push(currentDate);
        currentDate = addDaysTz(currentDate, 1);
    }

    return days;
};

export const eachMonthOfIntervalTz = (interval: {
    start: Date | number | string;
    end: Date | number | string;
}): Date[] => {
    const { start, end } = interval;

    const startDate = startOfMonthTz(start);
    const endDate = endOfMonthTz(end);

    const months: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        months.push(currentDate);
        currentDate = addMonthsTz(currentDate, 1);
    }

    return months;
};
