import { BookingDetailDto } from './booking.type';

export type CalendarDetailCrud = Omit<
    BookingDetailDto,
    'ts' | 'empId' | 'thumbnail' | 'discount' | 'name' | 'quantity'
>;
