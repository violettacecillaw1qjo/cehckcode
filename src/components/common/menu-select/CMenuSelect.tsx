import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import clsx from 'clsx';
import { cloneDeep, isArray, isEmpty } from 'lodash-es';
import { useMemo, useState } from 'react';

import { OptionItem } from '@/types/common.type';

import { useTranslation } from '@/cores/i18n';

import useDeepMemo from '@/hooks/common/useDeepMemo';

import { arrayNotEmpty } from '@/utils/common.util';
import { removeAccents } from '@/utils/string.util';

import IconRoundedSquare from '@/assets/icons/common/RoundedSquare';
import IconSearch from '@/assets/icons/common/Search';
import IconTickBox from '@/assets/icons/common/TickBox';

import FieldInput from '@/components/common/input/CInput';

import { HandleClickType, MenuSelectType, OnChange } from './CMenuSelect.type';

type CMenuSelectProps = {
    children: any;
    options: OptionItem[];
    type?: MenuSelectType;
    selecteds?: OptionItem[];
    onChange: OnChange;
};

const CMenuSelect = (props: CMenuSelectProps) => {
    const { type = MenuSelectType.Multi, selecteds, options, children, onChange } = props;

    const { t, i18n } = useTranslation();

    const [keyword, setKeyword] = useState<string>('');

    const searchResults = useDeepMemo<OptionItem[]>(() => {
        const keywordUnsigned = removeAccents(keyword).trim();
        const searchResults = arrayNotEmpty(options)
            ? options.filter((i) => {
                  const { label } = i;
                  if (!keywordUnsigned) return i;
                  const labelUnsigned = removeAccents(t(label));
                  return labelUnsigned.includes(keywordUnsigned);
              })
            : [];
        return searchResults;
    }, [options, keyword]);

    const selectedResults = useDeepMemo<string[]>(() => {
        let ids: string[] = [];
        if (isArray(selecteds) && !isEmpty(selecteds)) {
            ids = selecteds.map((i: OptionItem) => i?.value);
        }
        return ids;
    }, [selecteds, i18n.language]);

    const isSelectedAll = useMemo(() => {
        return selectedResults.length === options?.length;
    }, [selectedResults.length, options?.length]);

    const handleClick = (cType: HandleClickType, cValue?: any) => {
        switch (cType) {
            case HandleClickType.Select:
                {
                    if (!cValue) return;
                    const result: OptionItem[] = isArray(selecteds) ? selecteds : [];
                    if (type === MenuSelectType.Multi) {
                        result.push(cValue);
                        onChange(result);
                    } else {
                        onChange([cValue]);
                    }
                }
                break;
            case HandleClickType.Unselect:
                {
                    if (!cValue) return;
                    let result: OptionItem[] = isArray(selecteds) ? selecteds : [];
                    result = result.filter((i: OptionItem) => i.value !== cValue.value);
                    onChange(result);
                }
                break;
            case HandleClickType.SelectAll:
                onChange(isArray(options) && !isEmpty(options) ? cloneDeep(options) : []);
                break;
            case HandleClickType.UnselectAll:
                onChange([]);
                break;
        }
    };

    return (
        <Popover placement={'bottom-start'}>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className={'min-w-[240px] max-w-[240px] p-0'}>
                <div className='w-[100%]'>
                    <div className={'px-2 pt-2'}>
                        <FieldInput
                            className={'w-full'}
                            radius={'full'}
                            size={'sm'}
                            placeholder={t('search') + ` | ${searchResults.length} ${t('value')}`}
                            startContent={<IconSearch />}
                            value={keyword}
                            onClear={() => setKeyword('')}
                            onChangeText={setKeyword}
                            // onEnter={() => onSearch?.(keyword)}
                        />
                    </div>
                    {arrayNotEmpty(searchResults) ? (
                        <>
                            <div className={'flex flex-col gap-2 pt-2'}>
                                {!keyword && (
                                    <div className={'flex select-none justify-between px-4 text-xs opacity-50'}>
                                        <span
                                            className={'cursor-pointer'}
                                            onClick={() => {
                                                handleClick(
                                                    isSelectedAll
                                                        ? HandleClickType.UnselectAll
                                                        : HandleClickType.SelectAll,
                                                );
                                            }}
                                        >
                                            {t(isSelectedAll ? 'uncheckAll' : 'checkAll')}
                                        </span>
                                        {!!selectedResults.length && (
                                            <span>
                                                {t('selected') + ` ${selectedResults.length}/${searchResults.length}`}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className={'px-2 pb-2'}>
                                    {searchResults.map((item: OptionItem) => {
                                        const { value, label } = item || {};
                                        const isSelected: boolean = selectedResults.includes(value);
                                        return (
                                            <div
                                                key={value}
                                                className={clsx(
                                                    'cursor-pointer select-none rounded-lg px-2 py-2',
                                                    'flex items-center gap-2',
                                                    '[&:not(:first-child)]:mt-1',
                                                    'hover:bg-primary-10',
                                                    {
                                                        'text-success': isSelected,
                                                    },
                                                )}
                                                onClick={() => {
                                                    handleClick(
                                                        isSelected ? HandleClickType.Unselect : HandleClickType.Select,
                                                        item,
                                                    );
                                                }}
                                            >
                                                {isSelected ? <IconTickBox /> : <IconRoundedSquare />}
                                                <span>{t(label)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex min-h-12 w-[100%] justify-center px-2 py-2 opacity-50'>
                            <span className={'opacity'}>{t('noData')}</span>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CMenuSelect;
