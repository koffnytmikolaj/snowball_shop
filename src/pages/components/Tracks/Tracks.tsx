import { Items, SideBar } from './components';
import style from './tracks.module.css';

export default function Tracks() {
    
    return (
        <div className={style.tracks}>
            <SideBar />
            <Items />
        </div>
    );
}
