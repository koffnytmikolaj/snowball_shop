import { ReactNode } from 'react';
import { categories } from 'enums/Categories';
import { sections } from 'enums/SectionType';
import { AppProvider } from './app.providers';

export interface ILocation {
    section1?: sections;
    section2?: categories;
    section3: number;
    section4?: string;
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
