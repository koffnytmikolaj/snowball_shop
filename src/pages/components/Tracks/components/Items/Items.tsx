import { useCallback, useEffect, useState } from "react";
import { SectionsNames } from "enums/SectionType";
import { Filters } from "enums/store";
import { ISearchParams } from "interfaces/SearchInterfaces";
import { IGetTracksParameters } from 'interfaces/StoreInterfaces';
import { ITrack } from "interfaces/TrackInterfaces";
import { useAppContext } from "providers/app/app.providers";
import { getFilteredTracks, getFilteredTracksByComposer, getNumberOfPagesByComposer } from "store/store";
import { Item, Pagination, SearchBar } from "./components";
import { ItemsProps } from "./interface";
import ReactLoading from "react-loading";
import style from './items.module.css'

export default function Items(props: ItemsProps) {
    const { isPageLoading, setIsPageLoading } = props;
    const { searchParams, section1, section2, section3 } = useAppContext();
    const [numberOfPages, setNumberOfPages] = useState<number>(-1);
    const [items, setItems] = useState<ITrack[]>([]);
    const [defaultItems, setDefaultItems] = useState<ITrack[]>([]);
    const showDefaultItems: boolean = !section2;

    const setComposerTracks = useCallback(
        async (searchParams: ISearchParams, composer: string, pageNumber: number) => {
            setIsPageLoading(true);
            const { orderBy, reverse, searchText } = searchParams;
            const parameters: IGetTracksParameters = {
                searchText,
                pageNumber,
                orderBy,
                reverse,
            };
            const tracks = await getFilteredTracksByComposer(parameters, composer || '');
            const pagesNumber = await getNumberOfPagesByComposer(composer || '', searchText);
            setNumberOfPages(pagesNumber);
            setItems(tracks);
            setIsPageLoading(false);
        }, 
        [setIsPageLoading]
    );

    const setTracks = useCallback(async () => {
        setIsPageLoading(true);
        const parameters: IGetTracksParameters = {
            orderBy: Filters.COMPOSITION,
        };
        const tracks = await getFilteredTracks(parameters);
        setNumberOfPages(-1);
        setDefaultItems(tracks);
        setIsPageLoading(false);
    }, [setIsPageLoading])

    useEffect(() => {
        if (!section1 || section2 === SectionsNames.TRACK) return;
        section2 
            ? setComposerTracks(searchParams, section2, section3)
            : setTracks();
    }, [searchParams, section1, section2, section3, setComposerTracks, setTracks]);

    const getItems = useCallback(() => showDefaultItems ? defaultItems : items, [defaultItems, items, showDefaultItems]);

    return (
        <div className={style.items}>
            {!showDefaultItems && <SearchBar isPageLoading={isPageLoading} numberOfPages={numberOfPages} />}
            {isPageLoading ? (
                <div className={style.items__loader}>
                    <ReactLoading type="spokes" color="black" />
                </div>
            ) : showDefaultItems || items.length > 0 ? (
                <>
                    <div className={style.items__grid} >
                        {getItems().map(item => <Item key={item.id} product={item} />)}
                    </div>
                    {section2 && numberOfPages > 0 && <Pagination count={numberOfPages} isPageLoading={isPageLoading} />}
                </>
            ) : <h1 className={style['items__no-data']}>Brak wyników wyszukiwania!</h1>
            }
        </div>
    );
}
