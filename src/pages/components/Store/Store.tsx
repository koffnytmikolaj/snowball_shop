import Items from './Items/Items';
import SideBar from './SideBar/SideBar';
import style from './store.module.css';

export default function Store() {
    
    return (
        <div className={style.store}>
            <SideBar />
            <Items />
        </div>
    );
}
