import { createContext, useContext, Component } from 'react';
import { sections } from '../../enums/SectionType';
import { AppContext } from './app.types';
import { Props, State } from './app.types';

const appContext = createContext<AppContext>(undefined!);

export class AppProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.setActivePage = this.setActivePage.bind(this);
        this.state = {
            context: {
                activePage: sections.MAIN_PAGE,
                setActivePage: this.setActivePage,
            },
        };
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
    
    setActivePage = (section: sections) => {
        this.setState(prev => (
            { ...prev, context: 
                    { ...prev.context, activePage: section } 
            }
        ));
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

