import { BookingType } from '@/enums/booking.enum';
import { CheckInClientSearchStepType, CheckInClientStepType } from '@/enums/check-in-client.enum';

import { BookingApptService, BookingDetailAddBody, BookingDto, ServiceDetailDataParsed } from './booking.type';
import { Customer } from './customer.type';

// props
export type CheckInClientRightSearchProps = {
    onCheckIn?: (ids: string[]) => void;
    onViewDetail?: (data: CheckInClientBooking) => void;
    onRegisterSuccess?: (data: CheckInClientCustomerRegister) => void;
    onClickWalkIn?: () => void;
    onResetDefault?: () => void;
};

export type CheckInClientRegisterProps = {
    textBtnSubmit?: string;
    phoneNumber?: string;
    onSuccess?: (data: CheckInClientCustomerRegister) => void;
};

export type CheckInClientSelectTechProps = {
    value?: string;
    onSelect?: (value: string) => void;
};

export type CheckInClientCustomerRegister = Customer & {
    isAllowSendInfo: boolean;
    phoneNumber?: string;
};

/// store state
export type CheckInClientState = {
    isSubmitting: boolean;
    isAcceptedPolicy: boolean;
    step: CheckInClientStepType;
    errors: Record<number, Record<string, string>>;
    data: CheckInClientBookingData;
    dataCheckIn: CheckInClientCheckInData;
};

export type CheckInClientCheckInData = {
    isFetching: boolean;
    isChecking: boolean;
    isError: boolean;
    step: CheckInClientSearchStepType;
    phoneNumber: string;
    customerInfo?: Customer & {
        isAllowSendInfo: boolean;
    };
    totalBookings: number;
    detail?: CheckInClientBooking;
    bookings: CheckInClientBookingGroupData[];
};

export type CheckInClientBooking = BookingDto & {
    totalPrice: number;
    totalTime: number;
    services: BookingApptService[];
    servicesName: string[];
};

export type CheckInClientBookingGroupData = CheckInClientBooking & {
    groupIds: string[];
    children: CheckInClientBooking[];
};

// booking create

export type CheckInClientBookingData = {
    activeIndex: number;
    type: BookingType;
    persons: CheckInClientBookingPersonData[];
};

export type CheckInClientBookingPersonData = {
    isAllowSendInfo: boolean;
    customer?: Customer;
    assigneeId: string;
    details: BookingDetailAddBody[];
};

export type CheckInClientBookingPersonDetail = {
    totalServices: number;
    customer?: Customer;
    details: ServiceDetailDataParsed[];
};
