import { BookingStatus } from '@/enums/booking.enum';

import { ClassifyData, ServiceDtoOrProductDto } from '@/types/category.type';
import { EmployeeDto } from '@/types/employee.type';
import { OrderDetailDto, OrderDetailParsed } from '@/types/order.type';
import { ServiceDto } from '@/types/service.type';

import { calcTotalPriceBooking, calcWorkingTimeService } from './booking.util';
import { arrayToObject } from './common.util';
import { parseDataStore } from './store.util';

export const parseDataDetailOrder = (data: OrderDetailDto): OrderDetailParsed => {
    const { isConfirmed, storeProfile, booking, classifyServices, employees, services } = data;

    const mappingEmployees = arrayToObject<EmployeeDto, EmployeeDto>(employees, 'refId');
    const mappingServices = arrayToObject<ServiceDto, ServiceDto>(services, 'id');
    const mappingClassifyServices = arrayToObject<ClassifyData, ClassifyData>(classifyServices, 'id');

    const details = calcWorkingTimeService(booking, {
        mappingDataClassify: mappingClassifyServices,
        mappingDataServices: mappingServices as Record<string, ServiceDtoOrProductDto>,
    });

    const { totalPrice, totalTime } = calcTotalPriceBooking(details);

    return {
        ...data,
        status: isConfirmed ? BookingStatus.Confirm : BookingStatus.New,
        storeProfile: parseDataStore(storeProfile),
        mappingEmployees,
        mappingServices,
        mappingClassifyServices,
        booking: {
            ...booking,
            totalPrice,
            totalTime,
            details,
        },
    };
};
