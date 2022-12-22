import { useState } from 'react';
import { Items } from './Items/Items';
import { SideBar } from './SideBar/SideBar';
import style from './store.module.css';

interface IStore {}

export function Store(props: IStore) {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    
    return (
        <div className={style.store}>
            <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <Items selectedCategory={selectedCategory} />
        </div>
    );
}
