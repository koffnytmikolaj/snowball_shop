import { IProduct } from "interfaces/ProductInterface";
import { useAppContext } from "providers/app/app.providers";
import { categoriesLists } from "./constants";
import Item from "./Item/Item";
import style from './items.module.css'
import Pagination from "./Pagination/Pagination";

export default function Items() {
    const { location } = useAppContext();
    const items: IProduct[] = location.section2 ? categoriesLists[location.section2] : [];
    
    return (
        <div className={style.content}>
            {location.section2 && items.length > 0 && (
                <>
                    <Pagination count={Math.ceil(items.length / 9)} />
                    <div className={style.itemGrid} >
                        {items.slice(0, 9).map(item => <Item key={item.id} product={item} />)}
                    </div>
                    <Pagination count={Math.ceil(items.length / 9)} />
                </>
            )}
        </div>
    );
}
