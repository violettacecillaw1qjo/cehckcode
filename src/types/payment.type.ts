import { CostType } from '@/enums/common.enum';
import { PaymentStep } from '@/enums/payment.enum';

import { BookingAppt, BookingDto } from './booking.type';
import { OptionItem } from './common.type';
import { EmployeeDto } from './employee.type';

export type PaymenTipOption = {
    isCustom?: boolean;
    isNoTip?: boolean;
    endIcon?: any;
    type: CostType;
} & OptionItem<number>;

// -------------- Dto -------------- //
export type PaymentBookingDto = {
    booking: BookingDto;
    employees: EmployeeDto[];
    storeProfile: {
        name: string;
        avatar: string;
        address: {
            value: string;
            city: string;
            state: string;
            zip: string;
            country: string;
        };
        phoneSuffix: string;
        phonePrefix: string;
    };
};

// -------------- Store state -------------- //
export type PaymentState = {
    renderReady: boolean;
    dataReady: boolean;
    booking: BookingAppt;
    store: PaymentStore;
    stepIdx: PaymentStep;
};

export type PaymentStore = {
    name: string;
    avatar?: string;
    address: string;
};
