import { searchParams } from "enums/search";
import { Filters } from "enums/store";
import { SearchParamsType } from "types/Search";

export interface ISearchParams {
    [searchParams.SEARCH_TEXT]: string;
    [searchParams.REVERSE]: boolean;
    [searchParams.ORDER_BY]: Filters
}

export interface IFilterParams {
    filterName: searchParams;
    locationValue: SearchParamsType;
    isEmpty: (v: SearchParamsType) => boolean;
}