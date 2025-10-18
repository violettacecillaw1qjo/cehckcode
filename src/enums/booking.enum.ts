export enum DiscountSharing {
    OnSalon = 'STORE',
    OnTech = 'TECH',
    Both = 'BOTH',
}

export enum BookingStepType {
    Service = 'SERVICE',
    Tech = 'TECH',
    Date = 'DATE',
    Confirm = 'CONFIRM',
}

export enum BookingType {
    Personal = 'PERSON',
    Group = 'GROUP',
    Family = 'FAMILY',
}

export enum BookingCreateStatus {
    Intro = 'INTRO',
    New = 'NEW',
    Done = 'DONE',
}

export enum BookingPaymentStatus {
    UNPAID = 'UNPAID',
    PAID = 'PAID',
}

export enum BookingStatus {
    /**
     * `Booked`
     */
    New = 'NEW',
    /**
     * `Confirmed`
     */
    Confirm = 'CONFIRM',
    /**
     * `Arrived`
     */
    CheckIn = 'CHECK_IN',
    /**
     * `In service`
     */
    InService = 'IN_SERVICE',
    /**
     * `Waiting payment`
     */
    Checkout = 'CHECKOUT',
    /**
     * `Closed`
     *  */
    Done = 'DONE',
    /**
     * `Canceled`
     * */
    Canceled = 'CANCELED',
    /**
     * `Absent`
     * */
    Absent = 'ABSENT',
}

export enum BookingPaymentMethod {
    Cash = 'CASH',
    Card = 'CARD',
    Giftcard = 'GIFTCARD',
    Reward = 'REWARD',
    SplitPayment = 'SPLIT_PAYMENT',
    Other = 'OTHER',
    QrPay = 'QR_PAY',
}

export enum BookingCreatorType {
    User = 'USER',
}

export enum BookingTrackinStatus {
    Idle = 'IDLE',
    Start = 'STARTED',
    Pause = 'PAUSED',
    Done = 'DONE',
}

export enum BookingNotiChannelType {
    Sms = 'SMS',
    Email = 'EMAIL',
}

export enum BookingTimeFutureType {
    Day = 'DAY',
    Month = 'MONTH',
}

export enum BookingPaymentLogType {
    Payment = 'PAYMENT',
    Created = 'CREATED',
    AddNote = 'ADD_NOTE',
}
export enum BookingPaymentLogStatus {
    Success = 'SUCCESS',
    Pending = 'PENDING',
    Processing = 'PROCESSING',
    Failed = 'FAILED',
}
