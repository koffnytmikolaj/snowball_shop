import { KeyboardEvent, MutableRefObject, useCallback, useRef } from 'react';
import { useNavigate } from "react-router";
import { ButtonVariants } from "enums/Button";
import { useAppContext } from "providers/app/app.providers";
import { Pagination } from "..";
import { SearchBarProps } from './interface';
import Button from 'components/Button/Button';
import style from './searchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props: SearchBarProps) {
    const { location } = useAppContext();
    const { numberOfPages } = props;
    const navigate = useNavigate();
    const inputReference = useRef() as MutableRefObject<HTMLInputElement>;
    const composer = location.section2 || '';
    const composerName = `${composer.charAt(0).toUpperCase()}${composer.slice(1)}`

    const handleClick = useCallback(() => {
        const searchPath = inputReference.current.value.trim()
            ? `?searchText=${inputReference.current.value.trim()}`
            : ''
        navigate(`${location.section1}/${location.section2}/1${searchPath}`);
    }, [location, navigate]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleClick();
    }, [handleClick])
    
    if (!composerName || numberOfPages < 0) return null;
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