import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { ButtonVariants } from "enums/ButtonEnums";
import { Sections } from "enums/SectionType";
import { ReturnButtonProps } from "./interface";
import Button from "components/Button/Button";
import style from './returnButton.module.css';

export default function ReturnButton(props: ReturnButtonProps) {
    const { disabled } = props;
    const navigate = useNavigate();

    const handleReturnButtonClick = useCallback(() => {
        navigate(Sections.TRACKS);
    }, [navigate]);
    
    return (
        <Button 
            variant={ButtonVariants.OUTLINED} 
            color='#FFF' 
            disabled={disabled}
            onClick={handleReturnButtonClick}
            className={style['return-button']}
        >
            <>Zmień Kategorię</>
        </Button>
    )
}