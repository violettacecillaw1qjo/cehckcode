import { BookingStatus } from '@/enums/booking.enum';

import { BookingDto, ServiceDetailDataParsed } from './booking.type';
import { ClassifyData } from './category.type';
import { EmployeeDto } from './employee.type';
import { ServiceDto } from './service.type';
import { StoreDto, StoreParsed } from './store.type';

export type OrderDetailDto = {
    isConfirmed: boolean;
    storeProfile: StoreDto;
    booking: BookingDto;
    employees: EmployeeDto[];
    classifyServices: ClassifyData[];
    services: ServiceDto[];
};

export type OrderDetailParsed = Omit<OrderDetailDto, 'storeProfile' | 'booking'> & {
    status: BookingStatus.New | BookingStatus.Confirm;
    storeProfile: StoreParsed;
    mappingEmployees: Record<string, EmployeeDto>;
    mappingClassifyServices: Record<string, ClassifyData>;
    mappingServices: Record<string, ServiceDto>;
    booking: Omit<BookingDto, 'details'> & {
        totalPrice: number;
        totalTime: number;
        details: ServiceDetailDataParsed[];
    };
};
