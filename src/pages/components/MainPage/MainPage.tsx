import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sections } from "../../../enums/SectionType";
import { SetAfterTime } from "../../../helpers/setAfterTime";
import { useAppContext } from "../../../providers/app/app.providers";
import image from '../../../assets/MainPage/jpg/cold-1284028.webp'
import Button from "../../../components/Button/Button";
import style from "./mainPage.module.css"
import { ButtonVariants } from "../../../types/ButtonType";

export function MainPage() {
    const { setActivePage } = useAppContext();
    const [textShown, setTextShown] = useState<boolean>(false);
    const [imageShown, setImageShown] = useState<boolean>(false);
    const navigate = useNavigate();

    const theme = {
        text: {
            opacity: textShown ? 1 : 0,
            transform: `translate3d(${textShown ? 0 : 50}px, 0, 0)`,
        },
        image: {
            opacity: imageShown ? 1 : 0,
            transform: `translate3d(${imageShown ? 0 : 50}px, 0, 0)`,
        }
    }

    SetAfterTime(textShown, setTextShown, 250);
    SetAfterTime(imageShown, setImageShown, 500);

    function navigateToLogIn() {
        console.log('log in');
    }

    function navigateToStore() {
        setActivePage(sections.STORE);
        navigate('/store');
    }

    return (
        <div className={style.welcomeCard}>
            <div className={style.welcomeCard__text} style={theme.text}>
                <h1>SnowBall</h1>
                <h2>Witamy w sklepie internetowym SnowBall!</h2>
                <p>
                    Znajdziesz tu wszystko, czego potrzebujesz. Od rękawiczek po najbardziej ekskluzywne płaszcze.<br />
                    Zaloguj się, aby otrzymywać powiadomienia o wszelkich zmianach oraz by korzystać z promocji PREMIUM lub przejdź do sklepu!
                </p>
                <div className={style.welcomeCard__text_buttons}>
                    <Button onClick={navigateToLogIn}><>Zaczynamy</></Button>
                    <Button onClick={navigateToStore} variant={ButtonVariants.OUTLINED}><>Do sklepu!</></Button>
                </div>
            </div>
            <div className={style.welcomeCard__image} style={theme.image}>
                <img src={image} alt="main page img" />
            </div>
        </div>
    );
}
