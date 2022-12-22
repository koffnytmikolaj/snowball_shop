import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import style from './categoryButton.module.css';

interface ICategoryButton {
    categoryId: string;
    categoryName: string;
}

export default function CategoryButton(props: ICategoryButton) {
    const { categoryId, categoryName } = props;
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/store/${categoryId}`);
    }

    return (
        <button 
            className={clsx(style.category_button)} 
            onClick={handleClick}
        >
            {categoryName}
        </button>
    );
}
