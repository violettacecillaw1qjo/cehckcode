import { BookingStatus, BookingStepType } from '@/enums/booking.enum';

import { BookingStepOption } from '@/types/booking.type';

import { arrayToObject } from '@/utils/common.util';

export const CART_DISCOUNT_DIVISION_MAXIMUM_TIME = 15;

export const MAX_IMAGES_STORE = 7;

export const PHONE_PREFIX = '001';

export const optionBookingStep: BookingStepOption[] = [
    {
        label: 'services',
        desc: 'selectServices',
        value: BookingStepType.Service,
    },
    {
        label: 'tech',
        desc: 'selectTech',
        value: BookingStepType.Tech,
    },
    {
        label: 'date',
        desc: 'chooseAnAppointmentDate',
        value: BookingStepType.Date,
    },
    {
        label: 'confirm',
        desc: 'reviewAndConfirm',
        value: BookingStepType.Confirm,
    },
];

export const mappingOptionBookingStep: Record<BookingStepType, BookingStepOption> = arrayToObject(
    optionBookingStep,
    'value',
);

export const mappingStepBooking: Record<BookingStepType, { next?: BookingStepType; prev?: BookingStepType[] }> = {
    [BookingStepType.Service]: {
        next: BookingStepType.Tech,
    },
    [BookingStepType.Tech]: {
        next: BookingStepType.Date,
        prev: [BookingStepType.Service],
    },
    [BookingStepType.Date]: {
        next: BookingStepType.Confirm,
        prev: [
            BookingStepType.Service,
            BookingStepType.Tech,
        ],
    },
    [BookingStepType.Confirm]: {
        prev: [
            BookingStepType.Service,
            BookingStepType.Tech,
            BookingStepType.Date,
        ],
    },
};

export const colorBookingStatus: Record<BookingStatus, Record<'bg' | 'text' | 'border', string>> = {
    [BookingStatus.New]: {
        bg: 'bg-primary',
        text: 'text-primary',
        border: 'border-primary',
    },
    [BookingStatus.Confirm]: {
        bg: 'bg-blue',
        text: 'text-blue',
        border: 'border-blue',
    },
    [BookingStatus.CheckIn]: {
        bg: 'bg-purple',
        text: 'text-purple',
        border: 'border-purple',
    },
    [BookingStatus.InService]: {
        bg: 'bg-orange',
        text: 'text-orange',
        border: 'border-orange',
    },
    [BookingStatus.Checkout]: {
        bg: 'bg-success',
        text: 'text-success',
        border: 'border-success',
    },
    [BookingStatus.Absent]: {
        bg: 'bg-gray',
        text: 'text-gray',
        border: 'border-gray',
    },
    [BookingStatus.Canceled]: {
        bg: 'bg-danger',
        text: 'text-danger',
        border: 'border-danger',
    },
    [BookingStatus.Done]: {
        bg: 'bg-success',
        text: 'text-success',
        border: 'border-success',
    },
};
