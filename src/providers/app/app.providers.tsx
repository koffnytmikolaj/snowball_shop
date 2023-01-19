import { createContext, useContext, Component } from 'react';
import { Sections } from 'enums/SectionType';
import { Filters } from 'enums/StoreEnums';
import { ISearchParams } from 'interfaces/SearchInterfaces';
import { AppContext, Props, State } from './app.types';

const appContext = createContext<AppContext>(undefined!);

export class AppProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.setSection1 = this.setSection1.bind(this);
        this.setSection2 = this.setSection2.bind(this);
        this.setSection3 = this.setSection3.bind(this);
        this.setSection4 = this.setSection4.bind(this);
        this.setSearchParams = this.setSearchParams.bind(this);
        this.state = {
            context: {
                section1: undefined,
                section2: undefined,
                section3: 1,
                section4: undefined,
                searchParams: {
                    orderBy: Filters.DEFAULT,
                    reverse: false,
                    searchText: '',
                },
                setSection1: this.setSection1,
                setSection2: this.setSection2,
                setSection3: this.setSection3,
                setSection4: this.setSection4,
                setSearchParams: this.setSearchParams,
            },
        };
    }

    setSection1 = (section1: Sections) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                section1,
            }
        }));
    }

    setSection2 = (section2: string) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                section2,
            }
        }));
    }

    setSection3 = (section3: number) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                section3,
            }
        }));
    }

    setSection4 = (section4: string) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                section4,
            }
        }));
    }

    setSearchParams = (searchParams: ISearchParams) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                searchParams,
            }
        }));
    }

    setItemInLocalStorage<T>(key: string, value: T): boolean {
        try {
            const _val = JSON.stringify(value);
            localStorage.setItem(key, _val);
            return true;
        } catch (_e) {
            return false;
        }
    }

    render() {
        return (
            <appContext.Provider value={this.state.context}>
                {this.props.children}
            </appContext.Provider>
        );
    }
}

export const useAppContext = () => {
    const context = useContext(appContext);
    if (context === undefined) {
      throw new Error(`useAppContext must be used within a AppProvider`);
    }
    return context;
  };

