import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { ButtonVariants } from "enums/Button";
import { sections } from "enums/SectionType";
import image from 'assets/MainPage/jpg/cold-1284028.webp'
import Button from "components/Button/Button";
import style from "./mainPage.module.css"

export default function MainPage() {
    const [shown, setShown] = useState<boolean>(false);

    const navigate = useNavigate();
    const textClassNames = clsx(style['main-page__text'], shown && style['main-page__text--shown']);
    const imageClassNames = clsx(style['main-page__image'], shown && style['main-page__image--shown']);

    useEffect(() => {
        setShown(true);
    }, []);

    const navigateToTracks = useCallback(() => {
        navigate(sections.TRACKS);
    }, [navigate]);

    const navigateToAboutUs = useCallback(() => {
        navigate(sections.ABOUT_US);
    }, [navigate]);

    return (
        <div className={style['main-page']}>
            <div className={textClassNames}>
                <h1>MusicBall</h1>
                <h2>Witamy na stronie internetowej MusicBall!</h2>
                <p>
                    Poznaj najbardziej znamienite postaci w historii muzyki klasycznej oraz ich największe dzieła.<br />
                    Rozpocznij swoją przygodę przechodząc do sekcji muzyki lub skontaktuj się z nami!
                </p>
                <div className={style['main-page__buttons']}>
                    <Button onClick={navigateToTracks}><>Zaczynamy</></Button>
                    <Button onClick={navigateToAboutUs} variant={ButtonVariants.OUTLINED}><>Kontakt</></Button>
                </div>
            </div>
            <div className={imageClassNames}>
                <img src={image} alt="main page img" />
            </div>
        </div>
    );
}
