import { NestedKeyPath } from './common.type';

export type BaseSelectItem<T> = (T & {
    id?: string;
    name?: string;
})[];

export type BaseLevelItem<T> = BaseSelectItem<T & { parentId?: string }>;

export type MappingFieldSelect<T> = {
    /**
     * @default 'name'
     */
    label?: NestedKeyPath<T>;
    /**
     * @default 'id'
     */
    value?: NestedKeyPath<T>;
};

export type MappingFieldSelectLevel<T> = MappingFieldSelect<T> & {
    /**
     * @default 'parentId'
     *
     * @description
     * If the parent id is not in the data, you can pass the parent id directly
     */
    parentId?: NestedKeyPath<T>;
};

export type ParseLevelOptionProps<T> = {
    data: BaseLevelItem<T>;
    mappingField: MappingFieldSelectLevel<BaseLevelItem<T>[number]>;
};

export type ParseSelectOptionProps<T> = {
    data: BaseSelectItem<T>;
    mappingField: MappingFieldSelect<BaseSelectItem<T>[number]>;
};
