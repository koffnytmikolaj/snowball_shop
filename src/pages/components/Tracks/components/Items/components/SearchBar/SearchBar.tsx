import { KeyboardEvent, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
import { ButtonVariants } from "enums/ButtonEnums";
import { SearchParams } from 'enums/SearchEnums';
import { typeSearchPath } from 'helpers/searchHelpers';
import { useAppContext } from "providers/app/app.providers";
import { Pagination } from "..";
import { SearchBarProps } from './interface';
import Button from 'components/Button/Button';
import style from './searchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props: SearchBarProps) {
    const { searchParams: search, section1, section2 } = useAppContext();
    const { isPageLoading, numberOfPages } = props;
    const navigate = useNavigate();
    const inputReference = useRef() as MutableRefObject<HTMLInputElement>;
    const composer: string = section2 || '';
    const composerName: string = `${composer.charAt(0).toUpperCase()}${composer.slice(1)}`;

    const searchPhrase = useCallback(() => {
        const path: string = `${section1}/${section2}/1`;
        const newPath: string = typeSearchPath(
            SearchParams.SEARCH_TEXT, 
            search, 
            inputReference.current.value.trim(), 
            path
        );
        navigate(newPath);
    }, [search, section1, section2, navigate]);

    useEffect(() => {
        inputReference.current &&
        numberOfPages >= 0 &&
            (inputReference.current.value = search.searchText);
    }, [search, numberOfPages])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && searchPhrase();
    }, [searchPhrase]);
    
    if (!composerName || numberOfPages < 0) return null;
    return (
        <div className={style['search-bar']}>
            <h1 className={style['search-bar__header']}>{composerName}</h1>
            <input
                ref={inputReference}
                className={style['search-bar__input']} 
                placeholder="Szukaj" 
                onKeyDown={handleKeyDown}
                disabled={isPageLoading}
            />
            <Button 
                onClick={searchPhrase} 
                className={style['search-bar__icon']} 
                variant={ButtonVariants.OUTLINED}
                disabled={isPageLoading}
            >
                <SearchIcon />
            </Button>
            <Pagination count={numberOfPages} isPageLoading={isPageLoading} />
        </div>
    )
}