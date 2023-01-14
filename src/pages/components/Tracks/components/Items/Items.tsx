import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Filters } from "enums/store";
import { IGetTracksParameters, ITrack } from "interfaces/store";
import { useAppContext } from "providers/app/app.providers";
import { getFilteredTracks, getFilteredTracksByComposer, getNumberOfPagesByComposer } from "store/store";
import { Item, Pagination, SearchBar } from "./components";
import style from './items.module.css'

export default function Items() {
    const { location } = useAppContext();
    const currentLocation = useLocation();
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [items, setItems] = useState<ITrack[]>([]);
    const [searchText, setSearchText] = useState<string>();

    useEffect(() => {
        if (!location.section1) return;
        const setComposerTracks = async () => {
            const parameters: IGetTracksParameters = {
                searchText,
                pageNumber: location.section3,
                orderBy: Filters.DEFAULT,
                reverse: false,
            };
            const tracks = await getFilteredTracksByComposer(parameters, location.section2 || '');
            setItems(tracks);
            const pagesNumber = await getNumberOfPagesByComposer(location.section2 || '', searchText);
            setNumberOfPages(pagesNumber);
        }

        const setTracks = async () => {
            const parameters: IGetTracksParameters = {
                orderBy: Filters.TRACK_LENGTH,
            };
            const tracks = await getFilteredTracks(parameters);
            setItems(tracks);
            setNumberOfPages(1);
        }

        location.section2 
            ? setComposerTracks()
            : setTracks()
    }, [currentLocation, location, searchText]);

    useEffect(() => {
        const { search } = currentLocation;
        search.slice(1).split('&').forEach(searchParam => {
            switch (searchParam.slice(0, searchParam.indexOf('='))) {
                case 'searchText':
                    setSearchText(searchParam.slice(searchParam.indexOf('=') + 1));
                    break;
                default:
                    break;
            }
        })
    }, [currentLocation]);
    
    return (
        <div className={style.items}>
            {location.section2 && 
                <>
                    <SearchBar numberOfPages={numberOfPages} setSearchText={setSearchText} />
                </>
            }
            {items.length > 0 && (
                <>
                    <div className={style.items__grid} >
                        {items.map(item => <Item key={item.id} product={item} />)}
                    </div>
                    {location.section2 && <Pagination count={numberOfPages} />}
                </>
            )}
        </div>
    );
}
