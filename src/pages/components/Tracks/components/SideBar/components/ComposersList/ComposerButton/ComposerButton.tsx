import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { sections } from 'enums/SectionType';
import { CategoryButtonProps } from './interface';
import style from './categoryButton.module.css';

export default function ComposerButton(props: CategoryButtonProps) {
    const { composerName } = props;
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`${sections.TRACKS}/${composerName.toLowerCase()}`);
    }, [composerName, navigate]);

    return (
        <button 
            className={clsx(style.category_button)} 
            onClick={handleClick}
        >
            {composerName}
        </button>
    );
}
