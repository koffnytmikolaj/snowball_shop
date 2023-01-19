import { TrackSections } from "enums/TrackEnums";
import { TrackSectionType } from "types/TrackTypes";

export interface TrackContentProps {
    id: TrackSections;
    index: number;
    value?: TrackSectionType;
    show: boolean;
}