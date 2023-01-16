import { ReactNode } from 'react';
import { sections } from 'enums/SectionType';
import { ISearchParams } from 'interfaces/Search';
import { AppProvider } from './app.providers';

export interface ILocation {
    section1?: sections;
    section2?: string;
    section3: number;
    section4?: string;
    searchParams: ISearchParams;
}

export interface AppContext {
    location: ILocation;
    setLocation: InstanceType<typeof AppProvider>['setLocation'];
}

export interface Props {
    readonly children: ReactNode
}

export interface State {
    readonly context: AppContext;
};
