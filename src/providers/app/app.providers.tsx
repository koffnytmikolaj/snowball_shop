import { createContext, useContext, Component } from 'react';
import { AppContext } from './app.types';
import { Props, State, ILocation } from './app.types';

const appContext = createContext<AppContext>(undefined!);

export class AppProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.setLocation = this.setLocation.bind(this);
        this.state = {
            context: {
                location: {
                    section1: undefined,
                    section2: undefined,
                    section3: 1,
                    section4: undefined,
                },
                setLocation: this.setLocation,
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

    setLocation = (location: ILocation) => {
        this.setState(prev => ({
            ...prev, 
            context: {
                ...prev.context, 
                location
            }
        }));
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

