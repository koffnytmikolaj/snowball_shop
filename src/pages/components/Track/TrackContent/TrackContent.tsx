import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { trackSections } from 'enums/store';
import { convertTimeToString } from './helpers';
import { TrackContentProps } from './interface';
import style from './trackContent.module.css';

export default function TrackContent(props: TrackContentProps) {
    const { id, index, show, value } = props;
    const [title, setTitle] = useState<string>();
    const [sectionValue, setSectionValue] = useState<string>();
    const trackContentClassNames = clsx(
        style['track-content'], 
        show && style['track-content--shown'],
    );
    const animationDelay = index * 0.2 + 1;

    const theme = {
        trackContent: {
            transitionDelay: `${animationDelay}s`,
        },
    };

    useEffect(() => {
        switch(id) {
            case trackSections.COMPOSITION:
                setTitle('Kompozycja');
                setSectionValue(value?.toString() || '');
                break;
            case trackSections.MOVEMENT:
                setTitle('Część');
                setSectionValue(value?.toString() || '');
                break;
            case trackSections.ENSEMBLE:
                setTitle('Zespół');
                setSectionValue(value?.toString() || '');
                break;
            case trackSections.SECONDS:
                setTitle('Czas trwania');
                setSectionValue(convertTimeToString(Number(value)));
                break;
            default:
                return;
        }
    }, [id, value]);
    
    return (
        <div className={trackContentClassNames} style={theme.trackContent}>
            <p className={style['track-content__title']}>{title}:</p>
            <span className={style['track-content__paragraph']}>
                {sectionValue}
            </span>
        </div>
    );
}