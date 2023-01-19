import { Filters } from 'enums/store';
import { sleep } from 'helpers/timeHelpers';
import { ITrack } from 'interfaces/TrackInterfaces';
import { IDatabase, IGetTracksParameters } from 'interfaces/StoreInterfaces';
import Database from './store.json';

export const getDatabase = async (): Promise<IDatabase> => {
    await sleep(Math.random() * 500);
    return Database as IDatabase;
}

export const doesKeywordAppearInTrack = (track: ITrack, keyword: string): boolean => {
    const { composition, movement, ensemble } = track;
    return (
        composition.toLowerCase().includes(keyword.toLowerCase()) ||
        movement.toLowerCase().includes(keyword.toLowerCase()) ||
        ensemble.toLowerCase().includes(keyword.toLowerCase())
    );
}

// ------------------------------- GET REDUCED TRACKS -------------------------------

const sortByFilters = (track1: ITrack, track2: ITrack, orderBy: Filters): number => {
    switch (orderBy) {
        case Filters.COMPOSITION:
            return track1.composition.localeCompare(track2.composition);
        case Filters.ENSEMBLE:
            return track1.ensemble.localeCompare(track2.ensemble);
        case Filters.TRACK_LENGTH:
            return track1.seconds < track2.seconds ? -1 : 1;
        default:
            return track1.id < track2.id ? -1 : 1;
    }
}

const getSortedTracks = (tracks: ITrack[], orderBy: Filters, reverse: boolean): ITrack[] => {
    const sortedTracks = tracks.sort((track1, track2) => sortByFilters(track1, track2, orderBy));
    return reverse ? sortedTracks.reverse() : sortedTracks;
}

export const getReducedTracks = (parameters: IGetTracksParameters, tracks: ITrack[]): ITrack[] => {
    const { pageNumber = 1, orderBy = Filters.DEFAULT, reverse = false } = parameters;
    const sortedTracks: ITrack[] = getSortedTracks(tracks, orderBy, reverse);
    return sortedTracks.slice((pageNumber - 1) * 9, pageNumber * 9);
}