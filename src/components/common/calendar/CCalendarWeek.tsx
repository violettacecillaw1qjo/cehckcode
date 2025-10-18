import { memo, useMemo } from 'react';

import { DateFormat, WeekDays } from '@/enums/date.enum';

import { addDaysTz, startOfWeekTz } from '@/utils/date-tz.util';
import { getFormatDate } from '@/utils/date.util';

const CCalendarWeek = () => {
    const weekStart = startOfWeekTz(new Date());

    const weekDays = useMemo(() => {
        return Array.from({ length: WeekDays.End });
    }, []);

    return weekDays.map((_, i) => (
        <div
            key={i}
            className='flex size-[40px] min-h-[40px] min-w-[40px] select-none items-center justify-center text-center text-primary/50'
        >
            {getFormatDate(DateFormat.WeekdayShort, addDaysTz(weekStart, i))}
        </div>
    ));
};

export default memo(CCalendarWeek);
