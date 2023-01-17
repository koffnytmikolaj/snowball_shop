import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { searchParams } from 'enums/search';
import { typeSearchPath } from 'helpers/searchHelpers';
import { useAppContext } from 'providers/app/app.providers';
import style from './reverseCheckbox.module.css'

export default function ReverseCheckbox() {
    const { location } = useAppContext();
    const navigate = useNavigate();
    const [checked, setChecked] = useState<boolean>(false);
    useMemo(() => setChecked(location.searchParams.reverse), [location]);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { section1, section2 } = location;
            const { checked } = e.currentTarget;
            const path: string = `${section1}/${section2}/1`;
            const newPath: string = typeSearchPath(
                searchParams.REVERSE, 
                location.searchParams, 
                checked, 
                path
            );
            navigate(newPath);
        },
        [location, navigate],
    );
    
    return (
        <div className={style['reverse-checkbox']}>
            Sortuj odwrotnie
            <input type={'checkbox'} onChange={handleInputChange} checked={checked} />
        </div>
    )
}