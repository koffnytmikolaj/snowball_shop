import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchParams } from 'enums/SearchEnums';
import { Filters } from 'enums/StoreEnums';
import { typeSearchPath } from 'helpers/searchHelpers';
import { useAppContext } from 'providers/app/app.providers';
import { SortSelectProps } from './interface';
import style from './sortSelect.module.css';

export default function SortSelect(props: SortSelectProps) {
    const { disabled } = props;
    const { searchParams, section1, section2 } = useAppContext();
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState<Filters>(Filters.DEFAULT);
    useMemo(() => setSelectValue(searchParams.orderBy), [searchParams]);
    
    const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const orderByValue: Filters = Number(e.target.value);
        const path: string = `${section1}/${section2}/1`;
        const newPath: string = typeSearchPath(
            SearchParams.ORDER_BY, 
            searchParams, 
            orderByValue, 
            path
        );
        navigate(newPath);
    }, [searchParams, section1, section2, navigate])
    
    return (
        <div className={style['sort-select']}>
            Sortuj:
            <select 
                className={style['sort-select__select']} 
                onChange={handleSelectChange} 
                value={selectValue}
                disabled={disabled}
            >
                <option value={Filters.DEFAULT}>Domyślne</option>
                <option value={Filters.COMPOSITION}>Kompozycja</option>
                <option value={Filters.ENSEMBLE}>Zespół</option>
                <option value={Filters.TRACK_LENGTH}>Długość utworu</option>
            </select>
        </div>
    )
}