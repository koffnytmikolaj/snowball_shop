import { ReactNode } from 'react';
import { sections } from '../../enums/SectionType';
import { AppProvider } from './app.providers';

export interface AppContext {
    activePage: sections;
    setActivePage: InstanceType<typeof AppProvider>['setActivePage']
}

export interface Props {
    readonly children: ReactNode
}

export interface State {
    readonly context: AppContext;
};
