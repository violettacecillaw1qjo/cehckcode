export enum CalendarDirectionType {
    Prev = 'prev',
    Next = 'next',
}

export type CCalendarProps = {
    value?: Date;
    disableAfter?: Date;
    onChange?: (date: Date) => void;
};
