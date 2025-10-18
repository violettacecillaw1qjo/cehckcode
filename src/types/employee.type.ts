import { CheckInType } from '@/enums/checkin.enum';
import { DayOfWeekType } from '@/enums/common.enum';
import { EmployeeStatus, EmployeeType, ShiftConfigType } from '@/enums/employee.enum';

import { SearchParams, SoraDto } from './common.type';

// API Params
export type EmployeeSearchParams = {
    tenantId: string;
    roleIds?: string[];
    types?: EmployeeType[];
    statuses?: EmployeeStatus[];
    address?: {
        value?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
} & SearchParams;

export type EmployeeWorkingSearchParams = {
    types?: EmployeeType[];
    timezone?: string;
    tenantId: string;
    statues?: CheckInType[];
} & SearchParams;

export type Employee = {
    fullName: string;
    nickNameText: string;
    phoneText: string;
    avatarUrl: string;
    refId: string;
    type: EmployeeType;
} & EmployeeDto;

export type EmployeeShift = {
    type: ShiftConfigType;
    startDate: number;
    endDate: number;
    daysOfWeek: EmployeeDayOfWeek[];
};

export type EmployeeDayOfWeek = {
    day: DayOfWeekType;
    enable: boolean;
    timeRanges: EmployeeTimeRange[];
};

export type EmployeeTimeRange = {
    from: number;
    to: number;
    type?: string;
};

// DTO
export type EmployeeDto = {
    avatar?: string;
    firstName: string;
    lastName: string;
    nickName: string;
    phonePrefix: string;
    phoneSuffix: string;
    refId: string;
    shift: EmployeeShift;
    type: EmployeeType;
} & SoraDto;
