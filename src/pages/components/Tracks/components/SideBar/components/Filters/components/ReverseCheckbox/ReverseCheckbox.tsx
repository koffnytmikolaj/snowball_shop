import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchParams } from 'enums/SearchEnums';
import { typeSearchPath } from 'helpers/searchHelpers';
import { useAppContext } from 'providers/app/app.providers';
import { ReverseCheckboxProps } from './interface';
import style from './reverseCheckbox.module.css'

export default function ReverseCheckbox(props: ReverseCheckboxProps) {
    const { disabled } = props;
    const { searchParams, section1, section2 } = useAppContext();
    const navigate = useNavigate();
    const [checked, setChecked] = useState<boolean>(false);
    useMemo(() => setChecked(searchParams.reverse), [searchParams]);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { checked } = e.currentTarget;
            const path: string = `${section1}/${section2}/1`;
            const newPath: string = typeSearchPath(
                SearchParams.REVERSE, 
                searchParams, 
                checked, 
                path
            );
            navigate(newPath);
        },
        [searchParams, section1, section2, navigate],
    );
    
    return (
        <div className={style['reverse-checkbox']}>
            Sortuj odwrotnie
            <input 
                checked={checked}
                disabled={disabled}
                type={'checkbox'} 
                onChange={handleInputChange} 
            />
        </div>
    )
}