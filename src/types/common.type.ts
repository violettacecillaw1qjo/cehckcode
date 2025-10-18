export type CrudAction = 'addNew' | 'edit';

export type OptionItem<T = any> = {
    label: any;
    value: T;
    desc?: any;
    icon?: any;
    avatar?: any;
    color?: any;
    type?: any;
};

export type UserInfo = {
    _id: string;
    email: string;
    fullName: string;
    avatar?: string;
};

export type AppPagination = {
    page: number;
    size: number;
    totalItem: number;
    totalPage: number;
    hasNext: boolean;
};

export type PayloadPagination = {
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPage: number;
    previousPage: number;
    totalPages: number;
};

export type UploadFile = {
    uid: string;
    src: string;
    name: string;
    size: number;
    type: string;
    file?: File;
};

export type Media = {
    url: string;
    name: string;
};

export type SearchParams = {
    page: number;
    size: number;
    keyword: string;
    sort?: SortParams;
};

export type SortParams = {
    field: string;
    isAsc: boolean;
};

export type FilterDate = {
    from: number;
    to: number;
};

export type CommonTblItem = {} & CommonDto;

export type CommonDto = {
    id: string;
    createdDate: number;
    lastUpdatedDate: number;
};

export type SoraDto = {
    tenantId: string;
} & CommonDto;

export type Image = {
    id?: string;
    name?: string;
    src?: string;
    size?: number;
    file?: File;
    type?: string;
    width?: number;
    height?: number;
};

export type RangeQuery = {
    field: string;
    from: number;
    to: number;
};

export type ResponseData<T> = {
    items: T;
} & PayloadPagination;

export type FuncCommonChangeKeyItem<T> = <K extends keyof T>(field: K) => (value: T[K]) => void;

export type NestedKeyPath<T> = T extends object
    ? T extends any[]
        ? never
        : {
              [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeyPath<T[K]>}` : K) : never;
          }[keyof T]
    : never;

export type Address = {
    city: string;
    state: string;
    value: string;
    zip: string;
    country: string;
};
