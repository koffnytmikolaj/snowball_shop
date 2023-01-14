import { useEffect, useState } from 'react';
import ComposerButton from './ComposerButton/ComposerButton';
import style from './categoryList.module.css';
import { getAllComposers } from 'store/store';

export default function ComposersList() {
    const [showContent, setShowContent] = useState<boolean>(false);
    const [composers, setComposers] = useState<string[]>([]);

    const theme = {
        content: {
            transform: `translate3d(${showContent && composers.length > 0 ? 0 : -152}px, 0, 0)`,
        },
    }

    useEffect(() => {
        const run = async () => {
            const composersList: string[] = await getAllComposers();
            setComposers(composersList);
        }
        run();
    }, [])

    useEffect(() => {
        setShowContent(true);
    }, [])

    return (
        <div style={theme.content} className={style.content}>
            <h3>Kompozytorzy</h3>
            {composers.map(composer => 
                <ComposerButton 
                    key={composer}  
                    composerName={composer}
                />
            )}
        </div>
    )
}
