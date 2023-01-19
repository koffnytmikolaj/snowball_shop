import { useEffect, useState } from 'react';
import { getAllComposers } from 'store/store';
import { ComposersProps } from './interface';
import ComposerButton from './ComposerButton';
import style from './composers.module.css';

export default function Composers(props: ComposersProps) {
    const { isPageLoading } = props;
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
                    disabled={isPageLoading}
                />
            )}
        </div>
    )
}
