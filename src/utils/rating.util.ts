import { DateFormat } from '@/enums/date.enum';

import { BookingPaymentLogDto } from '@/types/booking.type';
import { Employee } from '@/types/employee.type';
import { RatingDetailDto, RatingDetailStoreParsed } from '@/types/rating.type';

import { parseBookingDetail } from './booking.util';
import { arrayToObject } from './common.util';
import { getFormatDate } from './date.util';
import { parseEmployeeDetail } from './employee.util';
import { getUploadFileUrl } from './file.util';
import { formatPhoneNumber } from './string.util';

export const parseRatingDetail = (
    data: RatingDetailDto,
    options?: {
        paymentLogs: Record<string, BookingPaymentLogDto[]>;
    },
): RatingDetailStoreParsed => {
    const { isFeedback, booking, comment, storeProfile, payment, point, quickRatings = [], employees = [] } = data;
    const { paymentLogs } = options || {};

    const { avatar, cname, phoneSuffix } = booking;

    const { content, reply } = comment || {};

    const { address, avatar: storeAvatar, name: storeName } = storeProfile;
    const { city, country, value, state, zip } = address || {};

    const phoneText = formatPhoneNumber(phoneSuffix);

    const storeAddress = [value, city, state, country, zip].filter(Boolean).join(', ');

    const mappingHashByPoint = quickRatings.reduce<RatingDetailStoreParsed['mappingHashByPoint']>((acc, item) => {
        const { point } = item;
        acc[point] = item;

        return acc;
    }, {});

    const employeeParsed: Employee[] = employees.map(parseEmployeeDetail);

    const replyParsed =
        reply?.map((item) => {
            const { content, date } = item;

            const replyDate = getFormatDate(DateFormat.TimeWeekdayDayMonthYear, date);

            return {
                avatar: storeAvatar,
                name: storeName,
                content,
                date,
                replyDate,
            };
        }) || [];

    const employeeMapping: Record<string, Employee> = arrayToObject(employeeParsed, 'refId');

    return {
        ...data,
        content,
        isFeedback,
        point,
        comment,
        payment,
        mappingHashByPoint,
        employeeParsed,
        customer: {
            name: cname || '-',
            avatar: getUploadFileUrl(avatar),
            phoneNumber: phoneText,
        },
        storeProfile: {
            ...storeProfile,
            avatar: getUploadFileUrl(storeProfile.avatar),
            address: storeAddress,
        },
        pointOfTechs: employees.map((item) => ({
            point: null,
            techId: item.refId,
        })),
        bookingDetail: parseBookingDetail(booking, {
            technicans: employeeMapping,
            paymentLogs,
        }),
        replyParsed,
    };
};
