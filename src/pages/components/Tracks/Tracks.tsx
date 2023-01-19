import { useState } from 'react';
import { Items, SideBar } from './components';
import style from './tracks.module.css';

export default function Tracks() {
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

    return (
        <div className={style.tracks}>
            <SideBar isPageLoading={isPageLoading} />
            <Items isPageLoading={isPageLoading} setIsPageLoading={setIsPageLoading} />
        </div>
    );
}
