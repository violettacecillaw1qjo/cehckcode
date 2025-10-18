import { TimeRangeShiftType, WorkingShiftType } from '@/enums/work-shift.enum';

import { CommonTblItem } from './common.type';

type RangeQuery = {
    field: string;
    from: string;
    to: string;
    hasEqualsTo?: boolean;
};

export type WorkingShiftDto = {
    eid: string;
    date: string;
    timeRanges: TimeRangeShift[];
    type: WorkingShiftType;
} & CommonTblItem;

export type TimeRangeShift = {
    from: number;
    to: number;
    type: TimeRangeShiftType;
};

// API Params
export type WorkShiftSearchParams = {
    rangeQueries?: RangeQuery[];
    tenantId: string;
};
