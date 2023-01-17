import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { ButtonVariants } from "enums/Button";
import { sections } from "enums/SectionType";
import Button from "components/Button/Button";
import style from './returnButton.module.css';

export default function ReturnButton() {
    const navigate = useNavigate();

    const handleReturnButtonClick = useCallback(() => {
        navigate(sections.TRACKS);
    }, [navigate]);
    
    return (
        <Button 
            variant={ButtonVariants.OUTLINED} 
            color='#FFF' 
            onClick={handleReturnButtonClick}
            className={style['return-button']}
        >
            <>Zmień Kategorię</>
        </Button>
    )
}