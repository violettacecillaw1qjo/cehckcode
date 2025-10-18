import {
    BookingCreateStatus,
    BookingCreatorType,
    BookingPaymentLogStatus,
    BookingPaymentLogType,
    BookingPaymentMethod,
    BookingPaymentStatus,
    BookingStatus,
    BookingStepType,
    BookingTrackinStatus,
    BookingType,
    DiscountSharing,
} from '@/enums/booking.enum';
import { CategoryType } from '@/enums/classify.enum';
import { CostType, DayOfWeekType, PlatformType } from '@/enums/common.enum';
import { EmployeeType } from '@/enums/employee.enum';

import { CalendarDetailCrud } from './calendar.type';
import { ClassifyData, ParsedClassifyData, ServiceDtoOrProductDto } from './category.type';
import { RangeQuery, SoraDto, SortParams } from './common.type';
import { EmployeeDayOfWeek, EmployeeDto } from './employee.type';
import { ProductConfigs } from './product.type';
import { Duration, ProductCharge, ServiceConfigs, TaxConfig } from './service.type';
import { StoreHour } from './store.type';

// -------------- Params -------------- //
export type BookingGetListParams = {
    keyword?: string;
    tenantId?: string;
    platforms?: PlatformType[];
    rangeQueries?: RangeQuery[];
    sort?: SortParams;
    statuses?: BookingStatus[];
    paymentStatus?: BookingPaymentStatus[];
    phoneSuffixes?: string[];
};

export type BookingCheckInAppCheckInBody = {
    ids: string[];
    tenantId: string;
};

export type PaymentLogSearchBody = {
    types?: BookingPaymentLogType[];
    paymentTypes?: BookingPaymentMethod[];
    statuses?: BookingPaymentLogStatus[];
    bookingIds: string[];
    sort?: SortParams;
};

export type BookingTaxConfig = {
    enable: boolean;
    tax: TaxConfig;
};

export type BookingApptService = {
    id: string;
    isCustom?: boolean;
    isRequestedPrice?: boolean;
    name: string;
    avatar: string;
    color: string;
    isFree: boolean;
    type: CategoryType;
    quantity: number;
    cost: number; // after discount
    orgCost: number; // after discount
    price: number;
    orgPrice: number;
    discountCost: number;
    duration: number;
    durationConfig: Duration;
    isNew: boolean;
    discount: number;
    discountType: CostType;
    discountSharing: DiscountSharing;
    assignee: BookingApptAssignee | null;
    tax: number;
    costAfterTax: number;
    taxConfig: BookingTaxConfig;
};

export type BookingApptCartDiscount = {
    value: number;
    cost: number;
    type: CostType;
    details: BookingApptCartDiscountDetail[];
};
export type BookingApptCartDiscountDetail = {
    id: string;
    name: string;
    type: CategoryType;
    cost: number;
    percentage: number;
};

export type BookingApptTip = {
    name: string;
    avatar: string;
    techId: string;
    value: number;
    cost: number;
    type: CostType;
    isCustom: boolean;
    totalServiceCost: number;
};

export type CalculateItem =
    | BookingApptTip
    | {
          value: number;
          type: CostType;
      };

export type BookingApptAssignee = {
    serviceId: string;
    techId: string;
    type: EmployeeType;
    id: string;
    name: string;
    avatar?: string | null;
};

export type ParseBookingApptData = Pick<
    BookingAppt,
    'assignees' | 'price' | 'discount' | 'orgPrice' | 'duration' | 'serviceName'
>;

export type BookingAppt = {
    fullAssign: boolean;
    id: string;
    uniqueId: string;
    status: BookingStatus;
    paymentStatus: BookingPaymentStatus;
    note: string | null;
    scheduleDate: number;
    scheduleTime: string;
    fullName: string;
    serviceName: string;
    assignees: BookingApptAssignee[] | null;
    price: number;
    discount: number;
    orgPrice: number;
    duration: number;
    services: BookingApptService[] | null;
    customer: BookingApptCustomer | null;
    creator: BookingApptCreator | null;
    cartDiscount: BookingApptCartDiscount | null;
    createdDate?: number;
    tip: number;
    tips: BookingApptTip[];
    totalPay: number;
    totalTax: number;

    payment: BookingApptPayment | null;
    item: BookingDto;
};

export type BookingApptPayment = {
    list: string[];
    datas: Record<string, BookingApptPaymentItem>;
    totalAmount: number;
    serviceAmount: number;
    tipAmount: number;

    serviceBalance: number;
    tipBalance: number;
    provisionalAmount: number;
    paidAmount: number;

    discount: number;
    hasWaitingPayment: boolean;
};

export type BookingApptPaymentItem = {
    id: string;
    method: BookingPaymentMethod;
    paid: boolean;
    amount: number;
    orgAmount: number;
    serviceAmount: number;
    tipAmount: number;
    discount: number;
    paidDate: number | null;

    cash?: BookingApptPaymentItemCash;
    giftCard?: BookingApptPaymentItemGiftCard;
    other?: BookingApptPaymentItemOther;
    card?: BookingApptPaymentItemCard;
};

export type BookingApptPaymentItemCash = {
    receivePrice: number;
    price: number;
    discount: number;
    totalDiscount: number;
};

export type BookingApptPaymentItemGiftCard = {
    code: string;
    amount: number;
};

export type BookingApptPaymentItemOther = {
    amount: number;
};

export type BookingApptCreator = {
    id: string;
    name: string;
    refId: string;
    type: BookingCreatorType;
};

export type BookingApptPaymentItemCard = {
    amount: number;
    isWaitingPayment?: boolean;
    isProcessing?: boolean;
    logId?: string;
    deviceId?: string;
};

export type BookingApptCustomer = {
    id: string;
    name: string;
    avatar: string;
    phoneNumber: string;
    phonePrefix: string;
    phoneSuffix: string;
};

// -------------- DTO -------------- //
export type BookingDto = {
    uniqueId: string;
    orderId: string;
    cname?: string;
    cid?: string;
    color?: string;
    avatar?: string;
    platform: PlatformType;
    type: BookingType;
    tips: BookingTipDto[];
    tipCards?: BookingTipDto[];
    paymentStatus: BookingPaymentStatus;
    status: BookingStatus;
    scheduleDate: number;
    checkOutDate: number;
    phonePrefix: string;
    phoneSuffix: string;
    details: BookingDetailDto[];
    parentId: string;
    note: string;
    payment?: BookingPaymentDto;
    checkInDate: number;
    finishDate: number;
    employeeNotes: {
        id: string;
        value: string;
    }[];
    creator?: {
        id: string;
        name: string;
    } | null;
    assignee?: {
        id: string;
        name: string;
    } | null;
    createdBy: {
        id: string;
        name: string;
        refId: string;
        type: BookingCreatorType;
    };
    discountCart?: BookingApptDiscountCartDto;
    trackDur?: BookingTrackDurDto | null;
} & SoraDto;

export type BookingPaymentDto = {
    tip: number;
    total: number;
    type: BookingPaymentMethod;
    paymentDate?: number;
};

export type BookingApptDiscountCartDto = {
    value: number;
    type: CostType;
    details: {
        id: string; // service id
        type: CategoryType;
    }[];
};

export type BookingTipDto = {
    techId: string;
    type: CostType;
    value: number;
    isCustom: boolean;
};

export type BookingDetailDto = {
    id: string;
    isCustom?: boolean;
    price: number;
    quantity: number;
    name: string;
    thumbnail: string;
    techId?: string;
    sduration?: number;
    sconfig?: Partial<ServiceConfigs>;
    pconfig?: Partial<ProductConfigs>;
    discount?: ProductCharge;
    type: CategoryType;
};

export type BookingTrackDurDto = {
    status: BookingTrackinStatus;
    beginTs: number;
    endTs?: number | null;
    totalTime?: number | null;
    detail?: {
        action: BookingTrackinStatus;
        ts: number;
        eid: string;
    } | null;
    id: string; // bookingId
    completeInfo?: {
        techId: string;
        serviceId: string;
    };
};

export type BookingPaymentLogDto = {
    type: BookingPaymentLogType;
    paymentType: BookingPaymentMethod;
    amount: number;
    amountReceived: number;
    totalPayment: number;
    total: number;
    discountCash: number;
    totalDiscountCash: number;
    status: BookingPaymentLogStatus;
    bookingId: string;
    paymentId: string;
    code: string;
    note: string;
    cname?: string;
    deviceId?: string;
} & SoraDto;

// -------------- Store state -------------- //
export type PaymentCenterState = {
    renderReady: boolean;
    customer: PaymentCustomer;
};

export type PaymentCustomer = {
    name: string;
    avatar?: string;
    storeName: string;
};

export type BookingStepOption = {
    value: BookingStepType;
    label: string;
    desc: string;
};

export type BookingAddBody = {
    cname?: string;
    cid?: string;
    avatar?: string;
    email?: string;
    color?: string;
    tenantId: string;
    platform: PlatformType;
    type: BookingType;
    persons: BookingPersonAddBody[];
};

export type BookingDetailAddBody = {
    id: string;
    type: CategoryType;
    name: string;
    quantity: number;
    techId: string;
    serviceDuration: number;
};

export type BookingPersonAddBody = {
    isAllowSendInfo?: boolean;
    cid?: string;
    cname?: string;
    avatar?: string;
    phoneNumber?: string;
    phoneSuffix?: string;
    phonePrefix?: string;
    email?: string;
    scheduleDate?: number;
    note?: string;
    details: BookingDetailAddBody[];
    employeeNotes?: {
        value: string;
    }[];
};

export type BookingCrudPersonAddBody = Omit<BookingPersonAddBody, 'scheduleDate'> & {
    scheduleDate?: number;
    isFilledPhone?: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type BookingAddBodyParsed = Omit<BookingAddBody, 'persons'> & {
    activeIndex: number;
    step: BookingStepType;
    persons: BookingCrudPersonAddBody[];
};

export type BookingCrudState = {
    isSubmitting: boolean;
    renderReady: boolean;
    dataReady: boolean;
    isAcceptedPolicy: boolean;
    errors: Record<number, Record<string, string>>;
    data: Partial<BookingAddBodyParsed>;
    status: BookingCreateStatus;
};

export type ServiceDetailDataParsed = BookingDetailAddBody &
    ServiceDtoOrProductDto & {
        color?: string;
        classify: ParsedClassifyData;
        startWorkTime: number;
        endWorkTime: number;
        bookingId: string;
        isTechnicianBusy?: boolean;
    };

export type DataConfigMappingTechBusy = {
    scheduleDate: number;
    dataAllDetailService: ServiceDetailDataParsed[][];
    dataMappingWorKShift: Record<string, Omit<EmployeeDayOfWeek, 'day'>>;
    mappingDataEmployee: Record<string, EmployeeDto>;
};

export type DataCalcWorkingTimeService = {
    scheduleDate?: number;
    details: BookingDetailAddBody[];
};

export type DataWorkingTimeService = Omit<DataCalcWorkingTimeService, 'details'> & {
    details: (BookingDetailAddBody | CalendarDetailCrud)[];
};

export type DataMappingWorkingTimeService = {
    mappingDataServices: Record<string, ServiceDtoOrProductDto>;
    mappingDataClassify: Record<string, ClassifyData>;
};

export type DataConfigWorkShiftEmployee = Omit<DataConfigMappingTechBusy, 'dataAllDetailService'>;

export type BookingCheckTechAvailableBody = {
    techId: string;
    startTime: number;
    endTime: number;
    bookingId?: string;
};

export type BookingMappingStoreHours = Partial<Record<DayOfWeekType, StoreHour>>;

export type BookingCheckCustomerByPhoneBody = {
    phoneSuffix: string;
    tenantId: string;
};

export type BookingCreateCustomerBody = {
    tenantId: string;

    customers: {
        phoneSuffix: string;
        phonePrefix?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    }[];
};

export type BookingConfirmBody = {
    orderId: string;
    tenantId: string;
};

export type BookingCheckInBody = {
    orderId: string;
    tenantId: string;
};

export type BookingLisReservedBody = {
    techIds: string[];
    startTime: number;
    endTime: number;
    tenantId: string;
};
export type BookingLisReservedDto = {
    id: string;
    reservedTimes: number[];
};
