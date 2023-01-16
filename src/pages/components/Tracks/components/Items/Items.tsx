import { useEffect, useState } from "react";
import { sectionsNames } from "enums/SectionType";
import { Filters } from "enums/store";
import { IGetTracksParameters, ITrack } from "interfaces/store";
import { useAppContext } from "providers/app/app.providers";
import { getFilteredTracks, getFilteredTracksByComposer, getNumberOfPagesByComposer } from "store/store";
import { Item, Pagination, SearchBar } from "./components";
import style from './items.module.css'

export default function Items() {
    const { location } = useAppContext();
    const [numberOfPages, setNumberOfPages] = useState<number>(-1);
    const [items, setItems] = useState<ITrack[]>([]);

    useEffect(() => {
        if (!location.section1 || location.section2 === sectionsNames.TRACK) return;
        const setComposerTracks = async () => {
            const { searchText } = location.searchParams;
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
            setNumberOfPages(-1);
        }

        location.section2 
            ? setComposerTracks()
            : setTracks();
    }, [location]);

    return (
        <div className={style.items}>
            {location.section2 && <SearchBar numberOfPages={numberOfPages} />}
            {items.length > 0 ? (
                <>
                    <div className={style.items__grid} >
                        {items.map(item => <Item key={item.id} product={item} />)}
                    </div>
                    {location.section2 && numberOfPages > 0 && <Pagination count={numberOfPages} />}
                </>
            ) : (
                <h1 className={style['items__no-data']}>Brak wyników wyszukiwania!</h1>
            )}
        </div>
    );
}
