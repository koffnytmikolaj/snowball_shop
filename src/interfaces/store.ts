import { Filters } from "enums/store";

export interface IDatabase {
    tracks: ITrack[];
}

export interface ITrack {
    id: number;
    composer: string;
    composition: string;
    movement: string;
    ensemble: string;
    source: string;
    transcriber: string;
    catalog_name: string;
    seconds: number;
}

export interface IGetTracksParameters {
    orderBy?: Filters;
    pageNumber?: number;
    reverse?: boolean;
    searchText?: string;
}