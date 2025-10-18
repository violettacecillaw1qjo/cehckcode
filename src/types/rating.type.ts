import { PaymentMethod } from '@/enums/common.enum';

import { BookingAppt, BookingDto } from './booking.type';
import { CommonTblItem } from './common.type';
import { Employee, EmployeeDto } from './employee.type';
import { StoreProfileDto } from './store.type';

// Table
export type RatingTblItem = {
    scheduleDate: number;
    point: number;
    serviceName: string[];
    type: string;
    connection: unknown;
    comment: string;
    client: {
        name?: string;
        avatar?: string;
    }[];
} & CommonTblItem;

export type RatingDetailDto = {
    isFeedback: boolean;
    point?: number;
    hash: string;
    feedbackTs?: number;
    storeProfile: StoreProfileDto;
    booking: BookingDto;
    comment?: RatingCommentDto;
    payment: {
        createdDate: number;
        type: PaymentMethod;
    };
    quickRatingHash?: string[];
    employees: EmployeeDto[];
    quickRatings: QuickRatingDto[];
    pointOfTechs?: RatingPointOfTech[];
} & CommonTblItem;

export type DetailRatingProps = {
    data?: RatingDetailDto;
    onSuccess?: () => void;
};

export type RatingDetailProps = DetailRatingProps & {
    onClose: () => void;
};

export type RatingCommentDto = {
    content: string;
    imageUrls: unknown;
    reply: RatingReplyDto[] | null;
};

export type RatingReplyDto = {
    content: string;
    date: number;
    eid: string;
};

export type QuickRatingMessagesDto = {
    hash: string;
    content: string;
};

export type QuickRatingDto = {
    point: number;
    messages: QuickRatingMessagesDto[];
};

export type RatingFeedbackBody = {
    hash: string;
    point: number;
    content: string;
    quickRatingHashes: string[];
    pointOfTechs: RatingPointOfTech[];
};

export type RatingPointOfTech = {
    techId: string;
    point: number | null;
};

export type RatingDetailStoreParsed = Omit<RatingDetailDto, 'customer' | 'storeProfile'> & {
    customer: {
        name: string;
        avatar: string;
        phoneNumber: string;
    };
    storeProfile: Omit<StoreProfileDto, 'address'> & {
        address: string;
    };

    replyParsed: {
        avatar: string;
        name: string;
        content: string;
        date: number;
        replyDate: string;
    }[];
    mappingHashByPoint: Record<number, QuickRatingDto>;
    employeeParsed: Employee[];
    content?: string;
    bookingDetail: BookingAppt;
};
