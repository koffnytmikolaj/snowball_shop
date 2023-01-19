import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { clsx } from "clsx";
import { trackSections } from "enums/store";
import { ITrack, ITrackSection } from "interfaces/TrackInterfaces";
import { getImageForTrack, getTrackById } from "store/store";
import TrackContent from "./TrackContent";
import style from './track.module.css';

export default function Track() {
    const trackId = useRef<number>(Number(useParams().trackId));
    const [track, setTrack] = useState<ITrack | null>();
    const [image, setImage] = useState<string>();
    const [show, setShow] = useState<boolean>(false);
    const sections: ITrackSection[] = [
        {section: trackSections.COMPOSITION, value: track?.composition},
        {section: trackSections.MOVEMENT, value: track?.movement},
        {section: trackSections.ENSEMBLE, value: track?.ensemble},
        {section: trackSections.SECONDS, value: track?.seconds},
    ];

    const contactHeaderClassNames = clsx(
        style.track__header, 
        show && style['track__header--shown'],
    );
    const imgClassNames = clsx(
        style.track__image,
        show && style['track__image--shown'],
    );

    useMemo(() => {
        const run = async () => {
            const currentTrack = await getTrackById(trackId.current);
            const currentImage = currentTrack ? getImageForTrack(currentTrack) : '';
            setTrack(currentTrack);
            setImage(currentImage);
        }
        run();
    }, []);

    useEffect(() => {
        image && setShow(true)
    }, [image]);

    return (
        <div className={style.track}>
            <div className={style.track__contact}>
                <h1 className={contactHeaderClassNames}>{track?.composer}</h1>
                <div className={style.track__sections}>
                    {sections.map((sectionProps, index) => {
                        const { section, value } = sectionProps;
                        return <TrackContent key={section} id={section} index={index} value={value} show={show} />
                    })}
                </div>
            </div>
            <img src={image} className={imgClassNames} alt='instruments' />
        </div>
    );
}