import { composersData } from "./constants";
import { useNavigate } from "react-router-dom";
import Composer from "./Composer";
import style from './composers.module.css';
import { Sections } from "enums/SectionType";

export default function Composers() {
    const navigate = useNavigate();

    const handleImageClick = (composer: string) => {
        navigate(`${Sections.TRACKS}/${composer}`);
    }

    return (
        <div className={style.composers}>
            {composersData.map(data => (
                <Composer key={data.key} composerData={data} handleImageClick={handleImageClick} />
            ))}
        </div>
    );
}
