import { trackSections } from "enums/store";
import { TrackSectionType } from "types/Tracks";

export interface TrackContentProps {
    id: trackSections;
    index: number;
    value?: TrackSectionType;
    show: boolean;
}