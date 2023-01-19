import { useCallback, useState } from "react";
import { clsx } from "clsx";
import { ComposerProps } from "./interface";
import style from './composer.module.css';

export default function Composer(props: ComposerProps) {
    const { composerData, handleImageClick } = props;
    const { key, img, paragraphs } = composerData;
    const [hovered, setHovered] = useState<boolean>(false);
    const composerTextClassNames = clsx(style.composer__text, hovered && style['composer__text--shown']);

    const handleClick = useCallback(() => {
        handleImageClick(key);
    }, [key, handleImageClick]);

    const handleHover = () => {
        setHovered(true)
    }

    const handleMouseLeave = () => {
        setHovered(false)
    }

    return (
        <div className={style.composer} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <div className={style['composer__image-section']}>
                <img src={img} alt={key} className={style.composer__img} onClick={handleClick} />
            </div>
            <div className={composerTextClassNames}>
                {paragraphs.map((paragraph, index) => (
                    <p key={`${key}${index}`}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    )
}