import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SetAfterTime } from "../../../../../helpers/setAfterTime";
import style from './filters.module.css';
import Button from "../../../../../components/Button/Button";
import { ButtonVariants } from "../../../../../types/ButtonType";

interface IFilters {}

export function Filters(props: IFilters) {
    const [showContent, setShowContent] = useState<boolean>(false);
    const navigate = useNavigate();

    const theme = {
        transform: `translate3d(${showContent ? 0 : -152}px, 0, 0)`,
    }

    SetAfterTime(showContent, setShowContent, 0);

    function handleReturnButtonClick() {
        navigate('/store');
    }

    return (
        <div style={theme} className={style.content}>
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