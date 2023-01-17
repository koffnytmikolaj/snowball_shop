import { searchParams } from "enums/search";
import { Filters } from "enums/store";
import { IFilterParams, ISearchParams } from "interfaces/Search";
import { SearchParamsType } from "types/Search";

export const getSearchParams = (params: string[][]): ISearchParams => {
    const defaultSearchParams: ISearchParams = {
        searchText: '',
        reverse: false,
        orderBy: Filters.DEFAULT,
    }
    return params.reduce((data, [k, value]) => {
        const key = k as searchParams;
        switch (key) {
            case searchParams.ORDER_BY:
                data[key] = Number(value);
                break;
            case searchParams.REVERSE:
                data[key] = value === 'true';
                break;
            case searchParams.SEARCH_TEXT:
                data[key] = value;
                break;
            default: 
                break;
        }
        return data;
    }, defaultSearchParams)
}

const pushFilter = (filter: keyof ISearchParams, filtersParam: IFilterParams, newValue: SearchParamsType): string => {
    const { filterName, locationValue, isEmpty } = filtersParam;
    const isFilter: boolean = filter === filterName;
    const checkedValue = isFilter ? newValue : locationValue;
    return isEmpty(checkedValue) ? '' : `${filterName}=${checkedValue}`;
}

const getFilterParams = (params: ISearchParams): IFilterParams[] => {
    const { orderBy, reverse, searchText } = params;
    return [
        {
            filterName: searchParams.ORDER_BY, 
            locationValue: orderBy, 
            isEmpty: (value: SearchParamsType) => Number(value) === Filters.DEFAULT,
        },
        {
            filterName: searchParams.REVERSE, 
            locationValue: reverse, 
            isEmpty: (value: SearchParamsType) => !Boolean(value),
        },
        {
            filterName: searchParams.SEARCH_TEXT, 
            locationValue: searchText, 
            isEmpty: (value: SearchParamsType) => value.toString().trim() === '',
        },
    ];
}

const getSearchList = (searchParams: ISearchParams, filter: searchParams, newValue: SearchParamsType): string[] => {
    const filtersParams: IFilterParams[] = getFilterParams(searchParams);
    return filtersParams.map(filtersParam =>
        pushFilter(filter, filtersParam, newValue)
    ).filter(param => param !== '');
}

export const typeSearchPath = (
    filter: searchParams, 
    searchParams: ISearchParams, 
    newValue: SearchParamsType,
    path: string,
): string => {
    const searchList: string[] = getSearchList(searchParams, filter, newValue);
    const searchPath: string = searchList.join('&');
    return searchPath ? `${path}?${searchPath}` : path;
}
