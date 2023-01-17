import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchParams } from 'enums/search';
import { Filters } from 'enums/store';
import { typeSearchPath } from 'helpers/searchHelpers';
import { useAppContext } from 'providers/app/app.providers';
import style from './sortSelect.module.css';

export default function SortSelect() {
    const { location } = useAppContext();
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState<Filters>(Filters.DEFAULT);
    useMemo(() => setSelectValue(location.searchParams.orderBy), [location]);
    
    const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const { section1, section2 } = location;
        const orderByValue: Filters = Number(e.target.value);
        const path: string = `${section1}/${section2}/1`;
        const newPath: string = typeSearchPath(
            searchParams.ORDER_BY, 
            location.searchParams, 
            orderByValue, 
            path
        );
        navigate(newPath);
    }, [location, navigate])
    
    return (
        <div className={style['sort-select']}>
            Sortuj:
            <select 
                className={style['sort-select__select']} 
                onChange={handleSelectChange} 
                value={selectValue}
            >
                <option value={Filters.DEFAULT}>Domyślne</option>
                <option value={Filters.COMPOSITION}>Kompozycja</option>
                <option value={Filters.ENSEMBLE}>Zespół</option>
                <option value={Filters.TRACK_LENGTH}>Długość utworu</option>
            </select>
        </div>
    )
}