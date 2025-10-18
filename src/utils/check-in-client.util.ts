import { WebCallback } from '@/enums/web.enum';

import { BookingDto } from '@/types/booking.type';
import { ClassifyData, ServiceDtoOrProductDto } from '@/types/category.type';
import {
    CheckInClientBooking,
    CheckInClientRegisterProps,
    CheckInClientSelectTechProps,
} from '@/types/check-in-client.type';
import { EmployeeDto } from '@/types/employee.type';
import { ServiceDto } from '@/types/service.type';

import { calcTotalPriceBooking, parseBookingServiceDetail } from './booking.util';
import { getWebCallback } from './web.util';

export const parseDataCheckInClient = (
    data: BookingDto,
    options: {
        categories: Record<string, ClassifyData>;
        services: Record<string, ServiceDto>;
        employees: Record<string, EmployeeDto>;
    },
): CheckInClientBooking => {
    const { details } = data;

    const { totalPrice, totalTime, servicesName } = calcTotalPriceBooking(
        details || [],
        options.services as Record<string, ServiceDtoOrProductDto>,
    );

    const services = parseBookingServiceDetail(data, options)._services;

    return {
        ...data,
        services,
        totalPrice,
        totalTime,
        servicesName,
    };
};

export const openRegisterCustomerDialog = (props: CheckInClientRegisterProps) => {
    getWebCallback(WebCallback.OpenCheckInRegisterCustomer)(props);
};

export const openCheckInClientSearchTech = (props: CheckInClientSelectTechProps) => {
    getWebCallback(WebCallback.OpenCheckInSearchTech)(props);
};
