import { TrackSectionType } from "types/TrackTypes";
import { trackSections } from "enums/store";

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