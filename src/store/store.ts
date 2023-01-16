import { Filters } from 'enums/store';
import { sleep } from 'helpers/sleep';
import { IDatabase, IGetTracksParameters, ITrack } from 'interfaces/store';
import cello from 'assets/ensembles/jpg/cello.jpg';
import clarinet from 'assets/ensembles/jpg/clarinet.jpg';
import flute from 'assets/ensembles/jpg/flute.jpg';
import piano from 'assets/ensembles/jpg/piano.jpg';
import violin from 'assets/ensembles/jpg/violin.jpg';
import wind from 'assets/ensembles/jpg/wind.jpg';
import Database from './store.json';

const getDatabase = async (): Promise<IDatabase> => {
    await sleep(Math.random() * 100);
    return Database as IDatabase;
}

export const getAllTracks = async (): Promise<ITrack[]> => {
    const database: IDatabase = await getDatabase();
    return database.tracks;
}

export const getAllComposers = async (): Promise<string[]> => {
    const tracks = await getAllTracks();
    const composers: string[] = tracks.reduce((data: string[], track) => {
        data.push(track.composer)
        return data;
    }, []);
    return composers.filter(
        (item, index) => composers.indexOf(item) === index
    ).sort((a, b) => a.localeCompare(b));
}

const doesKeywordAppearInTrack = (track: ITrack, keyword: string): boolean => {
    const { composition, movement, ensemble } = track;
    return (
        composition.toLowerCase().includes(keyword.toLowerCase()) ||
        movement.toLowerCase().includes(keyword.toLowerCase()) ||
        ensemble.toLowerCase().includes(keyword.toLowerCase())
    );
}

export const getAllTracksByComposer = async (composer: string, searchText?: string): Promise<ITrack[]> => {
    const tracks: ITrack[] = await getAllTracks();
    return tracks.filter(
        track => 
            track.composer.toLowerCase() === composer.toLowerCase() &&
            doesKeywordAppearInTrack(track, searchText || '')
    );
}

const sortByFilters = (track1: ITrack, track2: ITrack, orderBy: Filters): number => {
    switch (orderBy) {
        case Filters.COMPOSER:
            return track1.composer.localeCompare(track2.composer);
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

const getReducedTracks = (parameters: IGetTracksParameters, tracks: ITrack[]): ITrack[] => {
    const { pageNumber = 1, orderBy = Filters.DEFAULT, reverse = false } = parameters;
    const sortedTracks: ITrack[] = getSortedTracks(tracks, orderBy, reverse);
    return sortedTracks.slice((pageNumber - 1) * 9, pageNumber * 9);
}

export const getFilteredTracks = async (parameters: IGetTracksParameters): Promise<ITrack[]> => {
    const tracks: ITrack[] = await getAllTracks();
    return getReducedTracks(parameters, tracks);
}

export const getFilteredTracksByComposer = async (parameters: IGetTracksParameters, composer: string): Promise<ITrack[]> => {
    const { searchText } = parameters;
    const tracks: ITrack[] = await getAllTracksByComposer(composer, searchText);
    return getReducedTracks(parameters, tracks);
}

export const getNumberOfPages = async (): Promise<number> => {
    const tracks: ITrack[] = await getAllTracks();
    return Math.ceil(tracks.length / 9);
}

export const getNumberOfPagesByComposer = async (composer: string, searchText?: string): Promise<number> => {
    const tracks: ITrack[] = await getAllTracksByComposer(composer, searchText);
    return Math.ceil(tracks.length / 9);
}

export const getAllEnsembles = async (): Promise<string[]> => {
    const tracks = await getAllTracks();
    const ensembles: string[] = tracks.reduce((data: string[], track) => {
        data.push(track.ensemble)
        return data;
    }, []);
    return ensembles.filter(
        (item, index) => ensembles.indexOf(item) === index
    ).sort((a, b) => a.localeCompare(b));
}

export const getImageForTrack = (track: ITrack): string => {
    const { ensemble } = track;
    switch (ensemble) {
        case 'Accompanied Cello':
        case 'Solo Cello':
            return cello;
        case 'Accompanied Clarinet':
        case 'Clarinet-Cello-Piano Trio':
        case 'Clarinet Quintet':
        case 'Pairs Clarinet-Horn-Bassoon':
            return clarinet;
        case 'Solo Flute':
            return flute;
        case 'Horn Piano Trio':
        case 'Piano Quartet':
        case 'Piano Quintet':
        case 'Piano Trio':
        case 'Solo Piano':
            return piano;
        case 'Accompanied Violin':
        case 'Solo Violin':
        case 'String Quartet':
        case 'String Sextet':
        case 'Viola Quintet': //hehe
        case 'Violin and Harpsichord':
            return violin;
        case 'Wind and Strings Octet':
        case 'Wind Octet':
        case 'Wind Quintet':
            return wind;
        default:
            return '';
    }
}