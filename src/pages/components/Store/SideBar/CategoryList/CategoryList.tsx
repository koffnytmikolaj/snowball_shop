import { useEffect, useState } from 'react';
import { listItems } from './constants';
import style from './categoryList.module.css';
import CategoryButton from './CategoryButton/CategoryButton';

export default function CategoryList() {
    const [showContent, setShowContent] = useState<boolean>(false);

    const theme = {
        content: {
            transform: `translate3d(${showContent ? 0 : -152}px, 0, 0)`,
        },
    }

    useEffect(() => {
        setShowContent(true);
    }, [])

    return (
        <div style={theme.content} className={style.content}>
            <h3>Kategorie</h3>
            {listItems.map(item => 
                <CategoryButton 
                    key={item.key}  
                    categoryId={item.key}
                    categoryName={item.text}
                />
            )}
        </div>
    )
}
