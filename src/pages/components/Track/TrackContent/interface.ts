import { trackSections } from "enums/store";
import { TrackSectionType } from "types/TrackTypes";

export interface TrackContentProps {
    id: trackSections;
    index: number;
    value?: TrackSectionType;
    show: boolean;
}