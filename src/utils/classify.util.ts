import { isArray } from 'lodash-es';

import { ClassifyData, ParsedClassifyData } from '@/types/category.type';

export const groupClassifyByParent = (items: ClassifyData[]): ParsedClassifyData[] => {
    const dataGroup = items.reduce<Record<string, ParsedClassifyData>>(
        (acc, item) => {
            const { parentId, id } = item;

            if (!parentId) {
                acc[id] = {
                    ...item,
                    children: [],
                };
                return acc;
            }

            if (acc[parentId] && acc[parentId].children) acc[parentId].children.push(item);

            return acc;
        },
        {} as Record<string, ParsedClassifyData>,
    );

    return Object.values(dataGroup).map((item) => ({
        ...item,
        children: isArray(item.children) && !!item.children.length ? item.children : undefined,
    }));
};

export const flattenClassifyTree = (items: ParsedClassifyData[]): ClassifyData[] => {
    return items.reduce<ClassifyData[]>((acc, { children, ...rest }) => {
        if (!children) {
            acc.push(rest);
            return acc;
        }
        acc.push(rest, ...flattenClassifyTree(children));

        return acc;
    }, []);
};
