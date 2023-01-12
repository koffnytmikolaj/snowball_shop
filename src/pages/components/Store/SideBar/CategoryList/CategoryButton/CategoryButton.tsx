import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { sections } from 'enums/SectionType';
import style from './categoryButton.module.css';

interface ICategoryButton {
    categoryId: string;
    categoryName: string;
}

export default function CategoryButton(props: ICategoryButton) {
    const { categoryId, categoryName } = props;
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`${sections.STORE}/${categoryId}`);
    }, [categoryId, navigate]);

    return (
        <button 
            className={clsx(style.category_button)} 
            onClick={handleClick}
        >
            {categoryName}
        </button>
    );
}
