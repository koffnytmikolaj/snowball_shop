import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../../../interfaces/ProductInterface";
import { categoriesLists } from "./constants";
import { Item } from "./Item/Item";
import style from './items.module.css'
import Pagination from "./Pagination/Pagination";

interface IItems {
    selectedCategory?: string;
}

export function Items(props: IItems) {
    const { selectedCategory } = props;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const params = useParams();
    const items: IProduct[] = selectedCategory ? categoriesLists[selectedCategory] : [];

    useEffect(() => {
      setCurrentPage(Number(params.page || 1));
    }, [params])
    
    return (
        <div className={style.content}>
            {selectedCategory && items.length > 0 && (
                <>
                    <Pagination count={Math.ceil(items.length / 9)} categoryName={selectedCategory} value={currentPage} />
                    <div className={style.itemGrid} >
                        {items.slice(0, 9).map(item => <Item key={item.id} product={item} />)}
                    </div>
                    <Pagination count={Math.ceil(items.length / 9)} categoryName={selectedCategory} value={currentPage} />
                </>
            )}
        </div>
    );
}
