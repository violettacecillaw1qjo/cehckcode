import { isDate, isNumber } from 'lodash-es';

import { DateFormat, Moment, TimeUnit } from '@/enums/date.enum';

import { MINUTE_OF_HOUR } from '@/variables/common.data';

import { miniTimer } from './base.util';
import {
    endOfDayTz,
    endOfHourTz,
    endOfMinuteTz,
    endOfMonthTz,
    endOfSecondTz,
    endOfWeekTz,
    endOfYearTz,
    formatTz,
    getHoursTz,
    getMinutesTz,
    startOfDayTz,
    startOfHourTz,
    startOfMinuteTz,
    startOfMonthTz,
    startOfSecondTz,
    startOfWeekTz,
    startOfYearTz,
} from './date-tz.util';

export const getLocalTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getFormatDate = (format: DateFormat, d: Date | number | string) => {
    return formatTz(d, format);
};

export const getDelayTime = (from: number, value: number) => {
    let time = 0;
    const timeout = from + value;
    const now = Date.now();
    if (timeout > now) {
        time = timeout - now;
    }
    return time;
};

export const doDelay = async (reqAt: number, delay = 500) => {
    await miniTimer(getDelayTime(+reqAt, delay));
};
export const getDateObj = (d: Date | number, format?: DateFormat) => {
    if (format) {
        const date: any = getFormatDate(format, d);
        return date ? new Date(date.toString()) : null;
    }
    if (d && isNumber(d)) {
        // timestamp string length = 13 ulti year 2286;
        const ts = parseInt(String(d).substring(0, d < 0 ? 14 : 13));
        return new Date(`${ts}`.length === 10 ? ts * 1000 : ts);
    }
    if (d && !isDate(d)) return null;
    if (d) return new Date(d);
    return new Date();
};

export const diffDateTime = (type: TimeUnit, diff: number, cur?: Date | number): number | null => {
    if (!type || !isNumber(diff)) return null;
    const dateObj: Date | null = getDateObj(cur!);
    if (!dateObj) return null;
    switch (type) {
        // case TimeUnit.MILLISECOND:
        //     dateObj.setMilliseconds(dateObj.getMilliseconds() + diff);
        //     break;
        case TimeUnit.SECOND:
            dateObj.setSeconds(dateObj.getSeconds() + diff);
            break;
        case TimeUnit.MINUTE:
            dateObj.setMinutes(dateObj.getMinutes() + diff);
            break;
        case TimeUnit.HOUR:
            dateObj.setHours(dateObj.getHours() + diff);
            break;
        case TimeUnit.DAY:
            dateObj.setDate(dateObj.getDate() + diff);
            break;
        case TimeUnit.MONTH:
            dateObj.setDate(1);
            dateObj.setMonth(dateObj.getMonth() + diff);
            break;
        case TimeUnit.YEAR:
            dateObj.setFullYear(dateObj.getFullYear() + diff);
            break;
    }
    return dateObj.getTime();
};

export const getBEOfDate = (type: TimeUnit, kind: Moment, date?: Date | number): number => {
    const isEnd: boolean = kind === Moment.END;

    const dateObj = date ? new Date(date) : new Date();
    switch (type) {
        case TimeUnit.SECOND:
            return +(!isEnd ? startOfSecondTz(dateObj) : endOfSecondTz(dateObj));
        case TimeUnit.MINUTE:
            return +(!isEnd ? startOfMinuteTz(dateObj) : endOfMinuteTz(dateObj));
        case TimeUnit.HOUR:
            return +(!isEnd ? startOfHourTz(dateObj) : endOfHourTz(dateObj));
        case TimeUnit.DAY:
            return +(!isEnd ? startOfDayTz(dateObj) : endOfDayTz(dateObj));
        case TimeUnit.WEEK:
            return +(!isEnd ? startOfWeekTz(dateObj) : endOfWeekTz(dateObj));

        case TimeUnit.MONTH:
            return +(!isEnd ? startOfMonthTz(dateObj) : endOfMonthTz(dateObj));

        case TimeUnit.YEAR:
            return +(!isEnd ? startOfYearTz(dateObj) : endOfYearTz(dateObj));
    }
};

export const convertMinutesAndHour = (time: string) => {
    const number = 10;
    const [, h = '0', m = '0'] = time.match(/(\d+)?h?\s*(\d+)?m?/) || [];

    return {
        hours: Number.parseInt(h, number),
        minutes: Number.parseInt(m, number),
    };
};

export const convertMinutesToTime = (minutes: number) => {
    const hour = Math.floor(minutes / MINUTE_OF_HOUR);
    const min = minutes % MINUTE_OF_HOUR;
    return { hour, min };
};

export const getMinutesFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return getHoursTz(date) * MINUTE_OF_HOUR + getMinutesTz(date);
};
