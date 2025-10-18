export type CTabsOption<T = string> = {
    label: string;
    value: T;
    disabled?: boolean;
};

export type CTabsClassNames = {
    wrapper?: string;
    base?: string;
    tab?: string;
    indicator?: string;
};

export type CTabProps<T = string> = {
    options: CTabsOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    className?: string;
    classNames?: CTabsClassNames;
};
