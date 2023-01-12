import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { clsx } from "clsx";
import { ButtonVariants } from "enums/Button";
import { sections } from "enums/SectionType";
import Button from "components/Button/Button";
import style from './filters.module.css';

export default function Filters() {
    const [showContent, setShowContent] = useState<boolean>(false);
    const navigate = useNavigate();
    const filtersClassNames = clsx(style.filters, showContent && style['filters--shown'])

    useEffect(() => {
        setShowContent(true);
    }, []);

    const handleReturnButtonClick = useCallback(() => {
        navigate(sections.STORE);
    }, [navigate]);

    return (
        <div className={filtersClassNames}>
            <Button 
                variant={ButtonVariants.OUTLINED} 
                color='#FFF' 
                onClick={handleReturnButtonClick}
                className={style.filters__button}
            >
                <>Zmień Kategorię</>
            </Button>
        </div>
    )
}
