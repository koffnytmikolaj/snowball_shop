import { SearchParams } from "enums/SearchEnums";
import { Filters } from "enums/store";
import { SearchParamsType } from "types/SearchTypes";

export interface ISearchParams {
    [SearchParams.ORDER_BY]: Filters;
    [SearchParams.REVERSE]: boolean;
    [SearchParams.SEARCH_TEXT]: string;
}

export interface IFilterParams {
    filterName: SearchParams;
    locationValue: SearchParamsType;
    isEmpty: (v: SearchParamsType) => boolean;
}