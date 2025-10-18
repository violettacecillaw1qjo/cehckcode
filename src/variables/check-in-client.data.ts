import { CheckInClientStepType } from '@/enums/check-in-client.enum';

export const CHECK_IN_CLIENT_PHONE_LENGTH = 10;

export const CHECK_IN_CLIENT_COUNTDOWN_TIME = 5; // seconds

export const MappingStepBookingCheckIn: Record<CheckInClientStepType, { next?: CheckInClientStepType }> = {
    [CheckInClientStepType.CheckIn]: {
        next: CheckInClientStepType.Service,
    },
    [CheckInClientStepType.Service]: {
        next: CheckInClientStepType.Technician,
    },
    [CheckInClientStepType.Technician]: {},
};
