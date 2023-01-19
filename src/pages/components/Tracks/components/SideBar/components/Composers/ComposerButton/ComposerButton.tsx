import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sections } from 'enums/SectionType';
import { CategoryButtonProps } from './interface';
import style from './categoryButton.module.css';

export default function ComposerButton(props: CategoryButtonProps) {
    const { composerName, disabled } = props;
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`${Sections.TRACKS}/${composerName.toLowerCase()}`);
    }, [composerName, navigate]);

    return (
        <button className={style.category_button} disabled={disabled} onClick={handleClick}>
            {composerName}
        </button>
    );
}
