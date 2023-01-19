import { Filters } from "enums/store";
import { ITrack } from "interfaces/TrackInterfaces";

export interface IDatabase {
    tracks: ITrack[];
}

export interface IGetTracksParameters {
    orderBy?: Filters;
    pageNumber?: number;
    reverse?: boolean;
    searchText?: string;
}

export interface ITime {
    hours: string;
    minutes: string;
    seconds: string;
}