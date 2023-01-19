import { ITime } from "interfaces/StoreInterfaces";

export const convertSeconds = (seconds: number): ITime => {
    const hours = Math.floor(seconds / 60 / 60);
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return { 
        hours: hours >= 10 ? hours.toString() : `0${hours}`,
        minutes: minutes >= 10 ? minutes.toString() : `0${minutes}`,
        seconds: seconds >= 10 ? seconds.toString() : `0${seconds}`,
    };
}

export const convertTimeToString = (secondsNumber: number): string => {
    const { hours, minutes, seconds } = convertSeconds(secondsNumber);
    return `${hours}:${minutes}:${seconds}`;
}