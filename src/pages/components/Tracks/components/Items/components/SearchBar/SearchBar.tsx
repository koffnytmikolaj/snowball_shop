import { KeyboardEvent, MutableRefObject, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from "react-router";
import { ButtonVariants } from "enums/Button";
import { useAppContext } from "providers/app/app.providers";
import { Pagination } from "..";
import { SearchBarProps } from './interface';
import Button from 'components/Button/Button';
import style from './searchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props: SearchBarProps) {
    const { location } = useAppContext();
    const { numberOfPages, setSearchText } = props;
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const inputReference = useRef() as MutableRefObject<HTMLInputElement>;
    const composer = location.section2 || '';
    const composerName = `${composer.charAt(0).toUpperCase()}${composer.slice(1)}`

    const handleClick = useCallback(() => {
        const { search } = currentLocation;
        const getSearchPath = (): string => {
            if (search) {
                let searchPath = '';
                search.slice(1).split('&').forEach(searchParam => {
                    if (searchParam.slice(0, searchParam.indexOf('=')) === 'searchText') {
                        searchPath += `searchText=${inputReference.current.value}&`;
                        return;
                    }
                    searchPath += `${searchParam}&`;
                })
                return searchPath.slice(0, searchPath.length - 1);
            }
            return `searchText=${inputReference.current.value}`;
        }

        navigate(`${location.section1}/${location.section2}/1?${getSearchPath()}`);
        setSearchText(inputReference.current.value);
    }, [currentLocation, location, navigate, setSearchText]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleClick();
    }, [handleClick])
    
    return (
        <div className={style['search-bar']}>
            <h1 className={style['search-bar__header']}>{composerName}</h1>
            <input
                ref={inputReference}
                className={style['search-bar__input']} 
                placeholder="Szukaj" 
                onKeyDown={handleKeyDown}
            />
            
            <Button onClick={handleClick} className={style['search-bar__icon']} variant={ButtonVariants.OUTLINED}>
                <SearchIcon />
            </Button>
            <Pagination count={numberOfPages} />
        </div>
    )
}