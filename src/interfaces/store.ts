import { Filters, trackSections } from "enums/store";
import { TrackSectionType } from "types/Tracks";

export interface IDatabase {
    tracks: ITrack[];
}

export interface ITrack {
    [trackSections.ID]: number;
    [trackSections.COMPOSER]: string;
    [trackSections.COMPOSITION]: string;
    [trackSections.MOVEMENT]: string;
    [trackSections.ENSEMBLE]: string;
    [trackSections.SOURCE]: string;
    [trackSections.TRANSCRIBER]: string;
    [trackSections.CATALOG_NAME]: string;
    [trackSections.SECONDS]: number;
}

export interface ITrackSection {
    section: trackSections;
    value?: TrackSectionType;
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