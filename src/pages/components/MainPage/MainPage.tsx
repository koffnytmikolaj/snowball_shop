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

    const navigateToLogIn = () => {
        console.log('log in');
    }

    const navigateToStore = useCallback(() => {
        navigate(sections.STORE);
    }, [navigate]);

    return (
        <div className={style['main-page']}>
            <div className={textClassNames}>
                <h1>SnowBall</h1>
                <h2>Witamy w sklepie internetowym SnowBall!</h2>
                <p>
                    Znajdziesz tu wszystko, czego potrzebujesz. Od rękawiczek po najbardziej ekskluzywne płaszcze.<br />
                    Zaloguj się, aby otrzymywać powiadomienia o wszelkich zmianach oraz by korzystać z promocji PREMIUM lub przejdź do sklepu!
                </p>
                <div className={style['main-page__buttons']}>
                    <Button onClick={navigateToLogIn}><>Zaczynamy</></Button>
                    <Button onClick={navigateToStore} variant={ButtonVariants.OUTLINED}><>Do sklepu!</></Button>
                </div>
            </div>
            <div className={imageClassNames}>
                <img src={image} alt="main page img" />
            </div>
        </div>
    );
}
