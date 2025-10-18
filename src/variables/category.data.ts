import { themeColors } from '@/styles/config';

import { CategoryType } from '@/enums/classify.enum';

export const CategoryMappingColor: Record<CategoryType.Service | CategoryType.Product, string> = {
    [CategoryType.Service]: themeColors.green,
    [CategoryType.Product]: themeColors.green,
};
