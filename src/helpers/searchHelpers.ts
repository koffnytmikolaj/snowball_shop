import { ISearchParams } from "interfaces/Search";

export const getSearchParams = (params: string[][]): ISearchParams => {
    const keys = ['searchText'];
    const searchParams: ISearchParams = {
        searchText: '',
    }
    return params.reduce((data, [key, value]) => {
        keys.includes(key) && (data[key as keyof ISearchParams] = value);
        return data;
    }, searchParams)
}
