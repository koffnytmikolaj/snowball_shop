import { SearchParams } from "enums/SearchEnums";
import { Filters } from "enums/store";
import { IFilterParams, ISearchParams } from "interfaces/SearchInterfaces";
import { SearchParamsType } from "types/SearchTypes";

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
            filterName: SearchParams.ORDER_BY, 
            locationValue: orderBy, 
            isEmpty: (value: SearchParamsType) => Number(value) === Filters.DEFAULT,
        },
        {
            filterName: SearchParams.REVERSE, 
            locationValue: reverse, 
            isEmpty: (value: SearchParamsType) => !Boolean(value),
        },
        {
            filterName: SearchParams.SEARCH_TEXT, 
            locationValue: searchText, 
            isEmpty: (value: SearchParamsType) => value.toString().trim() === '',
        },
    ];
}

const getSearchList = (searchParams: ISearchParams, filter: SearchParams, newValue: SearchParamsType): string[] => {
    const filtersParams: IFilterParams[] = getFilterParams(searchParams);
    return filtersParams.map(filtersParam =>
        pushFilter(filter, filtersParam, newValue)
    ).filter(param => param !== '');
}

// ------------------------------- EXPORTED -------------------------------

export const getSearchParams = (params: string[][]): ISearchParams => {
    const defaultSearchParams: ISearchParams = {
        searchText: '',
        reverse: false,
        orderBy: Filters.DEFAULT,
    }
    return params.reduce((data, [k, value]) => {
        const key = k as SearchParams;
        switch (key) {
            case SearchParams.ORDER_BY:
                data[key] = Number(value);
                break;
            case SearchParams.REVERSE:
                data[key] = value === 'true';
                break;
            case SearchParams.SEARCH_TEXT:
                data[key] = value;
                break;
            default: 
                break;
        }
        return data;
    }, defaultSearchParams)
}

export const typeSearchPath = (
    filter: SearchParams, 
    searchParams: ISearchParams, 
    newValue: SearchParamsType,
    path: string,
): string => {
    const searchList: string[] = getSearchList(searchParams, filter, newValue);
    const searchPath: string = searchList.join('&');
    return searchPath ? `${path}?${searchPath}` : path;
}
