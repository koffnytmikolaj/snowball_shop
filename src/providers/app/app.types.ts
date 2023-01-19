import { ReactNode } from 'react';
import { Sections } from 'enums/SectionType';
import { ISearchParams } from 'interfaces/SearchInterfaces';
import { AppProvider } from './app.providers';

export interface AppContext {
    section1?: Sections;
    setSection1: InstanceType<typeof AppProvider>['setSection1'];
    section2?: string;
    setSection2: InstanceType<typeof AppProvider>['setSection2'];
    section3: number;
    setSection3: InstanceType<typeof AppProvider>['setSection3'];
    section4?: string;
    setSection4: InstanceType<typeof AppProvider>['setSection4'];
    searchParams: ISearchParams;
    setSearchParams: InstanceType<typeof AppProvider>['setSearchParams'];
}

export interface Props {
    readonly children: ReactNode
}

export interface State {
    readonly context: AppContext;
};
