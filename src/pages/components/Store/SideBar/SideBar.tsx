import { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router";
import { clsx } from "clsx";
import { CategoryList } from "./CategoryList/CategoryList";
import { Filters } from "./Filters/Filters";
import Box from "../../../../components/Box/Box";
import style from './sideBar.module.css';

interface ISideBar {
    selectedCategory?: string;
    setSelectedCategory: Dispatch<string>;
}

export function SideBar(props: ISideBar) {
    const {selectedCategory, setSelectedCategory} = props;
    const [sideBarShown, setSideBarShown] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        setSideBarShown(true);
    }, []);

    useEffect(() => {
        setSelectedCategory(params.categoryId || '');
    }, [params, setSelectedCategory]);

    return (
        <Box className={clsx(style.bar, sideBarShown && style.bar__shown)}>
            {selectedCategory
                ? <Filters />
                : <CategoryList />
            }
        </Box>
    );
}
