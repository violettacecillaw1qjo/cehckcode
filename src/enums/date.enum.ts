export enum TimeUnit {
    // MILLISECOND = 'millisecond',
    SECOND = 'second',
    MINUTE = 'minute',
    HOUR = 'hour',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
}

export enum Moment {
    BEGIN = 'begin',
    END = 'end',
}

export enum DateType {
    DATE = 'date',
    DATETIME = 'datetime',
    DATERANGE = 'daterange',
    DATETIMERANGE = 'datetimerange',
    TIME = 'time',
}

export enum DateFormat {
    Day = 'd',
    Time = 'HH:mm',
    Date = 'MM/dd/yyyy',
    Weekday = 'EEEE', // Monday
    WeekdayShort = 'EEE', // Mon
    DateTimeMeridiem = 'EEE, hh:mm a',
    MonthYear = 'MMM yyyy',
    DateTime = 'HH:mm MM/dd/yyyy',
    FullDate = 'EEEE, MMM d, yyyy',
    TimeSeconds = 'HH:mm:ss',
    DateISO = 'yyyy-MM-dd',
    TimeSecondsMeridiem = 'hh:mm:ss a', // a: AM/PM
    TimeMeridiem = 'h:mm a', // 5:41 PM
    WeekdayDayMonth = 'E d MMM', // Mon 6 Jan
    MonthDayYear = 'MMMM d, yyyy', // January 6, 2025
    WeekdayDayMonthYear = 'E d MMM yyyy', // Mon 6 Jan 2025
    TimeWeekdayDayMonth = 'HH:mm E d MMM', // 13:30 Mon 6 Jan
    TimeWeekdayDayMonthYear = 'HH:mm, E d MMM yyyy', // 12:02, Fri 3 Jan 2025
    MonthDayTime = 'MMM d - hh:mm a', // Sep 24 - 10:00 AM
}

export enum TimeLimit {
    MaxHours = 23,
    MaxMinutes = 300,
    MaxLimitMinutes = 400,
}

export enum WeekDays {
    Start = 1,
    End = 7,
}
