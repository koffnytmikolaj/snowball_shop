import { TrackSections } from "enums/TrackEnums";
import { TrackSectionType } from "types/TrackTypes";

export interface ITrack {
    [TrackSections.ID]: number;
    [TrackSections.COMPOSER]: string;
    [TrackSections.COMPOSITION]: string;
    [TrackSections.MOVEMENT]: string;
    [TrackSections.ENSEMBLE]: string;
    [TrackSections.SOURCE]: string;
    [TrackSections.TRANSCRIBER]: string;
    [TrackSections.CATALOG_NAME]: string;
    [TrackSections.SECONDS]: number;
}

export interface ITrackSection {
    section: TrackSections;
    value?: TrackSectionType;
}